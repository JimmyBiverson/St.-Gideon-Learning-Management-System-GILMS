import { Renderer } from '@/components/rich-editor';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LandingLayout from '@/layouts/landing';
import { systemCurrency } from '@/lib/utils';
import payments from '@/routes/payments';
import { store as storeProductOrder } from '@/routes/product-orders';
import { shop } from '@/routes/products';
import productFiles from '@/routes/products/files';
import { Link, router, usePage } from '@inertiajs/react';
import { Star, Download, ShoppingBag } from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import ProductWishlistHandler from '../../components/wishlist-handler';
import Reviews from './partials/reviews';

const Show = () => {
   const { props } = usePage<ProductDetailsProps>();
   const { product, order, wishlists, auth } = props;
   const { amount } = systemCurrency(props.system.fields['selling_currency']);
   const [activeImage, setActiveImage] = useState(
      product.thumbnail || product.images?.[0]?.url,
   );

   const outOfStock =
      !product.unlimited_inventory &&
      typeof product.inventory === 'number' &&
      product.inventory <= 0;

   return (
      <div className="container py-6">
         <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href={shop.url()}>Store</Link>
            {product.product_category && (
               <>
                  <span>/</span>
                  <span>{product.product_category.title}</span>
               </>
            )}
         </div>

         <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
               <div className="relative h-[380px] overflow-hidden rounded-xl bg-muted">
                  <img
                     src={activeImage || '/assets/images/blank-image.jpg'}
                     alt={product.title}
                     className="h-full w-full object-cover"
                  />
               </div>
               {product.images && product.images.length > 0 && (
                  <div className="mt-3 flex gap-2 overflow-x-auto">
                     {[
                        ...(product.thumbnail
                           ? [{ id: 0, url: product.thumbnail }]
                           : []),
                        ...product.images,
                     ].map((image) => (
                        <button
                           key={image.id}
                           type="button"
                           onClick={() => setActiveImage(image.url)}
                           className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border"
                        >
                           <img
                              src={image.url}
                              alt=""
                              className="h-full w-full object-cover"
                           />
                        </button>
                     ))}
                  </div>
               )}
            </div>

            <div>
               <h1 className="text-2xl font-bold md:text-3xl">
                  {product.title}
               </h1>

               <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                     <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                     {product.average_rating
                        ? Number(product.average_rating).toFixed(2)
                        : '0.00'}{' '}
                     ({product.reviews_count || 0})
                  </span>
                  <span>by {product.instructor?.user?.name}</span>
                  <span>{product.orders_count || 0} Sales</span>
               </div>

               <p className="mt-4 text-muted-foreground">{product.summary}</p>

               <div className="mt-4 flex items-center gap-3">
                  {product.pricing_type === 'free' ? (
                     <span className="text-2xl font-bold">Free</span>
                  ) : product.discount ? (
                     <>
                        <span className="text-2xl font-bold">
                           {amount(product.discount_price as number)}
                        </span>
                        <span className="text-lg text-muted-foreground line-through">
                           {amount(product.price as number)}
                        </span>
                     </>
                  ) : (
                     <span className="text-2xl font-bold">
                        {amount(product.price as number)}
                     </span>
                  )}
               </div>

               <Separator className="my-4" />

               {order ? (
                  <div className="space-y-3">
                     <div className="rounded-lg border border-emerald-500 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
                        You own this product
                     </div>

                     {product.files && product.files.length > 0 ? (
                        <div className="space-y-2">
                           {product.files.map((file) => (
                              <a
                                 key={file.id}
                                 href={productFiles.download.url({
                                    product: product.id,
                                    media: file.id,
                                 })}
                                 className="flex items-center justify-between rounded-lg border px-4 py-2 hover:bg-muted/50"
                              >
                                 <span className="text-sm font-medium">
                                    {file.name}
                                 </span>
                                 <Download className="h-4 w-4 text-muted-foreground" />
                              </a>
                           ))}
                        </div>
                     ) : (
                        <p className="text-sm text-muted-foreground">
                           No downloadable files yet.
                        </p>
                     )}
                  </div>
               ) : (
                  <div className="flex gap-3">
                     {auth.user ? (
                        product.pricing_type === 'free' ? (
                           <Button
                              size="lg"
                              disabled={outOfStock}
                              onClick={() =>
                                 router.post(storeProductOrder(), {
                                    product_id: product.id,
                                 })
                              }
                           >
                              <ShoppingBag className="mr-2 h-4 w-4" />
                              {outOfStock ? 'Out of Stock' : 'Get for Free'}
                           </Button>
                        ) : (
                           <Button asChild size="lg" disabled={outOfStock}>
                              <a
                                 href={payments.index.url({
                                    from: 'web',
                                    item: 'product',
                                    id: product.id,
                                 })}
                              >
                                 <ShoppingBag className="mr-2 h-4 w-4" />
                                 {outOfStock ? 'Out of Stock' : 'Buy Now'}
                              </a>
                           </Button>
                        )
                     ) : (
                        <Button asChild size="lg">
                           <Link href="/login">Login to Purchase</Link>
                        </Button>
                     )}

                     <ProductWishlistHandler
                        product={product}
                        wishlists={wishlists}
                     />
                  </div>
               )}
            </div>
         </div>

         <Card className="mt-10 p-4 md:p-6">
            <Tabs defaultValue="description">
               <TabsList className="w-full justify-start overflow-x-auto">
                  <TabsTrigger value="description" className="cursor-pointer">
                     Description
                  </TabsTrigger>
                  <TabsTrigger
                     value="specifications"
                     className="cursor-pointer"
                  >
                     Specifications
                  </TabsTrigger>
                  <TabsTrigger value="faq" className="cursor-pointer">
                     FAQ
                  </TabsTrigger>
                  <TabsTrigger value="reviews" className="cursor-pointer">
                     Reviews
                  </TabsTrigger>
                  <TabsTrigger value="seller" className="cursor-pointer">
                     Seller
                  </TabsTrigger>
               </TabsList>

               <TabsContent value="description" className="pt-6">
                  {product.description ? (
                     <Renderer value={product.description} />
                  ) : (
                     <p className="text-muted-foreground">
                        No description provided.
                     </p>
                  )}
               </TabsContent>

               <TabsContent value="specifications" className="pt-6">
                  {product.specifications &&
                  product.specifications.length > 0 ? (
                     <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {product.specifications.map((spec) => (
                           <div
                              key={spec.id}
                              className="flex justify-between rounded-lg border px-4 py-2"
                           >
                              <span className="text-muted-foreground">
                                 {spec.title}
                              </span>
                              <span className="font-medium">{spec.value}</span>
                           </div>
                        ))}
                     </div>
                  ) : (
                     <p className="text-muted-foreground">
                        No specifications provided.
                     </p>
                  )}
               </TabsContent>

               <TabsContent value="faq" className="pt-6">
                  {product.faqs && product.faqs.length > 0 ? (
                     <div className="space-y-4">
                        {product.faqs.map((faq) => (
                           <div key={faq.id}>
                              <p className="font-medium">{faq.question}</p>
                              <p className="mt-1 text-sm text-muted-foreground">
                                 {faq.answer}
                              </p>
                           </div>
                        ))}
                     </div>
                  ) : (
                     <p className="text-muted-foreground">No FAQs added yet.</p>
                  )}
               </TabsContent>

               <TabsContent value="reviews" className="pt-6">
                  <Reviews />
               </TabsContent>

               <TabsContent value="seller" className="pt-6">
                  <div className="flex items-center gap-4">
                     <img
                        src={
                           product.instructor?.user?.photo ||
                           '/assets/images/blank-image.jpg'
                        }
                        alt={product.instructor?.user?.name}
                        className="h-16 w-16 rounded-full object-cover"
                     />
                     <div>
                        <p className="text-lg font-semibold">
                           {product.instructor?.user?.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                           {product.instructor?.user?.email}
                        </p>
                     </div>
                  </div>
               </TabsContent>
            </Tabs>
         </Card>
      </div>
   );
};

Show.layout = (page: ReactNode) => <LandingLayout>{page}</LandingLayout>;

export default Show;
