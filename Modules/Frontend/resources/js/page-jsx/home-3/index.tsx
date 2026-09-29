import { EditorBody } from '@/frontend/lib/components';
import Blogs from './blogs';
import CallToAction from './call-to-action';
import CategoryCourses from './category-courses';
import Features from './features';
import Hero from './hero';
import NewCourses from './new-courses';
import Overview from './overview';
import Testimonials from './testimonials';
import TopCategories from './top-categories';
import TopInstructors from './top-instructors';

const home3PageData = () => {
   return (
      <EditorBody>
         {Hero()}
         {Overview()}
         {CategoryCourses()}
         {TopInstructors()}
         {Features()}
         {TopCategories()}
         {NewCourses()}
         {Testimonials()}
         {CallToAction()}
         {Blogs()}
      </EditorBody>
   );
};

export default home3PageData;
