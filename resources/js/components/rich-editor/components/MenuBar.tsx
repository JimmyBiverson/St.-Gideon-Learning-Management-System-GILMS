import { memo } from 'react';

import AIWriteButton from '@/components/rich-editor/components/controls/AIWriteButton';
import TableButton from '@/components/rich-editor/components/controls/TableButton';
import { usePlugin } from '@/hooks/use-plugin';
import AlignPopover from './controls/AlignPopover';
import BlockquoteButton from './controls/BlockquoteButton';
import BoldButton from './controls/BoldButton';
import BulletListButton from './controls/BulletListButton';
import CodeBlockButton from './controls/CodeBlockButton';
import HeadingDropdown from './controls/HeadingDropdown';
import ImageButton from './controls/ImageButton';
import ItalicButton from './controls/ItalicButton';
import LinkButton from './controls/LinkButton';
import MoreMarkDropdown from './controls/MoreMarkPopover';
import OrderedListButton from './controls/OrderedList';
import RedoButton from './controls/RedoButton';
import TextColorButton from './controls/TextColorButton';
import TextHighlightButton from './controls/TextHighlightButton';
import UnderlineButton from './controls/UnderlineButton';
import UndoButton from './controls/UndoButton';
import YoutubeButton from './controls/YoutubeButton';
import { Toolbar, ToolbarDivider } from './ui/Toolbar';

const MenuBar = () => {
   return (
      <div className="rte-menu-bar">
         <Toolbar dense>
            <UndoButton />
            <RedoButton />
            {/* <ClearFormatButton /> */}

            <ToolbarDivider />

            <HeadingDropdown />

            <ToolbarDivider />

            <BoldButton />
            <ItalicButton />
            <UnderlineButton />
            <MoreMarkDropdown />

            <ToolbarDivider />

            <TextColorButton />
            <TextHighlightButton />

            <ToolbarDivider />

            <AlignPopover />
            <BulletListButton />
            <OrderedListButton />

            <ToolbarDivider />

            <BlockquoteButton />
            <LinkButton />
            <ImageButton />
            <YoutubeButton />
            <CodeBlockButton />
            <TableButton />

            {usePlugin('AIAssistant') && <AIWriteButton />}
            {/* <InsertDropdown /> */}
         </Toolbar>
      </div>
   );
};

export default memo(MenuBar);
