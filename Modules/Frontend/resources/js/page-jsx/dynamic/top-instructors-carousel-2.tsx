import InstructorSocials from '@/components/instructor-socials';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
   Carousel,
   CarouselContent,
   CarouselItem,
} from '@/components/ui/carousel';
import type { CarouselApi } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import instructors from '@/routes/instructors';
import { Link } from '@inertiajs/react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

const TopInstructorsCarousel2 = ({
   data,
}: {
   data: Collection<Instructor>;
}) => {
   const [currentSlide, setCurrentSlide] = useState(0);
   const [api, setApi] = useState<CarouselApi>();

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
            className="relative z-10 my-5"
            opts={{ align: 'start', loop: true }}
            plugins={[Autoplay({ delay: 3000 })]}
         >
            <CarouselContent>
               {data &&
                  data.collection.map((instructor) => {
                     return (
                        <CarouselItem
                           key={instructor.id}
                           className="basis-full md:basis-1/2 lg:basis-1/4"
                        >
                           <div className="px-1.5 py-5">
                              <Card className="group relative overflow-hidden rounded-2xl !shadow-card-lg">
                                 <Link href={instructors.show(instructor.id)}>
                                    <div className="relative h-[300px] overflow-hidden">
                                       <img
                                          className="h-full w-full object-cover object-center"
                                          src={
                                             instructor.user.photo ||
                                             '/assets/images/intro/default/instructors/instructor-1.png'
                                          }
                                          alt=""
                                       />

                                       <div className="absolute bottom-0 left-1/2 flex h-full w-full -translate-x-1/2 flex-col justify-end bg-gradient-to-t from-foreground/10 p-4 text-center opacity-0 transition-all duration-200 group-hover:opacity-100 dark:from-foreground">
                                          <p className="mb-1 text-lg font-semibold text-white">
                                             {instructor.user.name}
                                          </p>
                                          <p className="text-sm text-white">
                                             {instructor.designation}
                                          </p>
                                       </div>
                                    </div>
                                 </Link>

                                 <InstructorSocials instructor={instructor} />
                              </Card>
                           </div>
                        </CarouselItem>
                     );
                  })}
            </CarouselContent>
         </Carousel>

         <div className="relative z-10 flex items-center justify-between">
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

export default TopInstructorsCarousel2;
