import { EditorBody } from '@/frontend/lib/components';
import Blogs from './blogs';
import CallToAction from './call-to-action';
import FAQs from './faqs';
import Hero from './hero';
import Instructor from './instructor';
import Overview from './overview';
import Testimonials from './testimonials';
import TopCategories from './top-categories';
import TopCourse from './top-course';
import TopCourses from './top-courses';

const home4PageData = () => {
   return (
      <EditorBody>
         {Hero()}
         {TopCategories()}
         {TopCourse()}
         {Overview()}
         {TopCourses()}
         {Instructor()}
         {FAQs()}
         {Testimonials()}
         {Blogs()}
         {CallToAction()}
      </EditorBody>
   );
};

export default home4PageData;
