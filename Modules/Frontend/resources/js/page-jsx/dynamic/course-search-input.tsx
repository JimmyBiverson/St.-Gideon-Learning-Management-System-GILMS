import SearchInput from '@/components/search-input';
import category from '@/routes/category';
import { router } from '@inertiajs/react';

const CourseSearchInput = () => {
   return (
      <div className="relative">
         <SearchInput
            iconPosition="right"
            placeholder="Search for courses that fit your goals"
            className="z-10 w-full rounded bg-background md:max-w-[440px] [&>input]:h-10 [&>svg]:text-secondary-foreground"
            onChangeValue={(value) =>
               router.get(
                  category.courses.url(
                     { category: 'all' },
                     { query: { search: value } },
                  ),
               )
            }
         />

         <div className="after:pointer-events-none after:absolute after:top-1/2 after:-left-[60px] after:h-[600px] after:w-[600px] after:-translate-y-1/2 after:rounded-full after:bg-[radial-gradient(circle,rgba(0,167,111,0.45)_0%,transparent_70%)] after:opacity-40 after:content-[''] dark:after:bg-[radial-gradient(circle,rgba(255,245,204,0.35)_0%,transparent_70%)] dark:after:opacity-20"></div>
      </div>
   );
};

export default CourseSearchInput;
