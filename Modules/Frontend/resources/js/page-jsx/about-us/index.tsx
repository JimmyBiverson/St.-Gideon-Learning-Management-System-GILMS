import { EditorBody } from '@/frontend/lib/components';
import Breadcrumb from '../common/breadcrumb';
import CallToAction from './call-to-action';
import Hero from './hero';
import SuccessStatistics from './success-statistics';
import Team from './team';

const aboutUsPageData = () => {
   return (
      <EditorBody>
         {Breadcrumb('About Us', 'about-us')}
         {Hero()}
         {SuccessStatistics()}
         {Team()}
         {CallToAction()}
      </EditorBody>
   );
};

export default aboutUsPageData;
