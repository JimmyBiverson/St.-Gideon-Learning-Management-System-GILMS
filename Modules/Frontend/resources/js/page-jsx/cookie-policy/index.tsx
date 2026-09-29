import { EditorBody } from '@/frontend/lib/components';
import Breadcrumb from '../common/breadcrumb';
import Content from './content';

const cookiePolicyPageData = () => {
   return (
      <EditorBody>
         {Breadcrumb('Cookie Policy', 'cookie-policy')}
         {Content()}
      </EditorBody>
   );
};

export default cookiePolicyPageData;
