import { EditorBody } from '@/frontend/lib/components';
import Blogs from './blogs';
import CallToAction from './call-to-action';
import FAQs from './faqs';
import Hero from './hero';
import NewCourses from './new-courses';
import Overview from './overview';
import Partners from './partners';
import TopCategories from './top-categories';
import TopCourses from './top-courses';
import TopInstructors from './top-instructors';

const home1PageData = () => {
   return (
      <EditorBody>
         {Hero()}
         {Partners()}
         {TopCategories()}
         {TopCourses()}
         {Overview()}
         {NewCourses()}
         {TopInstructors()}
         {FAQs()}
         {Blogs()}
         {CallToAction()}
      </EditorBody>
   );
};

export default home1PageData;
