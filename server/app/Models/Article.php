<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;
    protected $fillable = ["user_id","title","content","thumbnailURL", "thumbnailSource", "mediaType","mediaURL","leadStory","comments"];
    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }
    public function comments(){
        return $this->hasMany(Comment::class,"article_id");
    }
    public function favorites(){
        return $this->belongsToMany(User::class,"favorites","article_id","user_id");
    }
    public function categories(){
        return $this->belongsToMany(Category::class,"article_category","article_id","category_id");
    }
    public function author(){
        return $this->belongsTo(User::class,"user_id","id");
    }
}
