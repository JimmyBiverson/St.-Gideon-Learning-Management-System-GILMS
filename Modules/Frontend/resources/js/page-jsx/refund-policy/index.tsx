import { EditorBody } from '@/frontend/lib/components';
import Breadcrumb from '../common/breadcrumb';
import Content from './content';

const refundPolicyPageData = () => {
   return (
      <EditorBody>
         {Breadcrumb('Refund Policy', 'refund-policy')}
         {Content()}
      </EditorBody>
   );
};

export default refundPolicyPageData;
