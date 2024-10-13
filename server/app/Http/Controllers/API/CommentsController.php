<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Rules\CommentsAllowed;

class CommentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "article_id"=>["required","integer","exists:articles,id",new CommentsAllowed],
            "content"=>"required|string"
        ]);
        Comment::create([
            "article_id"=>$request->input("article_id"),
            "user_id"=>Auth::id(),
            "content"=>$request->input("content")
        ]);
        return response()->json(["message"=>"created"]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comment $comment)
    {
        if($comment->user_id == Auth::id()){
            $request->validate([
                "content"=>"required|string"
            ]);
            $comment->update($request->all());
            return response()->json(["message"=>"updated"]);
        } else {
            abort("404");
        }
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        $comment->delete();
        return response()->json(["message"=>"deleted"]);
    }
}
