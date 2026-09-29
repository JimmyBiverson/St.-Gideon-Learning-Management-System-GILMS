import { Form, useForm, router } from '@inertiajs/react';
import {
   ArrowUpDown,
   AtSign,
   Copyright,
   CreditCard,
   Edit,
   Globe,
   Image,
   Link2,
   List,
   MessageCircle,
   Plus,
   Share2,
   Trash2,
   X,
} from 'lucide-react';
import { useState } from 'react';
import DataSortModal from '@/components/data-sort-modal';
import DeleteModal from '@/components/inertia/delete-modal';
import Switch from '@/components/switch';
import Tabs from '@/components/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import footerItems from '@/routes/footer/items';

interface FooterItemFormState {
   type: string;
   items: any[];
   sort: number;
   active: boolean;
}

const FooterEditor = ({ footer }: { footer: Footer }) => {
   const footerItemsList = footer.footer_items;
   const [activeType, setActiveType] = useState<string>('list');
   const [editingItem, setEditingItem] = useState<FooterItem | null>(null);
   const [isFormOpen, setIsFormOpen] = useState(false);
   const [formKey, setFormKey] = useState(0);

   const { data, setData } = useForm<FooterItemFormState>({
      type: 'list',
      items: [],
      sort: 0,
      active: true,
   });

   // Filter items by type
   const filteredItems = footerItemsList.filter(
      (item) => item.type === activeType,
   );

   const openCreateForm = (type: string) => {
      setEditingItem(null);
      setFormKey((k) => k + 1);
      setData({
         type,
         items: [],
         sort: Math.max(...footerItemsList.map((item) => item.sort), 0) + 1,
         active: true,
      });
      setIsFormOpen(true);
   };

   const openEditForm = (item: FooterItem) => {
      setEditingItem(item);
      setFormKey((k) => k + 1);
      setData({
         type: item.type,
         items: Array.isArray(item.items) ? item.items : [],
         sort: item.sort,
         active: item.active,
      });
      setIsFormOpen(true);
   };

   // Helper functions for different item types
   const addListItem = () => {
      setData('items', [...data.items, { title: '', url: '' }]);
   };

   const updateListItem = (
      index: number,
      field: 'title' | 'url',
      value: string,
   ) => {
      const updatedItems = [...data.items];
      updatedItems[index] = { ...updatedItems[index], [field]: value };
      setData('items', updatedItems);
   };

   const removeListItem = (index: number) => {
      setData(
         'items',
         data.items.filter((_: any, i: number) => i !== index),
      );
   };

   const addSocialMediaItem = () => {
      setData('items', [
         ...data.items,
         { title: '', url: '', icon: 'facebook' },
      ]);
   };

   const updateSocialMediaItem = (
      index: number,
      field: 'title' | 'url' | 'icon',
      value: string,
   ) => {
      const updatedItems = [...data.items];
      updatedItems[index] = { ...updatedItems[index], [field]: value };
      setData('items', updatedItems);
   };

   const addPaymentMethodItem = () => {
      setData('items', [...data.items, { image: '' }]);
   };

   const updatePaymentMethodItem = (index: number, value: string) => {
      const updatedItems = [...data.items];
      updatedItems[index] = { image: value };
      setData('items', updatedItems);
   };

   const removeDynamicItem = (index: number) => {
      setData(
         'items',
         data.items.filter((_: any, i: number) => i !== index),
      );
   };

   const socialMediaIcons = [
      {
         value: 'facebook',
         label: 'Facebook',
         icon: <Globe className="h-4 w-4" />,
      },
      {
         value: 'twitter',
         label: 'Twitter',
         icon: <MessageCircle className="h-4 w-4" />,
      },
      {
         value: 'instagram',
         label: 'Instagram',
         icon: <Image className="h-4 w-4" />,
      },
      {
         value: 'linkedin',
         label: 'LinkedIn',
         icon: <Link2 className="h-4 w-4" />,
      },
      {
         value: 'github',
         label: 'GitHub',
         icon: <AtSign className="h-4 w-4" />,
      },
      {
         value: 'youtube',
         label: 'YouTube',
         icon: <Globe className="h-4 w-4" />,
      },
   ];

   return (
      <div className="p-4 sm:p-6">
         {/* Type Tabs */}
         <Tabs value={activeType} onValueChange={setActiveType}>
            <div className="mb-6 flex flex-col justify-between gap-6 md:flex-row md:items-center">
               <TabsList className="grid h-auto grid-cols-2 sm:h-10 sm:grid-cols-4">
                  <TabsTrigger
                     value="list"
                     className="flex h-8 cursor-pointer items-center gap-2"
                  >
                     <List className="h-4 w-4" />
                     List (
                     {
                        footerItemsList.filter((item) => item.type === 'list')
                           .length
                     }
                     )
                  </TabsTrigger>
                  <TabsTrigger
                     value="social_media"
                     className="flex h-8 cursor-pointer items-center gap-2"
                  >
                     <Share2 className="h-4 w-4" />
                     Social (
                     {
                        footerItemsList.filter(
                           (item) => item.type === 'social_media',
                        ).length
                     }
                     )
                  </TabsTrigger>
                  <TabsTrigger
                     value="payment_methods"
                     className="flex h-8 cursor-pointer items-center gap-2"
                  >
                     <CreditCard className="h-4 w-4" />
                     Payment (
                     {
                        footerItemsList.filter(
                           (item) => item.type === 'payment_methods',
                        ).length
                     }
                     )
                  </TabsTrigger>
                  <TabsTrigger
                     value="copyright"
                     className="flex h-8 cursor-pointer items-center gap-2"
                  >
                     <Copyright className="h-4 w-4" />
                     Copyright (
                     {
                        footerItemsList.filter(
                           (item) => item.type === 'copyright',
                        ).length
                     }
                     )
                  </TabsTrigger>
               </TabsList>

               <div className="flex items-center gap-2">
                  <DataSortModal
                     title="Footer Items"
                     data={filteredItems}
                     handler={
                        <Button
                           variant="outline"
                           className="flex items-center gap-2"
                        >
                           <ArrowUpDown className="h-4 w-4" />
                           Reorder
                        </Button>
                     }
                     onOrderChange={(newOrder, setOpen) => {
                        router.post(
                           footerItems.reorder(),
                           {
                              sortedData: newOrder,
                           },
                           {
                              preserveScroll: true,
                              onSuccess: () => setOpen && setOpen(false),
                           },
                        );
                     }}
                     renderContent={(item) => (
                        <Card className="flex w-full items-center justify-between px-4 py-3">
                           <p>{item.title}</p>

                           <div className="flex items-center space-x-2">
                              <Label htmlFor="active" className="mb-0">
                                 Active
                              </Label>
                              <Switch
                                 id="active"
                                 defaultChecked={item.active}
                                 onCheckedChange={(checked) => {
                                    router.put(
                                       `/dashboard/settings/navbar-items/${item.id}`,
                                       {
                                          ...(item as any),
                                          active: checked,
                                       },
                                    );
                                 }}
                              />
                           </div>
                        </Card>
                     )}
                  />

                  <Button
                     onClick={() => openCreateForm(activeType)}
                     className="flex items-center gap-2"
                  >
                     <Plus className="h-4 w-4" />
                     Add{' '}
                     <span className="capitalize">
                        {activeType.replace('_', ' ')}
                     </span>
                  </Button>
               </div>
            </div>

            {/* List Items */}
            <TabsContent value="list" className="space-y-4">
               {filteredItems.length > 0 ? (
                  <div className="space-y-4">
                     {filteredItems.map((item) => (
                        <div key={item.id} className="rounded-lg bg-muted p-3">
                           <div className="flex items-center gap-3">
                              <List className="h-4 w-4" />
                              <div className="flex-1">
                                 <div className="font-medium">{item.title}</div>
                                 <div className="text-sm text-muted-foreground">
                                    {item.items && Array.isArray(item.items)
                                       ? `${item.items.length} items`
                                       : '0 items'}
                                 </div>
                              </div>
                              <div className="flex gap-2">
                                 <Button
                                    variant="secondary"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => openEditForm(item)}
                                 >
                                    <Edit className="h-3 w-3" />
                                 </Button>
                                 <DeleteModal
                                    routePath={footerItems.destroy.url(
                                       Number(item.id),
                                    )}
                                    actionComponent={
                                       <Button
                                          variant="ghost"
                                          className="h-8 w-8 bg-destructive/8 hover:bg-destructive/6"
                                       >
                                          <Trash2 className="h-3 w-3 text-destructive" />
                                       </Button>
                                    }
                                 />
                              </div>
                           </div>
                           {item.items && Array.isArray(item.items) && (
                              <div className="mt-2 ml-8 space-y-1">
                                 {(item.items as any[]).map(
                                    (subItem: any, idx: number) => (
                                       <div
                                          key={idx}
                                          className="flex items-center gap-2 text-sm text-muted-foreground"
                                       >
                                          <span>•</span>
                                          <span>{subItem.title}</span>
                                          {subItem.url && (
                                             <span className="text-muted-foreground/60">
                                                ({subItem.url})
                                             </span>
                                          )}
                                       </div>
                                    ),
                                 )}
                              </div>
                           )}
                        </div>
                     ))}
                  </div>
               ) : (
                  <div className="py-8 text-center text-muted-foreground">
                     No list items found. Click "Add List" to create one.
                  </div>
               )}
            </TabsContent>

            {/* Social Media Items */}
            <TabsContent value="social_media" className="space-y-4">
               {filteredItems.length > 0 ? (
                  <div className="space-y-4">
                     {filteredItems.map((item) => (
                        <div key={item.id} className="rounded-lg bg-muted p-3">
                           <div className="flex items-center gap-3">
                              <Share2 className="h-4 w-4" />
                              <div className="flex-1">
                                 <div className="font-medium">{item.title}</div>
                                 <div className="text-sm text-muted-foreground">
                                    {item.items && Array.isArray(item.items)
                                       ? `${item.items.length} social links`
                                       : '0 social links'}
                                 </div>
                              </div>
                              <div className="flex gap-2">
                                 <Button
                                    variant="secondary"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => openEditForm(item)}
                                 >
                                    <Edit className="h-3 w-3" />
                                 </Button>
                                 <DeleteModal
                                    routePath={footerItems.destroy.url(
                                       Number(item.id),
                                    )}
                                    actionComponent={
                                       <Button
                                          variant="ghost"
                                          className="h-8 w-8 bg-destructive/8 hover:bg-destructive/6"
                                       >
                                          <Trash2 className="h-3 w-3 text-destructive" />
                                       </Button>
                                    }
                                 />
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               ) : (
                  <div className="py-8 text-center text-muted-foreground">
                     No social media sections found. Click "Add Social Media" to
                     create one.
                  </div>
               )}
            </TabsContent>

            {/* Payment Methods Items */}
            <TabsContent value="payment_methods" className="space-y-4">
               {filteredItems.length > 0 ? (
                  <div className="space-y-4">
                     {filteredItems.map((item) => (
                        <div key={item.id} className="rounded-lg bg-muted p-3">
                           <div className="flex items-center gap-3">
                              <CreditCard className="h-4 w-4" />
                              <div className="flex-1">
                                 <div className="font-medium">{item.title}</div>
                                 <div className="text-sm text-muted-foreground">
                                    {item.items && Array.isArray(item.items)
                                       ? `${item.items.length} payment methods`
                                       : '0 payment methods'}
                                 </div>
                              </div>
                              <div className="flex gap-2">
                                 <Button
                                    variant="secondary"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => openEditForm(item)}
                                 >
                                    <Edit className="h-3 w-3" />
                                 </Button>
                                 <DeleteModal
                                    routePath={footerItems.destroy.url(
                                       Number(item.id),
                                    )}
                                    actionComponent={
                                       <Button
                                          variant="ghost"
                                          className="h-8 w-8 bg-destructive/8 hover:bg-destructive/6"
                                       >
                                          <Trash2 className="h-3 w-3 text-destructive" />
                                       </Button>
                                    }
                                 />
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               ) : (
                  <div className="py-8 text-center text-muted-foreground">
                     No payment methods found. Click "Add Payment Methods" to
                     create one.
                  </div>
               )}
            </TabsContent>

            {/* Copyright Items */}
            <TabsContent value="copyright" className="space-y-4">
               {filteredItems.length > 0 ? (
                  <div className="space-y-4">
                     {filteredItems.map((item) => (
                        <div key={item.id} className="rounded-lg bg-muted p-3">
                           <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-3">
                                 <Copyright className="h-4 w-4" />
                                 <div className="flex-1">
                                    <div className="font-medium">
                                       {item.title}
                                    </div>
                                 </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                 <Button
                                    variant="secondary"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => openEditForm(item)}
                                 >
                                    <Edit className="h-3 w-3" />
                                 </Button>
                                 <Label htmlFor="active" className="mb-0">
                                    Active
                                 </Label>
                                 <Switch
                                    id="active"
                                    checked={item.active}
                                    onCheckedChange={(checked) => {
                                       router.put(footerItems.update(item.id), {
                                          ...(item as any),
                                          active: checked,
                                       });
                                    }}
                                 />
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               ) : (
                  <div className="py-8 text-center text-muted-foreground">
                     No copyright text found. Click "Add Copyright" to create
                     one.
                  </div>
               )}
            </TabsContent>
         </Tabs>

         {/* Create/Edit Form Dialog */}
         <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
               <DialogHeader>
                  <DialogTitle>
                     {editingItem ? 'Edit' : 'Create'}{' '}
                     {data.type.charAt(0).toUpperCase() +
                        data.type.slice(1).replace('_', ' ')}{' '}
                     Item
                  </DialogTitle>
                  <DialogDescription>
                     {editingItem
                        ? 'Update the details of this footer item.'
                        : 'Add a new footer item to your footer.'}
                  </DialogDescription>
               </DialogHeader>

               <Form
                  key={formKey}
                  {...(editingItem
                     ? footerItems.update.form(Number(editingItem.id))
                     : footerItems.store.form(Number(footer.id)))}
                  transform={(formData) => ({
                     ...formData,
                     items: data.items,
                     active: data.active,
                  })}
                  options={{ preserveScroll: true }}
                  className="space-y-4"
                  onSuccess={() => {
                     setIsFormOpen(false);
                  }}
               >
                  {({ processing }) => (
                     <>
                        <input type="hidden" name="type" value={data.type} />
                        <input
                           type="hidden"
                           name="sort"
                           value={String(data.sort)}
                        />

                        <div>
                           <Label>Status</Label>
                           <Select
                              value={data.active ? '1' : '0'}
                              onValueChange={(value) =>
                                 setData('active', value === '1')
                              }
                           >
                              <SelectTrigger>
                                 <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="1">Active</SelectItem>
                                 <SelectItem value="0">Inactive</SelectItem>
                              </SelectContent>
                           </Select>
                        </div>

                        <div>
                           <Label htmlFor="title">Title</Label>
                           <Input
                              id="title"
                              name="title"
                              defaultValue={editingItem?.title ?? ''}
                              placeholder="Enter title"
                              required
                           />
                        </div>

                        <div>
                           <Label htmlFor="slug">Slug</Label>
                           <Input
                              id="slug"
                              name="slug"
                              defaultValue={editingItem?.slug ?? ''}
                              placeholder="Enter unique slug"
                              required
                           />
                        </div>

                        {/* List Items */}
                        {data.type === 'list' && (
                           <div>
                              <div className="mb-2 flex items-center justify-between">
                                 <Label>List Items</Label>
                                 <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={addListItem}
                                 >
                                    <Plus className="mr-1 h-3 w-3" />
                                    Add Item
                                 </Button>
                              </div>
                              <div className="max-h-48 space-y-2 overflow-y-auto">
                                 {data.items.map((item, index) => (
                                    <div
                                       key={index}
                                       className="flex items-center gap-2 rounded border p-2"
                                    >
                                       <Input
                                          value={item.title || ''}
                                          onChange={(e) =>
                                             updateListItem(
                                                index,
                                                'title',
                                                e.target.value,
                                             )
                                          }
                                          placeholder="Title"
                                          className="flex-1"
                                       />
                                       <Input
                                          value={item.url || ''}
                                          onChange={(e) =>
                                             updateListItem(
                                                index,
                                                'url',
                                                e.target.value,
                                             )
                                          }
                                          placeholder="URL (optional)"
                                          className="flex-1"
                                       />
                                       <Button
                                          type="button"
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => removeListItem(index)}
                                       >
                                          <X className="h-3 w-3" />
                                       </Button>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        )}

                        {/* Social Media Items */}
                        {data.type === 'social_media' && (
                           <div>
                              <div className="mb-2 flex items-center justify-between">
                                 <Label>Social Media Links</Label>
                                 <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={addSocialMediaItem}
                                 >
                                    <Plus className="mr-1 h-3 w-3" />
                                    Add Social Link
                                 </Button>
                              </div>
                              <div className="max-h-48 space-y-2 overflow-y-auto">
                                 {data.items.map((item, index) => (
                                    <div
                                       key={index}
                                       className="flex items-center gap-2 rounded border p-2"
                                    >
                                       <Input
                                          value={item.title || ''}
                                          onChange={(e) =>
                                             updateSocialMediaItem(
                                                index,
                                                'title',
                                                e.target.value,
                                             )
                                          }
                                          placeholder="Platform name"
                                          className="flex-1"
                                       />
                                       <Input
                                          value={item.url || ''}
                                          onChange={(e) =>
                                             updateSocialMediaItem(
                                                index,
                                                'url',
                                                e.target.value,
                                             )
                                          }
                                          placeholder="Profile URL"
                                          className="flex-1"
                                       />
                                       <Select
                                          value={item.icon || 'facebook'}
                                          onValueChange={(value) =>
                                             updateSocialMediaItem(
                                                index,
                                                'icon',
                                                value,
                                             )
                                          }
                                       >
                                          <SelectTrigger className="w-32">
                                             <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                             {socialMediaIcons.map((icon) => (
                                                <SelectItem
                                                   key={icon.value}
                                                   value={icon.value}
                                                >
                                                   <div className="flex items-center gap-2">
                                                      {icon.icon}
                                                      {icon.label}
                                                   </div>
                                                </SelectItem>
                                             ))}
                                          </SelectContent>
                                       </Select>
                                       <Button
                                          type="button"
                                          variant="ghost"
                                          size="sm"
                                          onClick={() =>
                                             removeDynamicItem(index)
                                          }
                                       >
                                          <X className="h-3 w-3" />
                                       </Button>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        )}

                        {/* Payment Method Items */}
                        {data.type === 'payment_methods' && (
                           <div>
                              <div className="mb-2 flex items-center justify-between">
                                 <Label>Payment Method Images</Label>
                                 <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={addPaymentMethodItem}
                                 >
                                    <Plus className="mr-1 h-3 w-3" />
                                    Add Payment Method
                                 </Button>
                              </div>
                              <div className="max-h-48 space-y-2 overflow-y-auto">
                                 {data.items.map((item, index) => (
                                    <div
                                       key={index}
                                       className="flex items-center gap-2 rounded border p-2"
                                    >
                                       <Input
                                          value={item.image || ''}
                                          onChange={(e) =>
                                             updatePaymentMethodItem(
                                                index,
                                                e.target.value,
                                             )
                                          }
                                          placeholder="Image URL or path"
                                          className="flex-1"
                                       />
                                       <Button
                                          type="button"
                                          variant="ghost"
                                          size="sm"
                                          onClick={() =>
                                             removeDynamicItem(index)
                                          }
                                       >
                                          <X className="h-3 w-3" />
                                       </Button>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        )}

                        {/* Copyright doesn't need items */}

                        <DialogFooter>
                           <Button
                              type="button"
                              variant="outline"
                              onClick={() => setIsFormOpen(false)}
                           >
                              Cancel
                           </Button>
                           <Button type="submit" disabled={processing}>
                              {processing
                                 ? 'Saving...'
                                 : editingItem
                                   ? 'Update'
                                   : 'Create'}
                           </Button>
                        </DialogFooter>
                     </>
                  )}
               </Form>
            </DialogContent>
         </Dialog>
      </div>
   );
};

export default FooterEditor;
