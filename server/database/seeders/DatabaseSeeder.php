<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Article;
use App\Models\Tag;
use App\Models\User;
use App\Models\Category;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);


        $article = Article::create([
            "user_id"=>1,
            'title' => 'Welcome to ecoal23',
            'content' => '<h1>Hello from ecoal</h1><p>Nice to see you in <strong>Lens</strong>. Enjoy !</p>',
            'thumbnailURL' => 'https://t3.ftcdn.net/jpg/05/85/86/44/360_F_585864419_kgIYUcDQ0yiLOCo1aRjeu7kRxndcoitz.jpg',
            "thumbnailSource" => "Test",
            'mediaType' => 'image',
            'mediaURL' => 'http://localhost:8000/ecoal.jpg',
            'leadStory' => false
        ]);
     
        $tag1 = Tag::create(['name' => 'ecoal23']);
        $tag2 = Tag::create(['name' => 'react']);

        $article->tags()->attach([$tag1->id, $tag2->id]);

        $categories = ["Spring","Summer","Autumn","Winter"];
        $categories = array_map(function($v){
            return Category::create([
                "name"=>$v
            ]);
        },$categories);
        foreach($categories as $category){
            $article->categories()->attach($category);
        }


       
    }
}
