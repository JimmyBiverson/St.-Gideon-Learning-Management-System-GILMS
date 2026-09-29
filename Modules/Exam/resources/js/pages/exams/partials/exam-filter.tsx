import SearchInput from '@/components/search-input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { getQueryParams } from '@/lib/route';
import { exams as categoryExams } from '@/routes/category';
import { router, usePage } from '@inertiajs/react';

interface ExamFilterProps {
   setOpen?: (open: boolean) => void;
}

const ExamFilter = ({ setOpen }: ExamFilterProps) => {
   const page = usePage<ExamsIndexProps>();
   const urlParams = getQueryParams(page.url);
   const { levels, prices, categories, category, categoryChild, translate } =
      page.props;
   const { frontend, common } = translate;

   const filterHandler = (
      newParams: Record<string, string>,
      category: string,
   ) => {
      const updatedParams = { ...urlParams };

      if ('exams_search' in updatedParams) {
         delete updatedParams.exams_search;
      }

      router.get(
         categoryExams(
            {
               category,
            },
            { query: { ...updatedParams, ...newParams } },
         ),
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
                  categoryExams(
                     { category: 'all' },
                     { query: { exams_search: value } },
                  ),
               )
            }
         />

         {/* Categories Section */}
         <div>
            <h3 className="mb-3 font-semibold">{common.categories}</h3>
            <RadioGroup
               value={
                  categoryChild ? categoryChild?.slug : category?.slug || 'all'
               }
            >
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
                     {frontend.all}
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
                              {category.title}
                           </label>
                        </p>

                        {category.category_children?.map((child, ind) => {
                           const key = `category_child${ind}`;

                           return (
                              <p
                                 key={key}
                                 className="mt-2 flex items-center pl-3"
                                 onClick={() =>
                                    filterHandler({}, category.slug)
                                 }
                              >
                                 <RadioGroupItem
                                    className="cursor-pointer"
                                    id={key}
                                    value={child.slug}
                                 />
                                 <label
                                    htmlFor={key}
                                    className="cursor-pointer pl-2"
                                 >
                                    {child.title}
                                 </label>
                              </p>
                           );
                        })}
                     </div>
                  );
               })}
            </RadioGroup>
         </div>

         {/* Price Section */}
         <div>
            <h3 className="mb-3 font-semibold">{common.price}</h3>
            <RadioGroup value={urlParams['pricing_type'] || 'all'}>
               <p
                  className="flex items-center"
                  onClick={() =>
                     filterHandler(
                        { pricing_type: 'all' },
                        category?.slug || 'all',
                     )
                  }
               >
                  <RadioGroupItem
                     className="cursor-pointer"
                     id="price"
                     value="all"
                  />
                  <label htmlFor="price" className="cursor-pointer pl-2">
                     {frontend.all}
                  </label>
               </p>

               {prices.map((price) => (
                  <p
                     key={price}
                     className="flex items-center capitalize"
                     onClick={() =>
                        filterHandler(
                           { pricing_type: price },
                           category?.slug || 'all',
                        )
                     }
                  >
                     <RadioGroupItem
                        className="cursor-pointer"
                        value={price}
                        id={price}
                     />
                     <label htmlFor={price} className="cursor-pointer pl-2">
                        {price}
                     </label>
                  </p>
               ))}
            </RadioGroup>
         </div>

         {/* Label Section */}
         <div>
            <h3 className="mb-3 font-semibold">{common.level}</h3>
            <RadioGroup value={urlParams['level'] || 'all'}>
               <p
                  className="flex items-center"
                  onClick={() =>
                     filterHandler({ level: 'all' }, category?.slug || 'all')
                  }
               >
                  <RadioGroupItem
                     className="cursor-pointer"
                     id="level"
                     value="all"
                  />
                  <label htmlFor="level" className="cursor-pointer pl-2">
                     {frontend.all}
                  </label>
               </p>
               {levels.map((level) => (
                  <p
                     key={level}
                     className="flex items-center capitalize"
                     onClick={() =>
                        filterHandler({ level }, category?.slug || 'all')
                     }
                  >
                     <RadioGroupItem
                        className="cursor-pointer"
                        value={level}
                        id={level}
                     />
                     <label htmlFor={level} className="cursor-pointer pl-2">
                        {level}
                     </label>
                  </p>
               ))}
            </RadioGroup>
         </div>
      </div>
   );
};

export default ExamFilter;
