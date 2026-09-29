import ContainerPlaceholder from './layouts/container-placeholder';
import DivPlaceholder from './layouts/div-placeholder';
import HrPlaceholder from './layouts/hr-placeholder';
import SectionPlaceholder from './layouts/section-placeholder';
import ThreeColumnsPlaceholder from './layouts/three-columns-placeholder';
import TwoColumnsPlaceholder from './layouts/two-columns-placeholder';

const LAYOUTS_PLACEHOLDERS: ComponentElement[] = [
   {
      placeholder: <SectionPlaceholder />,
      label: 'Section',
      id: 'section',
      group: 'layout',
   },
   {
      placeholder: <ContainerPlaceholder />,
      label: 'Container',
      id: 'container',
      group: 'layout',
   },
   {
      placeholder: <TwoColumnsPlaceholder />,
      label: '2 Columns',
      id: '2Col',
      group: 'layout',
   },
   {
      placeholder: <ThreeColumnsPlaceholder />,
      label: '3 Columns',
      id: '3Col',
      group: 'layout',
   },
   {
      placeholder: <DivPlaceholder />,
      label: 'Div',
      id: 'div',
      group: 'elements',
   },
   {
      placeholder: <HrPlaceholder />,
      label: 'HR',
      id: 'hr',
      group: 'elements',
   },
];

export default LAYOUTS_PLACEHOLDERS;
