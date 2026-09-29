import CourseCard1 from '@/components/cards/course-card-1';
import { Button } from '@/components/ui/button';
import {
   Carousel,
   CarouselContent,
   CarouselItem,
} from '@/components/ui/carousel';
import type { CarouselApi } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

const TopCoursesCarousel1 = ({ data }: { data: Collection<Course> }) => {
   const [api, setApi] = useState<CarouselApi>();
   const [currentSlide, setCurrentSlide] = useState(0);

   useEffect(() => {
      if (!api) {
         return;
      }

      const handleSelect = () => {
         setCurrentSlide(api.selectedScrollSnap());
      };

      api.on('select', handleSelect);

      return () => {
         api.off('select', handleSelect);
      };
   }, [api]);

   return (
      <>
         <Carousel
            setApi={setApi}
            className="py-10"
            opts={{ align: 'start', loop: true }}
            plugins={[Autoplay({ delay: 3000 })]}
         >
            <CarouselContent>
               {data &&
                  data.collection.map((course) => (
                     <CarouselItem
                        key={course.id}
                        className="basis-full md:basis-1/2 lg:basis-1/4"
                     >
                        <div className="px-1.5 py-0.5">
                           <CourseCard1 key={course.id} course={course} />
                        </div>
                     </CarouselItem>
                  ))}
            </CarouselContent>
         </Carousel>

         <div className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-2.5">
               {api &&
                  data &&
                  data.collection.map(({ id }, index) => (
                     <div
                        key={id}
                        className={cn(
                           'cursor-pointer rounded-full transition-all duration-200',
                           currentSlide === index
                              ? 'h-2 w-4 bg-foreground'
                              : 'h-2 w-2 bg-gray-300 dark:bg-gray-600',
                        )}
                        onClick={() => api.scrollTo(index)}
                     ></div>
                  ))}
            </div>

            <div className="space-x-4">
               <Button
                  size="icon"
                  variant="outline"
                  disabled={!api?.canScrollPrev()}
                  onClick={() => api?.scrollPrev()}
                  className="hover:bg-background"
               >
                  <ChevronLeft />
               </Button>
               <Button
                  size="icon"
                  variant="outline"
                  disabled={!api?.canScrollNext()}
                  onClick={() => api?.scrollNext()}
                  className="hover:bg-background"
               >
                  <ChevronRight />
               </Button>
            </div>
         </div>
      </>
   );
};

export default TopCoursesCarousel1;
