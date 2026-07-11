<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class GalleryCategory extends Model
{
    use HasFactory;

    protected $table = 'gallery_categories';

    protected $fillable = [
        'name',
        'slug',
    ];

    /**
     * Relationship: One category has many galleries.
     */
    public function galleries(): HasMany
    {
        return $this->hasMany(Gallery::class, 'category_id');
    }
}
