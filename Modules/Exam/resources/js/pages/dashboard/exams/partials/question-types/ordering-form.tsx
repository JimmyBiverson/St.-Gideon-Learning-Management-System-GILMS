import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GripVertical, Plus, Trash2 } from 'lucide-react';
import { useEffect } from 'react';

interface Props {
   data: any;
   setData: (key: string, value: any) => void;
   errors: any;
}

const OrderingForm = ({ data, setData, errors }: Props) => {
   const items: string[] = data.options?.items || [];

   useEffect(() => {
      if (items.length === 0) {
         setData('options', { items: ['', '', ''], correct_order: [0, 1, 2] });
      }
   }, [items.length, setData]);

   const addItem = () => {
      const newItems = [...items, ''];
      setData('options', {
         items: newItems,
         correct_order: newItems.map((_, i) => i),
      });
   };

   const removeItem = (index: number) => {
      const newItems = items.filter((_, i) => i !== index);
      setData('options', {
         items: newItems,
         correct_order: newItems.map((_, i) => i),
      });
   };

   const updateItem = (index: number, value: string) => {
      const newItems = [...items];
      newItems[index] = value;
      setData('options', {
         items: newItems,
         correct_order: newItems.map((_, i) => i),
      });
   };

   const moveItem = (index: number, direction: 'up' | 'down') => {
      if (
         (direction === 'up' && index === 0) ||
         (direction === 'down' && index === items.length - 1)
      ) {
         return;
      }

      const newItems = [...items];
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      [newItems[index], newItems[newIndex]] = [
         newItems[newIndex],
         newItems[index],
      ];
      setData('options', {
         items: newItems,
         correct_order: newItems.map((_, i) => i),
      });
   };

   return (
      <div className="space-y-4">
         <div>
            <Label>Instructions</Label>
            <div className="rounded-md bg-blue-50 p-3 text-sm text-blue-900">
               <p className="mb-1 font-medium">How ordering questions work:</p>
               <p>1. List the items in the correct order below</p>
               <p>2. The system will shuffle them for students</p>
               <p>3. Students must arrange them in the correct order</p>
            </div>
         </div>

         <div className="space-y-3">
            <div className="flex items-center justify-between">
               <Label>Items (in correct order) *</Label>
               <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addItem}
               >
                  <Plus className="h-4 w-4" />
                  Add Item
               </Button>
            </div>

            {items.map((item, index) => (
               <div key={index} className="flex items-center gap-2">
                  <div className="flex flex-col gap-1">
                     <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => moveItem(index, 'up')}
                        disabled={index === 0}
                        className="h-5 w-8 p-0 text-gray-400 hover:text-gray-600"
                     >
                        ▲
                     </Button>
                     <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => moveItem(index, 'down')}
                        disabled={index === items.length - 1}
                        className="h-5 w-8 p-0 text-gray-400 hover:text-gray-600"
                     >
                        ▼
                     </Button>
                  </div>

                  <GripVertical className="h-5 w-5 text-gray-400" />

                  <span className="w-8 text-sm font-medium text-gray-500">
                     {index + 1}.
                  </span>

                  <div className="flex-1">
                     <Input
                        placeholder={`Item ${index + 1}`}
                        value={item}
                        onChange={(e) => updateItem(index, e.target.value)}
                     />
                  </div>

                  {items.length > 2 && (
                     <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(index)}
                        className="text-red-600"
                     >
                        <Trash2 className="h-4 w-4" />
                     </Button>
                  )}
               </div>
            ))}
         </div>

         <InputError message={errors.options} />
      </div>
   );
};

export default OrderingForm;
