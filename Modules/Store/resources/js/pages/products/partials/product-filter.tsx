import SearchInput from '@/components/search-input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { getQueryParams } from '@/lib/route';
import { shop } from '@/routes/products';
import { router, usePage } from '@inertiajs/react';

interface ProductFilterProps {
   setOpen?: (open: boolean) => void;
}

const ProductFilter = ({ setOpen }: ProductFilterProps) => {
   const page = usePage<ProductsIndexProps>();
   const urlParams = getQueryParams(page.url);
   const { categories, category } = page.props;

   const filterHandler = (
      newParams: Record<string, string>,
      categorySlug?: string,
   ) => {
      const updatedParams = { ...urlParams, ...newParams };

      if (!newParams.products_search && 'products_search' in updatedParams) {
         delete updatedParams.products_search;
      }

      router.get(
         shop.url(
            { category: categorySlug || category?.slug || '' },
            { query: updatedParams },
         ),
         {},
         {
            preserveScroll: true,
            onFinish: () =>
               !newParams.products_search && setOpen && setOpen(false),
         },
      );
   };

   return (
      <div className="space-y-6">
         <SearchInput
            onChangeValue={(value) => filterHandler({ products_search: value })}
         />

         <div>
            <h3 className="mb-3 font-semibold">Categories</h3>
            <RadioGroup value={category?.slug || 'all'}>
               <p
                  className="flex items-center"
                  onClick={() => filterHandler({}, '')}
               >
                  <RadioGroupItem
                     className="cursor-pointer"
                     id="category-all"
                     value="all"
                  />
                  <label htmlFor="category-all" className="cursor-pointer pl-2">
                     All
                  </label>
               </p>

               {categories
                  .filter((c) => c.slug !== 'default')
                  .map((c, index) => (
                     <p
                        key={index}
                        className="flex items-center capitalize"
                        onClick={() => filterHandler({}, c.slug)}
                     >
                        <RadioGroupItem
                           className="cursor-pointer"
                           id={`category-${c.id}`}
                           value={c.slug}
                        />
                        <label
                           htmlFor={`category-${c.id}`}
                           className="cursor-pointer pl-2"
                        >
                           {c.title}
                        </label>
                     </p>
                  ))}
            </RadioGroup>
         </div>

         <div>
            <h3 className="mb-3 font-semibold">Price</h3>
            <RadioGroup value={urlParams['price'] || 'all'}>
               {['all', 'free', 'paid'].map((price) => (
                  <p
                     key={price}
                     className="flex items-center capitalize"
                     onClick={() =>
                        filterHandler({ price: price === 'all' ? '' : price })
                     }
                  >
                     <RadioGroupItem
                        className="cursor-pointer"
                        value={price}
                        id={`price-${price}`}
                     />
                     <label
                        htmlFor={`price-${price}`}
                        className="cursor-pointer pl-2"
                     >
                        {price}
                     </label>
                  </p>
               ))}
            </RadioGroup>
         </div>

         <div>
            <h3 className="mb-3 font-semibold">Sort By</h3>
            <RadioGroup value={urlParams['sort'] || 'newest'}>
               {[
                  { value: 'newest', label: 'Newest' },
                  { value: 'expensive', label: 'Highest Price' },
                  { value: 'inexpensive', label: 'Lowest Price' },
                  { value: 'bestsellers', label: 'Bestsellers' },
                  { value: 'best_rates', label: 'Top Rated' },
               ].map((sort) => (
                  <p
                     key={sort.value}
                     className="flex items-center"
                     onClick={() => filterHandler({ sort: sort.value })}
                  >
                     <RadioGroupItem
                        className="cursor-pointer"
                        value={sort.value}
                        id={`sort-${sort.value}`}
                     />
                     <label
                        htmlFor={`sort-${sort.value}`}
                        className="cursor-pointer pl-2"
                     >
                        {sort.label}
                     </label>
                  </p>
               ))}
            </RadioGroup>
         </div>
      </div>
   );
};

export default ProductFilter;
