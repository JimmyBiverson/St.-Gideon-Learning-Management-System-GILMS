import SearchInput from '@/components/search-input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { getQueryParams } from '@/lib/route';
import { visit } from '@/routes/blogs';
import { router, usePage } from '@inertiajs/react';

interface BlogFilterProps {
   setOpen?: (open: boolean) => void;
}

const BlogFilter = ({ setOpen }: BlogFilterProps) => {
   const page = usePage<BlogsIndexProps>();
   const urlParams = getQueryParams(page.url);
   const { category, categories, translate } = page.props;
   const { frontend, common } = translate;

   const filterHandler = (
      newParams: Record<string, string>,
      category: string,
   ) => {
      const updatedParams = { ...urlParams };

      if ('blogs_search' in updatedParams) {
         delete updatedParams.blogs_search;
      }

      router.get(
         visit(category, { query: { ...updatedParams, ...newParams } }),
         {},
         {
            preserveScroll: true,
            onFinish: () => !urlParams.search && setOpen && setOpen(false),
         },
      );
   };

   return (
      <div className="space-y-6">
         <SearchInput
            onChangeValue={(value) =>
               router.get(
                  visit(
                     { category: 'all' },
                     { query: { blogs_search: value } },
                  ),
               )
            }
         />

         {/* Categories Section */}
         <div>
            <h3 className="mb-3 font-semibold">{common.categories}</h3>
            <RadioGroup value={category?.slug || 'all'} className="space-y-2">
               <p
                  className="flex items-center"
                  onClick={() => filterHandler({}, 'all')}
               >
                  <RadioGroupItem
                     className="cursor-pointer"
                     id="category"
                     value="all"
                  />
                  <label htmlFor="category" className="cursor-pointer pl-2">
                     {frontend.all_blogs}
                  </label>
               </p>

               {categories.map((category, ind) => {
                  const key = `category${ind}`;

                  if (category.slug === 'default') {
                     return null;
                  }

                  return (
                     <div key={key} className="capitalize">
                        <p
                           className="flex items-center"
                           onClick={() => filterHandler({}, category.slug)}
                        >
                           <RadioGroupItem
                              className="cursor-pointer"
                              id={key}
                              value={category.slug}
                           />
                           <label htmlFor={key} className="cursor-pointer pl-2">
                              {category.name}
                           </label>
                        </p>
                     </div>
                  );
               })}
            </RadioGroup>
         </div>
      </div>
   );
};

export default BlogFilter;
