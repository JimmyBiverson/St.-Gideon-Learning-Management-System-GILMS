import { EditorBody } from '@/frontend/lib/components';
import Breadcrumb from '../common/breadcrumb';
import Content from './content';

const termsAndConditionsPageData = () => {
   return (
      <EditorBody>
         {Breadcrumb('Terms and Conditions', 'terms-and-conditions')}
         {Content()}
      </EditorBody>
   );
};

export default termsAndConditionsPageData;
