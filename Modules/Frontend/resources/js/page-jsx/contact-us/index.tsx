import { EditorBody } from '@/frontend/lib/components';
import Breadcrumb from '../common/breadcrumb';
import Content from './content';

const contactUsPageData = () => {
   return (
      <EditorBody>
         {Breadcrumb('Contact Us', 'contact-us')}
         {Content()}
      </EditorBody>
   );
};

export default contactUsPageData;
