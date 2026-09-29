import useCopyToClipboard from '../../../hooks/useCopyToClipboard';
import MenuButton from '../../MenuButton';
import { Toolbar } from '../../ui/Toolbar';

interface LinkViewProps {
   url: string;
   onEdit?: () => void;
   onRemove?: () => void;
}

const LinkView = ({ url, onEdit, onRemove }: LinkViewProps) => {
   const { copy, isCopied } = useCopyToClipboard();

   return (
      <Toolbar>
         <MenuButton text="Edit link" hideText={false} onClick={onEdit} />
         <MenuButton
            icon="ExternalLink"
            text="Open in new tab"
            onClick={() => window.open(url, '_blank')}
         />
         <MenuButton
            icon={isCopied ? 'Check' : 'Clipboard'}
            text={isCopied ? 'Copied' : 'Copy link'}
            onClick={() => copy(url)}
         />
         <MenuButton icon="Unlink" text="Remove link" onClick={onRemove} />
      </Toolbar>
   );
};

export default LinkView;
