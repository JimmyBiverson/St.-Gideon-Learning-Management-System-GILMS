import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { useState } from 'react';

import ApiCopy from './api-copy';
import DeleteCollection from './delete-collection';

interface Testimonial {
   name: string;
   image: string;
   rating: number;
   description: string;
}

interface TestimonialsCollectionProps {
   data: { top: Testimonial[]; new: Testimonial[] };
   onInsert: (
      type: string,
      category: FrontendPageAPIParams,
      itemData: Testimonial,
   ) => void;
}

const AddTestimonialDialog = ({
   category,
   onInsert,
}: {
   category: FrontendPageAPIParams;
   onInsert: (
      type: string,
      category: FrontendPageAPIParams,
      itemData: Testimonial,
   ) => void;
}) => {
   const [newTestimonial, setNewTestimonial] = useState<Testimonial>({
      name: '',
      image: '',
      rating: 5,
      description: '',
   });
   const [isDialogOpen, setIsDialogOpen] = useState(false);

   const handleSubmit = () => {
      if (newTestimonial.name && newTestimonial.description) {
         onInsert('testimonials', category, newTestimonial);
         setNewTestimonial({
            name: '',
            image: '',
            rating: 5,
            description: '',
         });
         setIsDialogOpen(false);
      }
   };

   return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
         <DialogTrigger asChild>
            <Button variant="outline">Add Testimonial</Button>
         </DialogTrigger>
         <DialogContent className="max-w-2xl">
            <DialogHeader>
               <DialogTitle>Add New Testimonial</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
               <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                     id="name"
                     placeholder="Enter name"
                     value={newTestimonial.name}
                     onChange={(e) =>
                        setNewTestimonial({
                           ...newTestimonial,
                           name: e.target.value,
                        })
                     }
                  />
               </div>
               <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                     id="image"
                     placeholder="/assets/images/users/user-1.jpg"
                     value={newTestimonial.image}
                     onChange={(e) =>
                        setNewTestimonial({
                           ...newTestimonial,
                           image: e.target.value,
                        })
                     }
                  />
               </div>
               <div className="space-y-2">
                  <Label htmlFor="rating">Rating</Label>
                  <Input
                     id="rating"
                     type="number"
                     min="1"
                     max="5"
                     value={newTestimonial.rating}
                     onChange={(e) =>
                        setNewTestimonial({
                           ...newTestimonial,
                           rating: parseInt(e.target.value) || 5,
                        })
                     }
                  />
               </div>
               <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                     id="description"
                     placeholder="Enter testimonial description"
                     rows={4}
                     value={newTestimonial.description}
                     onChange={(e) =>
                        setNewTestimonial({
                           ...newTestimonial,
                           description: e.target.value,
                        })
                     }
                  />
               </div>
               <div className="flex justify-end gap-2">
                  <Button
                     variant="outline"
                     onClick={() => setIsDialogOpen(false)}
                  >
                     Cancel
                  </Button>
                  <Button
                     onClick={handleSubmit}
                     disabled={
                        !newTestimonial.name || !newTestimonial.description
                     }
                  >
                     Add Testimonial
                  </Button>
               </div>
            </div>
         </DialogContent>
      </Dialog>
   );
};

const TestimonialsCollection = ({
   data,
   onInsert,
}: TestimonialsCollectionProps) => {
   const [value, setValue] = useState('top');

   const renderTestimonialRow = (
      testimonial: Testimonial,
      category: FrontendPageAPIParams,
      index: number,
   ) => (
      <TableRow key={index}>
         <TableCell>
            <img
               src={testimonial.image || '/placeholder.jpg'}
               alt={testimonial.name}
               className="h-12 w-12 rounded-full object-cover"
            />
         </TableCell>
         <TableCell className="font-medium">{testimonial.name}</TableCell>
         <TableCell>
            <div className="flex items-center gap-1">
               {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                     key={i}
                     className={`h-4 w-4 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
               ))}
            </div>
         </TableCell>
         <TableCell className="max-w-md truncate">
            {testimonial.description}
         </TableCell>
         <TableCell className="flex items-center justify-end">
            <DeleteCollection
               type="testimonials"
               category={category}
               itemId={index}
            />
         </TableCell>
      </TableRow>
   );

   return (
      <Card className="relative space-y-6 py-6">
         <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3">
            <div>
               <CardTitle className="text-xl font-bold">Testimonials</CardTitle>
               <ApiCopy value={`api/collections/testimonials/${value}`} />
            </div>

            <AddTestimonialDialog
               category={value as FrontendPageAPIParams}
               onInsert={onInsert}
            />
         </CardHeader>

         <CardContent>
            <Tabs
               defaultValue="top"
               className="w-full"
               value={value}
               onValueChange={setValue}
            >
               <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="top" className="cursor-pointer">
                     Top Testimonials
                  </TabsTrigger>
                  <TabsTrigger value="new" className="cursor-pointer">
                     New Testimonials
                  </TabsTrigger>
               </TabsList>

               <TabsContent value="top">
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead>Image</TableHead>
                           <TableHead>Name</TableHead>
                           <TableHead>Rating</TableHead>
                           <TableHead>Description</TableHead>
                           <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {data.top && data.top.length > 0 ? (
                           data.top.map((testimonial, index) =>
                              renderTestimonialRow(testimonial, 'top', index),
                           )
                        ) : (
                           <TableRow>
                              <TableCell
                                 colSpan={5}
                                 className="text-center text-muted-foreground"
                              >
                                 No top testimonials added
                              </TableCell>
                           </TableRow>
                        )}
                     </TableBody>
                  </Table>
               </TabsContent>

               <TabsContent value="new">
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead>Image</TableHead>
                           <TableHead>Name</TableHead>
                           <TableHead>Rating</TableHead>
                           <TableHead>Description</TableHead>
                           <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {data.new && data.new.length > 0 ? (
                           data.new.map((testimonial, index) =>
                              renderTestimonialRow(testimonial, 'new', index),
                           )
                        ) : (
                           <TableRow>
                              <TableCell
                                 colSpan={5}
                                 className="text-center text-muted-foreground"
                              >
                                 No new testimonials added
                              </TableCell>
                           </TableRow>
                        )}
                     </TableBody>
                  </Table>
               </TabsContent>
            </Tabs>
         </CardContent>
      </Card>
   );
};

export default TestimonialsCollection;
