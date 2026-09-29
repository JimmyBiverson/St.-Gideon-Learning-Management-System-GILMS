import { EditorBody } from '@/frontend/lib/components';
import Breadcrumb from '../common/breadcrumb';
import TopInstructors from './top-instructors';

const ourTeamPageData = () => {
   return (
      <EditorBody>
         {Breadcrumb('Our Team', 'our-team')}
         {TopInstructors()}
      </EditorBody>
   );
};

export default ourTeamPageData;
