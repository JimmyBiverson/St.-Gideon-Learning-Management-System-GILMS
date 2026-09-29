import { EditorBody } from '@/frontend/lib/components';
import Breadcrumb from '../common/breadcrumb';
import Content from './content';

const privacyPolicyPageData = () => {
   return (
      <EditorBody>
         {Breadcrumb('Privacy Policy', 'privacy-policy')}
         {Content()}
      </EditorBody>
   );
};

export default privacyPolicyPageData;
