import { usePage } from '@inertiajs/react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import ReviewCard1 from '@/components/cards/review-card-1';
import { Button } from '@/components/ui/button';
import {
   Carousel,
   CarouselContent,
   CarouselItem,
} from '@/components/ui/carousel';
import type { CarouselApi } from '@/components/ui/carousel';
import { useCarouselSlide } from '@/hooks/use-carousel-slide';
import { getPageSection, getPropertyArray } from '@/lib/page';
import { cn } from '@/lib/utils';
import Section from '../section';

const Testimonials = () => {
   const { props } = usePage<IntroPageProps>();
   const { customize } = props;
   const [api, setApi] = useState<CarouselApi>();
   const currentSlide = useCarouselSlide(api);
   const testimonialsSection = getPageSection(props.page, 'testimonials');

   return (
      <Section
         customize={customize}
         pageSection={testimonialsSection}
         containerClass="py-20"
         contentClass="relative z-10"
      >
         <div className="mx-auto text-center md:max-w-[480px]">
            <p className="mb-1 font-medium text-secondary-foreground">
               {testimonialsSection?.title}
            </p>
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
               {testimonialsSection?.sub_title}
            </h2>
            <p className="text-muted-foreground">
               {testimonialsSection?.description}
            </p>
         </div>

         <Carousel
            setApi={setApi}
            className="z-10 py-14"
            opts={{
               loop: true,
               align: 'start',
               slidesToScroll: 'auto',
            }}
            plugins={[Autoplay({ delay: 5000 })]}
         >
            <CarouselContent>
               {getPropertyArray(testimonialsSection).map((review) => (
                  <CarouselItem
                     key={review.id}
                     className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                  >
                     <div className="h-full px-1.5 py-0.5">
                        <ReviewCard1 review={review as any} />
                     </div>
                  </CarouselItem>
               ))}
            </CarouselContent>
         </Carousel>

         <div className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-2.5">
               {api &&
                  getPropertyArray(testimonialsSection).map(({ id }, index) => (
                     <div
                        key={id}
                        className={cn(
                           'cursor-pointer rounded-full transition-all duration-200',
                           currentSlide === index
                              ? 'h-2 w-4 bg-primary'
                              : 'h-2 w-2 bg-gray-300',
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
                  className="hover:border-primary hover:bg-background"
               >
                  <ChevronLeft />
               </Button>
               <Button
                  size="icon"
                  variant="outline"
                  disabled={!api?.canScrollNext()}
                  onClick={() => api?.scrollNext()}
                  className="hover:border-primary hover:bg-background"
               >
                  <ChevronRight />
               </Button>
            </div>
         </div>

         <div className="after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:h-[240px] after:w-[240px] after:rounded-full after:bg-[rgba(0,167,111,1)] after:blur-[290px] after:content-['']"></div>

         <div className="after:pointer-events-none after:absolute after:top-0 after:right-0 after:h-[240px] after:w-[240px] after:rounded-full after:bg-[rgba(97,95,255,1))] after:blur-[290px] after:content-['']"></div>
      </Section>
   );
};

export default Testimonials;
