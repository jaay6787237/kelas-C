<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Gallery extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'galleries';

    protected $fillable = [
        'category_id',
        'title',
        'description',
        'image',
        'taken_at',
    ];

    protected $casts = [
        'taken_at' => 'date',
    ];

    /**
     * Relationship: Gallery belongs to a Category.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(GalleryCategory::class, 'category_id');
    }

    /**
     * Appends the fully qualified URL of the image when serialization happens.
     */
    public function getImageUrlAttribute(): string
    {
        if (filter_var($this->image, FILTER_VALIDATE_URL)) {
            return $this->image;
        }

        return $this->image ? Storage::url($this->image) : '';
    }

    protected $appends = ['image_url'];
}
