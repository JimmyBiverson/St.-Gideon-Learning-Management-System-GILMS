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
import { ExternalLink } from 'lucide-react';
import { useState } from 'react';

import ApiCopy from './api-copy';
import DeleteCollection from './delete-collection';

interface Sponsor {
   image: string;
   url: string;
}

interface SponsorsCollectionProps {
   data: { top: Sponsor[]; new: Sponsor[] };
   onInsert: (
      type: string,
      category: FrontendPageAPIParams,
      itemData: Sponsor,
   ) => void;
}

const AddSponsorDialog = ({
   category,
   onInsert,
}: {
   category: FrontendPageAPIParams;
   onInsert: (
      type: string,
      category: FrontendPageAPIParams,
      itemData: Sponsor,
   ) => void;
}) => {
   const [newSponsor, setNewSponsor] = useState<Sponsor>({
      image: '',
      url: '',
   });
   const [isDialogOpen, setIsDialogOpen] = useState(false);

   const handleSubmit = () => {
      if (newSponsor.image && newSponsor.url) {
         onInsert('sponsors', category, newSponsor);
         setNewSponsor({
            image: '',
            url: '',
         });
         setIsDialogOpen(false);
      }
   };

   return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
         <DialogTrigger asChild>
            <Button
               variant="outline"
               onClick={() => {
                  setIsDialogOpen(true);
               }}
               className="capitalize"
            >
               Add {category} Sponsor
            </Button>
         </DialogTrigger>
         <DialogContent className="max-w-2xl">
            <DialogHeader>
               <DialogTitle>Add New Sponsor</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
               <div className="space-y-2">
                  <Label htmlFor="image">Image URL *</Label>
                  <Input
                     id="image"
                     placeholder="/assets/images/sponsors/company-logo.png"
                     value={newSponsor.image}
                     onChange={(e) =>
                        setNewSponsor({
                           ...newSponsor,
                           image: e.target.value,
                        })
                     }
                  />
               </div>
               <div className="space-y-2">
                  <Label htmlFor="url">Website URL *</Label>
                  <Input
                     id="url"
                     type="url"
                     placeholder="https://www.example.com"
                     value={newSponsor.url}
                     onChange={(e) =>
                        setNewSponsor({ ...newSponsor, url: e.target.value })
                     }
                  />
               </div>
               {newSponsor.image && (
                  <div className="space-y-2">
                     <Label>Preview</Label>
                     <div className="rounded border bg-muted/50 p-4">
                        <img
                           src={newSponsor.image}
                           alt="Preview"
                           className="h-16 w-auto object-contain"
                        />
                     </div>
                  </div>
               )}
               <div className="flex justify-end gap-2">
                  <Button
                     variant="outline"
                     onClick={() => setIsDialogOpen(false)}
                  >
                     Cancel
                  </Button>
                  <Button
                     onClick={handleSubmit}
                     disabled={!newSponsor.image || !newSponsor.url}
                  >
                     Add Sponsor
                  </Button>
               </div>
            </div>
         </DialogContent>
      </Dialog>
   );
};

const SponsorsCollection = ({ data, onInsert }: SponsorsCollectionProps) => {
   const [value, setValue] = useState('top');

   const renderSponsorRow = (
      sponsor: Sponsor,
      category: FrontendPageAPIParams,
      index: number,
   ) => (
      <TableRow key={index}>
         <TableCell className="py-6">
            <div className="flex items-center gap-3">
               {sponsor.image ? (
                  <img
                     src={sponsor.image}
                     alt="Sponsor logo"
                     className="h-8 w-auto object-contain"
                  />
               ) : (
                  <div className="flex h-8 w-20 items-center justify-center rounded bg-muted text-xs">
                     No Image
                  </div>
               )}
            </div>
         </TableCell>
         <TableCell>
            <div className="flex items-center justify-center">
               <Button
                  asChild
                  size="icon"
                  variant="ghost"
                  className="rounded-full"
               >
                  <a
                     href={sponsor.url}
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     {sponsor.url}
                     <ExternalLink className="h-3 w-3" />
                  </a>
               </Button>
            </div>
         </TableCell>
         <TableCell>
            <div className="flex items-center justify-end">
               <DeleteCollection
                  type="sponsors"
                  category={category}
                  itemId={index}
               />
            </div>
         </TableCell>
      </TableRow>
   );

   return (
      <Card className="relative space-y-6 py-6">
         <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3">
            <div>
               <CardTitle className="text-xl font-bold">Sponsors</CardTitle>
               <ApiCopy value={`api/collections/sponsors/${value}`} />
            </div>

            <AddSponsorDialog
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
                     Top Sponsors
                  </TabsTrigger>
                  <TabsTrigger value="new" className="cursor-pointer">
                     New Sponsors
                  </TabsTrigger>
               </TabsList>

               <TabsContent value="top">
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead>Logo</TableHead>
                           <TableHead className="text-center">
                              Website URL
                           </TableHead>
                           <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {data.top && data.top.length > 0 ? (
                           data.top.map((sponsor, index) =>
                              renderSponsorRow(sponsor, 'top', index),
                           )
                        ) : (
                           <TableRow>
                              <TableCell
                                 colSpan={3}
                                 className="text-center text-muted-foreground"
                              >
                                 No top sponsors added
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
                           <TableHead>Logo</TableHead>
                           <TableHead className="text-center">
                              Website URL
                           </TableHead>
                           <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {data.new && data.new.length > 0 ? (
                           data.new.map((sponsor, index) =>
                              renderSponsorRow(sponsor, 'new', index),
                           )
                        ) : (
                           <TableRow>
                              <TableCell
                                 colSpan={3}
                                 className="text-center text-muted-foreground"
                              >
                                 No new sponsors added
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

export default SponsorsCollection;
