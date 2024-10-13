<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Rules\UniqueMailException;
use App\Rules\Admin;
use App\Models\User;
use App\Models\Article;


class AuthController extends Controller
{
    public function register(Request $request) {
    $validatedData = $request->validate([
                   'name' => 'required|string|max:255',
                   'email' => 'required|string|email|max:255|unique:users',
                   'password' => 'required|string|min:8',
                   "password_confirmation"=>"required|string|min:8|same:password"
    ]);

    $user = User::create([
                   'name' => $validatedData['name'],
                   'email' => $validatedData['email'],
                   'password' => Hash::make($validatedData['password']),
    ]);

    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
                   'access_token' => $token,
                   'token_type' => 'Bearer',
    ]);
    }


    public function login(Request $request){
    $validatedData = $request->validate([
            'email' => 'required|string|email|max:255',
            'password' => 'required|string',
    ]);        
    
    if (!Auth::attempt($request->only('email', 'password'))) {
        return response()->json(['message' => 'Invalid login details'], 401);
    }

    $user = User::where('email', $request['email'])->firstOrFail();

    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
           'access_token' => $token,
           'token_type' => 'Bearer',
    ]);
    }

    public function logout(Request $request) {
        Auth::user()->tokens()->delete();
        return response()->json(["message" => "Logout."]);
    }

    public function user(){
        return response(Auth::user()->load("articles"));
    }

    public function update(Request $request){

        $request->validate([
            "name"=>"required|string|max:255",
            'email' => ["required","string","max:255","email", new UniqueMailException],
            "facebook"=>["nullable","url",new Admin],
            "instagram"=>["nullable","url",new Admin],
            "twitter"=>["nullable","url",new Admin],
        ]);
       Auth::user()->update($request->all());
       return response()->json(["message"=>"updated"]);
    }

    public function updatePassword(Request $request){
        $request->validate([
            "old_password"=>"required|current_password",
            "new_password"=>"required|string|min:10",
            "new_password_confirmation"=>"required|same:new_password"
        ]);
        Auth::user()->update([
            "password"=>Hash::make($request->input("new_password"))
        ]);
        return response()->json(["message"=>"updated"]);
    }

    public function destroy(){
        foreach(Auth::user()->articles as $article){
            foreach($article->tags as $tag){
                if(count($tag->articles)<=1){
                    $tag->delete();
                }
            }
            $article->tags()->detach();
            foreach($article->comments as $comment){
                $comment->delete();
            }
            $article->favorites()->detach();
            $article->categories()->detach();
            $article->delete();
        }
        foreach(Auth::user()->comments as $comment){
            $comment->delete();
        }
        Auth::user()->favorites()->detach();
        Auth::user()->tokens()->delete();
        Auth::user()->delete();
        return response()->json(["message"=>"deleted"]);
    }

}
