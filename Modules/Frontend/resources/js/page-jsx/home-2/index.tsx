import { EditorBody } from '@/frontend/lib/components';
import Blogs from './blogs';
import CallToAction from './call-to-action';
import Hero from './hero';
import NewCourses from './new-courses';
import Overview from './overview';
import Partners from './partners';
import Testimonials from './testimonials';
import TopCategories from './top-categories';
import TopCourses from './top-courses';
import TopInstructors from './top-instructors';

const home2PageData = () => {
   return (
      <EditorBody>
         {Hero()}
         {TopCategories()}
         {Overview()}
         {TopCourses()}
         {NewCourses()}
         {TopInstructors()}
         {Testimonials()}
         {Partners()}
         {CallToAction()}
         {Blogs()}
      </EditorBody>
   );
};

export default home2PageData;
