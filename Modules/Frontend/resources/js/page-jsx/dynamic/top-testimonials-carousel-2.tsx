import { Button } from '@/components/ui/button';
import {
   Carousel,
   CarouselContent,
   CarouselItem,
} from '@/components/ui/carousel';
import type { CarouselApi } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useEffect, useState } from 'react';

const TopTestimonialsCarousel2 = ({ data }: { data: Collection<any> }) => {
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
            className="relative z-10 space-y-7"
            opts={{
               loop: true,
               align: 'start',
               slidesToScroll: 'auto',
            }}
            plugins={[Autoplay({ delay: 5000 })]}
         >
            <div className="flex items-center justify-center">
               <Quote />
            </div>

            <div className="mx-auto w-full max-w-[460px]">
               <CarouselContent>
                  {data &&
                     data.ids.map((review, index) => (
                        <CarouselItem
                           key={`testimonials-${index}`}
                           className="text-center"
                        >
                           <p className="text-lg">{review.description}</p>
                        </CarouselItem>
                     ))}
               </CarouselContent>
            </div>

            <div className="flex h-[100px] flex-wrap items-center justify-center gap-7">
               {api &&
                  data &&
                  data.ids.map(({ id, image }, index) => (
                     <div
                        key={id}
                        className={cn(
                           'cursor-pointer overflow-hidden rounded-full transition-all duration-200',
                           currentSlide === index
                              ? 'h-[100px] w-[100px] opacity-100'
                              : 'h-[60px] w-[60px] opacity-40',
                        )}
                        onClick={() => api.scrollTo(index)}
                     >
                        <img
                           src={image}
                           alt=""
                           className="h-full w-full object-cover"
                        />
                     </div>
                  ))}
            </div>
         </Carousel>

         <div className="absolute top-1/2 right-0 z-10 flex w-full -translate-y-1/2 justify-between">
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
      </>
   );
};

export default TopTestimonialsCarousel2;
