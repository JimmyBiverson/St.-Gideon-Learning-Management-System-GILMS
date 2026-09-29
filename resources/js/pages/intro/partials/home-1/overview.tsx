import { usePage } from '@inertiajs/react';
import { DynamicIcon } from 'lucide-react/dynamic';
import { Card } from '@/components/ui/card';
import { getPageSection, getPropertyArray } from '@/lib/page';
import { getColorWithOpacity } from '@/lib/utils';
import Section from '../section';

const Overview = () => {
   const { props } = usePage<IntroPageProps>();
   const overviewSection = getPageSection(props.page, 'overview');

   return (
      <Section
         customize={props.customize}
         pageSection={overviewSection}
         containerClass="py-20"
         contentClass="text-center"
      >
         <div className="relative grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-4">
            {getPropertyArray(overviewSection).map(
               (stat: any, index: number) => {
                  return (
                     <Card
                        key={`element-${index}`}
                        className="bg-secondary-100er rounded-3xl border-none px-6 py-10 !shadow-none md:py-12"
                        style={{
                           backgroundColor: getColorWithOpacity(
                              stat.color,
                              0.1,
                           ),
                        }}
                     >
                        <div
                           className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary-foreground"
                           style={{
                              backgroundColor: getColorWithOpacity(
                                 stat.color,
                                 1,
                              ),
                           }}
                        >
                           <DynamicIcon
                              name={stat.icon}
                              className="h-8 w-8 text-white"
                           />
                        </div>

                        <div className="mt-4 space-y-2">
                           <h3 className="text-4xl font-semibold md:text-[44px]">
                              {stat.count}
                           </h3>
                           <p className="mt-6 text-muted-foreground">
                              {stat.title}
                           </p>
                        </div>
                     </Card>
                  );
               },
            )}
         </div>
      </Section>
   );
};

export default Overview;
