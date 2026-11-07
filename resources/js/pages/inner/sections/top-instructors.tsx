import ProfilePhoto from '@/components/profile-photo';
import { Link, usePage } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { getPageSection } from '@/lib/page';
import Section from '@/pages/intro/partials/section';
import instructors from '@/routes/instructors';
import type { InnerPageProps } from '..';

const TopInstructors = () => {
   const { props } = usePage<InnerPageProps>();
   const { page, customize, topInstructors } = props;
   const topInstructorsSection = getPageSection(page, 'top_instructors');

   return (
      <Section
         customize={customize}
         pageSection={topInstructorsSection}
         containerClass="py-[120px]"
      >
         <div className="relative z-10 mx-auto mb-8 max-w-lg text-center">
            <h2 className="mb-2 text-2xl font-bold sm:text-[30px]">
               {topInstructorsSection?.title}
            </h2>
            <p className="text-muted-foreground">
               {topInstructorsSection?.description}
            </p>
         </div>

         <div className="relative">
            <div className="relative z-10 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-4">
               {topInstructors.map((instructor) => (
                  <Card
                     key={instructor.id}
                     className="relative overflow-hidden rounded-2xl !shadow-card-lg"
                  >
                     <Link
                        href={instructors.show(instructor.id)}
                        className="block h-full"
                     >
                        <div className="relative h-[300px] overflow-hidden">
                           <ProfilePhoto
                              src={instructor.user.photo}
                              name={instructor.user.name}
                              className="h-full w-full object-cover object-center"
                           />
                        </div>
                     </Link>

                     <div className="space-y-1 py-4 text-center">
                        <p
                           title={instructor.user.name}
                           className="line-clamp-2 min-w-0 font-semibold break-words"
                        >
                           {instructor.user.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                           {instructor.designation}
                        </p>
                     </div>
                  </Card>
               ))}
            </div>

            <div className="after:pointer-events-none after:absolute after:top-1/2 after:left-1/2 after:h-[240px] after:w-[240px] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-[rgba(97,95,255,1))] after:blur-[250px] after:content-['']"></div>
         </div>
      </Section>
   );
};

export default TopInstructors;
