interface ProductCategory extends TableCommon {
   title: string;
   slug: string;
   icon: string;
   sort: number;
   status: number;
   description?: string;
   thumbnail?: string;
   products?: Product[];
   products_count?: number;
   category_children?: ProductCategoryChild[];
}

interface ProductCategoryChild extends TableCommon {
   title: string;
   slug: string;
   icon: string;
   sort: number;
   status: number;
   description?: string;
   product_category_id: number;
}

interface ProductSpecification extends TableCommon {
   product_id: number;
   title: string;
   value: string;
   sort: number;
}

interface ProductFaq extends TableCommon {
   product_id: number;
   question: string;
   answer?: string;
   sort: number;
}

interface ProductWishlist extends TableCommon {
   user_id: number;
   product_id: number;
   product?: Product;
}

interface ProductReview extends TableCommon {
   review: string;
   rating: number;
   user_id: number;
   product_id: number;
   user?: User;
}

interface ProductCoupon extends TableCommon {
   product_id: number | null;
   code: string;
   discount_type: 'percentage' | 'fixed';
   discount: string;
   valid_from?: string;
   valid_to?: string;
   usage_type: 'unlimited' | 'limited';
   usage_limit?: number;
   used_count: number;
   is_active: boolean;
   product?: Product;
}

interface ProductOrder extends TableCommon {
   quantity: number;
   unit_price: string;
   subtotal: string;
   discount: string;
   tax: string;
   total: string;
   coupon_code?: string;
   user_id: number;
   product_id: number;
   instructor_id: number;
   user?: User;
   product?: Product;
   instructor?: Instructor;
}

interface Product extends TableCommon {
   title: string;
   slug: string;
   status: 'draft' | 'pending' | 'approved' | 'rejected';
   summary: string;
   description?: string;

   pricing_type: 'free' | 'paid';
   price?: number;
   discount: boolean;
   discount_price?: number;

   inventory?: number;
   unlimited_inventory: boolean;

   featured: boolean;
   views: number;
   thumbnail?: string;
   images?: ProductFile[];
   files?: ProductFile[];

   meta_title?: string;
   meta_keywords?: string;
   meta_description?: string;
   og_title?: string;
   og_description?: string;

   instructor_id: number;
   product_category_id: number;
   product_category_child_id?: number;

   instructor?: Instructor;
   product_category?: ProductCategory;
   product_category_child?: ProductCategoryChild;
   specifications?: ProductSpecification[];
   faqs?: ProductFaq[];
   reviews?: ProductReview[];

   average_rating?: number;
   reviews_count?: number;
   orders_count?: number;
   is_wishlisted?: boolean;
}

interface ProductFile {
   id: number;
   name: string;
   size: number;
   mime_type: string;
   url: string;
}
