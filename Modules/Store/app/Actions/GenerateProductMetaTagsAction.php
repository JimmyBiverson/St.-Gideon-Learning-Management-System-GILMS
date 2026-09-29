<?php

namespace Modules\Store\Actions;

use Modules\Store\Models\Product;
use Modules\Store\Models\ProductCategory;

class GenerateProductMetaTagsAction
{
    /**
     * Generate meta tags for the product shop/listing page.
     *
     * @param  object  $products  Product collection/paginator
     * @return array<string, mixed>
     */
    public function forProductListing($products, ?ProductCategory $category = null): array
    {
        $system = app('system');
        $siteName = $system->fields['name'] ?? 'Mentor Learning Management System';
        $siteUrl = request()->url();
        $totalProducts = $products->total ?? (is_array($products->data ?? null) ? count($products->data) : 0);
        $firstProductImage = ! empty($products->data) ? ($products->data[0]->thumbnail ?? null) : null;

        $pageTitle = $category ? $category->title.' Products' : 'Store';
        $pageDescription = $totalProducts > 0
            ? "Browse $totalProducts".($category ? ' '.strtolower($category->title) : '').' products from our instructors.'
            : 'Browse virtual and downloadable products from our instructors.';
        $pageKeywords = ($category ? strtolower($category->title).', ' : '').'store, products, downloads, e-learning';
        $ogImage = $firstProductImage ?? $category->thumbnail ?? $system->fields['banner'] ?? '';

        return [
            'metaTitle' => $pageTitle.' | '.$siteName,
            'metaDescription' => $pageDescription,
            'metaKeywords' => $pageKeywords,
            'ogTitle' => $pageTitle,
            'ogDescription' => $pageDescription,
            'ogImage' => $ogImage,
            'ogUrl' => $siteUrl,
            'ogType' => 'website',
            'twitterCard' => 'summary_large_image',
            'twitterTitle' => $pageTitle,
            'twitterDescription' => $pageDescription,
            'twitterImage' => $ogImage,
        ];
    }

    /**
     * Generate meta tags for a single product page.
     *
     * @return array<string, mixed>
     */
    public function forSingleProduct(Product $product): array
    {
        $system = app('system');
        $siteName = $system->fields['name'] ?? 'Mentor Learning Management System';
        $siteUrl = request()->url();

        $pageTitle = $product->meta_title ?? ($product->title.' | '.$siteName);
        $pageDescription = $product->meta_description ?? $product->summary ?? 'Browse our store';
        $pageKeywords = $product->meta_keywords ?? ($product->title.', store, product, '.($system->fields['keywords'] ?? 'LMS'));

        $ogTitle = $product->og_title ?? $product->title;
        $ogDescription = $product->og_description ?? $pageDescription;
        $productImage = $product->thumbnail ?? $system->fields['banner'] ?? '';

        return [
            'metaTitle' => $pageTitle,
            'metaDescription' => $pageDescription,
            'metaKeywords' => $pageKeywords,
            'ogTitle' => $ogTitle,
            'ogDescription' => $ogDescription,
            'ogImage' => $productImage,
            'ogUrl' => $siteUrl,
            'ogType' => 'product',
            'twitterCard' => 'summary_large_image',
            'twitterTitle' => $ogTitle,
            'twitterDescription' => $ogDescription,
            'twitterImage' => $productImage,
        ];
    }
}
