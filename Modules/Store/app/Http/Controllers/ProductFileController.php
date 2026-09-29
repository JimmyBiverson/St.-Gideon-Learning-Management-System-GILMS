<?php

namespace Modules\Store\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Modules\Store\Models\Product;

class ProductFileController extends Controller
{
    /**
     * Download a purchased product's file.
     *
     * Access is gated by the `product.purchased` middleware.
     */
    public function download(Product $product, string $media)
    {
        $file = $product->getMedia(Product::FILES_COLLECTION)->find($media);

        abort_if(! $file, 404);

        return Storage::disk($file->disk)->download(
            $file->getPathRelativeToRoot(),
            $file->name ?: $file->file_name
        );
    }
}
