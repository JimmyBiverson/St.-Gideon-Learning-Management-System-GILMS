import ProfilePhoto from '@/components/profile-photo';
import { Link, usePage } from '@inertiajs/react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import InstructorSocials from '@/components/instructor-socials';
import { Button } from '@/components/ui/button';
import {
   Carousel,
   CarouselContent,
   CarouselItem,
} from '@/components/ui/carousel';
import type { CarouselApi } from '@/components/ui/carousel';
import { getPageSection } from '@/lib/page';
import instructors from '@/routes/instructors';
import Section from '../section';

const TopInstructors = () => {
   const { props } = usePage<IntroPageProps>();
   const { page, customize, topInstructors } = props;
   const topInstructorsSection = getPageSection(page, 'top_instructors');
   const [api, setApi] = useState<CarouselApi>();

   return (
      <Section
         customize={customize}
         pageSection={topInstructorsSection}
         containerClass="py-20"
      >
         <div className="mx-auto mb-10 text-center md:max-w-[480px]">
            <p className="mb-1 font-medium text-secondary-foreground">
               {topInstructorsSection?.title}
            </p>
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
               {topInstructorsSection?.sub_title}
            </h2>
            <p className="text-muted-foreground">
               {topInstructorsSection?.description}
            </p>
         </div>

         <Carousel
            setApi={setApi}
            className="relative"
            opts={{ align: 'start', loop: true }}
            plugins={[Autoplay({ delay: 3000 })]}
         >
            <CarouselContent>
               {topInstructors.map((instructor) => {
                  return (
                     <CarouselItem
                        key={instructor.id}
                        className="basis-full md:basis-1/2 lg:basis-1/4"
                     >
                        <div className="px-1.5 py-0.5">
                           <div className="group relative h-[380px] overflow-hidden rounded-2xl">
                              <Link
                                 href={instructors.show(instructor.id)}
                                 className="block h-full"
                              >
                                 <ProfilePhoto
                                    src={instructor.user.photo}
                                    name={instructor.user.name}
                                    className="h-full w-full object-cover object-center"
                                 />

                                 <div className="absolute bottom-0 left-1/2 flex h-full w-full -translate-x-1/2 flex-col justify-end bg-gradient-to-t from-primary px-4 pt-4 pb-2 text-center opacity-100 transition-all duration-200 md:opacity-0 md:group-focus-within:opacity-100 md:group-hover:opacity-100 dark:from-primary-foreground">
                                    <p
                                       title={instructor.user.name}
                                       className="mb-1 line-clamp-2 min-w-0 text-lg font-semibold break-words text-white"
                                    >
                                       {instructor.user.name}
                                    </p>
                                    <p className="text-sm text-white">
                                       {instructor.designation}
                                    </p>
                                 </div>
                              </Link>

                              <div className="absolute bottom-0 left-1/2 w-full -translate-x-1/2 bg-gradient-to-t from-primary opacity-100 transition-all duration-200 md:opacity-0 md:group-focus-within:opacity-100 md:group-hover:opacity-100 dark:from-primary-foreground">
                                 <InstructorSocials
                                    instructor={instructor}
                                    buttonVariant="ghost"
                                    buttonClass="bg-muted hover:bg-muted/80 dark:bg-primary/90 dark:hover:bg-primary/80 dark:text-primary-foreground"
                                    className="py-2"
                                 />
                              </div>
                           </div>
                        </div>
                     </CarouselItem>
                  );
               })}
            </CarouselContent>

            <Button
               size="icon"
               variant="outline"
               disabled={!api?.canScrollPrev()}
               onClick={() => api?.scrollPrev()}
               className="absolute top-1/2 -left-3 -translate-y-1/2 hover:border-primary hover:bg-background"
            >
               <ChevronLeft />
            </Button>
            <Button
               size="icon"
               variant="outline"
               disabled={!api?.canScrollNext()}
               onClick={() => api?.scrollNext()}
               className="absolute top-1/2 -right-3 -translate-y-1/2 hover:border-primary hover:bg-background"
            >
               <ChevronRight />
            </Button>
         </Carousel>
      </Section>
   );
};

export default TopInstructors;
