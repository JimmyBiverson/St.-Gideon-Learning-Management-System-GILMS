import { useState } from 'react';

import Button from '../../ui/Button';
import Input from '../../ui/Input';
import Label from '../../ui/Label';

interface LinkEditProps {
   initialUrl?: string;
   initialText?: string;
   isCreate?: boolean;
   onCancel: () => void;
   onApply: (url: string, text?: string) => void;
}

const LinkEdit = ({
   initialUrl,
   initialText,
   isCreate,
   onApply,
   onCancel,
}: LinkEditProps) => {
   const [url, setUrl] = useState(initialUrl || '');
   const [text, setText] = useState(initialText || '');
   const canSubmit =
      isCreate || Boolean((url && url !== initialUrl) || text !== initialText);

   const onSubmit = () => {
      if (canSubmit) {
         onApply(url!, text);
      }
   };

   return (
      <div className="rte-link__form" onSubmit={onSubmit}>
         <Label className="rte-link__label">URL</Label>
         <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="rte-link__input"
            placeholder="Paste link"
            type="url"
            required
            autoFocus
         />

         <Label className="rte-link__label">Display Text</Label>
         <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="rte-link__input"
            placeholder="Enter link text"
         />

         <div className="rte-link__actions">
            <Button type="button" variant="secondary" onClick={onCancel}>
               Cancel
            </Button>
            <Button type="button" disabled={!canSubmit} onClick={onSubmit}>
               Apply
            </Button>
         </div>
      </div>
   );
};

export default LinkEdit;
