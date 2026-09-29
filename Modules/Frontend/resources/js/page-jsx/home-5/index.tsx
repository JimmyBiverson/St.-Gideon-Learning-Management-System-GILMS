import { EditorBody } from '@/frontend/lib/components';
import Blogs from './blogs';
import CallToAction from './call-to-action';
import FAQs from './faqs';
import Hero from './hero';
import Instructor from './instructor';
import NewCourses from './new-courses';
import Statistics from './statistics';
import Testimonials from './testimonials';
import TopCategories from './top-categories';
import TopCourse from './top-course';

const home5PageData = () => {
   return (
      <EditorBody>
         {Hero()}
         {Statistics()}
         {TopCategories()}
         {TopCourse()}
         {NewCourses()}
         {Instructor()}
         {FAQs()}
         {Testimonials()}
         {CallToAction()}
         {Blogs()}
      </EditorBody>
   );
};

export default home5PageData;
