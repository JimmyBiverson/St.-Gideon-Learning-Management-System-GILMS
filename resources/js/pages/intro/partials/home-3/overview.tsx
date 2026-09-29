import { usePage } from '@inertiajs/react';
import { DynamicIcon } from 'lucide-react/dynamic';
import { Card } from '@/components/ui/card';
import { getPageSection, getPropertyArray } from '@/lib/page';
import { cn } from '@/lib/utils';
import Section from '../section';
import Partners from './partners';

const Overview = () => {
   const { props } = usePage<IntroPageProps>();
   const overviewSection = getPageSection(props.page, 'overview');
   const array = getPropertyArray(overviewSection);
   const firstStat = array[0] ?? null;
   const secondStat = array[1] ?? null;
   const thirdStat = array[2] ?? null;

   return (
      <Section
         customize={props.customize}
         pageSection={overviewSection}
         containerClass={cn('relative')}
         contentClass="py-20"
      >
         <div className="mb-10 flex flex-col items-center justify-between gap-12 md:flex-row">
            {/* Left side - Content */}
            <div className="relative z-10 w-full space-y-4 md:max-w-[420px]">
               <h2 className="w-full text-3xl font-semibold md:text-4xl">
                  {overviewSection?.title}
               </h2>
               <p className="text-muted-foreground">
                  {overviewSection?.description}
               </p>
            </div>

            {/* Right side - Stats Grid */}
            <div className="relative md:max-w-[640px]">
               <div className="relative z-10 grid w-full grid-cols-1 gap-7 sm:grid-cols-2">
                  {firstStat && (
                     <Card className="border-2 border-white bg-background/20 px-6 py-16 !shadow-none backdrop-blur-lg md:py-[72px] dark:border-border">
                        <div className="mx-auto mt-3 flex h-[60px] w-[60px] items-center justify-center rounded-2xl bg-background shadow-card-md">
                           <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-foreground">
                              <DynamicIcon
                                 name={firstStat.icon}
                                 className="h-6 w-6 text-white"
                              />
                           </div>
                        </div>

                        <div className="mt-5 space-y-2 text-center">
                           <h3 className="text-4xl font-semibold md:text-[44px]">
                              {firstStat.count}
                           </h3>
                           <p className="mt-2">{firstStat.title}</p>
                        </div>
                     </Card>
                  )}

                  <div className="space-y-7">
                     {secondStat && (
                        <Card className="flex items-center justify-center gap-4 border-2 border-white bg-background/20 px-6 py-8 !shadow-none backdrop-blur-lg md:py-8 dark:border-border">
                           <div className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl bg-background shadow-card-md">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-foreground">
                                 <DynamicIcon
                                    name={secondStat.icon}
                                    className="h-6 w-6 text-white"
                                 />
                              </div>
                           </div>

                           <div className="space-y-1">
                              <h3 className="text-4xl font-semibold md:text-[44px]">
                                 {secondStat.count}
                              </h3>
                              <p className="mt-2">{secondStat.title}</p>
                           </div>
                        </Card>
                     )}

                     {thirdStat && (
                        <Card className="flex items-center justify-center gap-4 border-2 border-white bg-background/20 px-6 py-8 !shadow-none backdrop-blur-lg md:py-8 dark:border-border">
                           <div className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl bg-background shadow-card-md">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-foreground">
                                 <DynamicIcon
                                    name={thirdStat.icon}
                                    className="h-6 w-6 text-white"
                                 />
                              </div>
                           </div>

                           <div className="space-y-1">
                              <h3 className="text-4xl font-semibold md:text-[44px]">
                                 {thirdStat.count}
                              </h3>
                              <p className="mt-2">{thirdStat.title}</p>
                           </div>
                        </Card>
                     )}
                  </div>
               </div>

               <div className="after:pointer-events-none after:absolute after:top-1/2 after:left-1/2 after:h-[240px] after:w-[240px] after:-translate-x-1/2 after:-translate-y-1/2 after:bg-[rgba(97,95,255,1)] after:blur-[290px] after:content-['']"></div>
            </div>
         </div>

         <Partners />

         <div className="after:pointer-events-none after:absolute after:-top-14 after:-left-[180px] after:h-[240px] after:w-[240px] after:rounded-full after:bg-[rgba(0,167,111,1)] after:blur-[290px] after:content-['']"></div>
      </Section>
   );
};

export default Overview;
