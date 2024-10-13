<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Tag;
use Illuminate\Http\Request;
use App\Rules\MinCharacters;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Builder;

class ArticlesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Article::all());
    }

    public function leadedArticles(){
        return response()->json(Article::where("leadStory",1)->inRandomOrder()->take(3)->get()->load("author"));
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "title"=>"required|string",
            "content"=>["required","string",new MinCharacters],
            "thumbnailURL"=>"required_without:thumbnailFILE|url|nullable",
            "thumbnailFILE"=>"required_without:thumbnailURL|nullable|file|image|mimes:jpg,png",
            "thumbnailSource"=>"required|string",
            "mediaURL"=>"nullable|url",
            "mediaFILE"=>"nullable|file|mimes: png,jpg,mp4,mp3,mov",
            "mediaType"=>"nullable|string|in:['image','video','audio']",
            "leadStory"=>"nullable",
            "comments"=>"nullable",
            "tags"=>"nullable|array",
            "tags.*"=>"string",
            "categories"=>"required|array|min:1",
            "categories.*"=>"exists:categories,id"
        ]);

        if($request->hasFile("thumbnailFILE") && $request->file("thumbnailFILE")->isValid()){
            $f = $request->file("thumbnailFILE")->hashName();
            $request->file("thumbnailFILE")->storeAs("public/thumbnails",$f);
            $thumbnailURL= url("/storage/thumbnails/".$f);
        } else{
            $thumbnailURL = $request->input("thumbnailURL");
        } 

        if($request->hasFile("mediaFILE") && $request->file("mediaFILE")->isValid()){
            $f = $request->file("mediaFILE")->hashName();
            $request->file("mediaFILE")->storeAs("public/medias",$f);
            $mediaURL= url("/storage/medias/".$f);
            $mediaType = $request->input("mediaType");
        } else if($request->filled("mediaURL")){
            $mediaURL = $request->input("thumbnailURL");
            $mediaType = $request->input("mediaType");
        } else {
            $mediaURL = null;
            $mediaType = null;
        }

        if($request->has("leadStory")){
            $leadStory = 1;
        } else {
            $leadStory = 0;
        }

        if($request->has("comments")){
            $comments = 1;
        } else {
            $comments = 0;
        }

        $article = Article::create([
            "user_id"=>Auth::id(),
            "title"=>$request->input("title"),
            "content"=>$request->input("content"),
            "thumbnailURL"=>$thumbnailURL,
            "thumbnailSource"=>$request->input("thumbnailSource"),
            "mediaType"=>$mediaType,
            "mediaURL"=>$mediaURL,
            "leadStory"=>$leadStory,
            "comments"=>$comments
        ]);

        if($request->has("tags")){
            foreach($request->input("tags") as $tagText){
                $tag = Tag::where("name","like",$tagText)->get();
                ;
                if(count($tag)<=0){
                    $tag = Tag::create([
                        "name"=>$tagText
                    ]);
                } else {
                    $tag = $tag->first();
                }
                $article->tags()->attach($tag);
            }
        }

        if($request->has("categories")){
            $article->categories()->attach($request->input("categories"));
        }
    
        return response()->json($article->id);

    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        return response()->json($article->load("tags","author"));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Article $article)
    {
        $request->validate([
            "title"=>"required|string",
            "content"=>["required","string",new MinCharacters],
            "thumbnailURL"=>"required_without:thumbnailFILE|url|nullable",
            "thumbnailFILE"=>"required_without:thumbnailURL|nullable|file|image|mimes:jpg,png",
            "mediaURL"=>"nullable|url",
            "mediaFILE"=>"nullable|file|mimes: png,jpg,mp4,mp3,mov",
            "mediaType"=>"nullable|string|in:['image','video','audio']",
            "leadStory"=>"nullable",
            "comments"=>"nullable",
            "tags"=>"nullable|array",
            "tags.*"=>"string",
            "categories"=>"required|array|min:1",
            "categories.*"=>"integer,exists:categories,id"
        ]);

        if($request->hasFile("thumbnailFILE") && $request->file("thumbnailFILE")->isValid()){
            $f = $request->file("thumbnailFILE")->hashName();
            $request->file("thumbnailFILE")->storeAs("public/thumbnails",$f);
            $thumbnailURL= url("/")."//thumbnails//".$f;
        } else{
            $thumbnailURL = $request->input("thumbnailURL");
        } 

        if($request->hasFile("mediaFILE") && $request->file("mediaFILE")->isValid()){
            $f = $request->file("mediaFILE")->hashName();
            $request->file("mediaFILE")->storeAs("public/medias",$f);
            $mediaURL= url("/")."//medias//".$f;
            $mediaType = $request->input("mediaType");
        } else if($request->filled("mediaURL")){
            $mediaURL = $request->input("thumbnailURL");
            $mediaType = $request->input("mediaType");
        } else {
            $mediaURL = null;
            $mediaType = null;
        }

        if($request->has("leadStory")){
            $leadStory = 1;
        } else {
            $leadStory = 0;
        }

        if($request->has("comments")){
            $comments = 1;
        } else {
            $comments = 0;
        }


        $article->update([
            "title"=>$request->input("title"),
            "content"=>$request->input("content"),
            "thumbnailURL"=>$thumbnailURL,
            "mediaType"=>$mediaType,
            "mediaURL"=>$mediaURL,
            "leadStory"=>$leadStory,
            "comments"=>$comments
        ]);

        if($request->has("tags")){
            foreach($request->input("tags") as $tagText){
                $tag = Tag::where("name","like",$tagText)->get();
                if(count($tag)<=0){
                    $tag = Tag::create([
                        "name"=>$tagText
                    ]);
                } else {
                    $tag = $tag->first();
                }
            
                if(count($article->tags->where("id",$tag->id))<=0){
                    $article->tags()->attach($tag);
                }
            }
        } else {
            foreach($article->tags as $tag){
                if(count($tag->articles)<=1){
                    $tag->delete();
                }
            }
            $article->tags->detach();
        }

        foreach($article->tags as $tag){
            if(!in_array($tag->name,$request->input("tags"))){
                $article->tags()->detach($tag);
            }
            if(count($tag->articles)<=0){
                $tag->delete();
            }
        }

        if($request->has("categories")){
            foreach($request->input("categories") as $category){
                if(count($article->categories->where("id",$category))<=0){
                    $article->categories()->attach($category);
                }
            }
        }

        foreach($article->categories as $category){
            if(!in_array($category,$request->input("categories"))){
                $article->categories()->detach($category);
            }
        }

        return response()->json($article->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        foreach($article->tags as $tag){
            if(count($tag->articles)<=1){
                $tag->delete();
            }
        }
        $article->tags()->detach();
        /*
        foreach($article->comments as $comment){
            $comment->delete();
        }
        */
        $article->favorites()->detach();
        $article->categories()->detach();
        $article->delete();
        return response()->json(["message"=>"deleted"]);
    }

    public function favorite(Article $article){
        Auth::user()->favorites()->attach($article);
        return response()->json(["message"=>"created"]);
    }

    public function unfavorite(Article $article){
        Auth::user()->favorites()->detach($article);
        return response()->json(["message"=>"deleted"]);
    }

    public function comments(Article $article){
        return response()->json($article->comments);
    }
}
