import { Form, useForm, router } from '@inertiajs/react';
import {
   ArrowUpDown,
   ChevronDown,
   Edit,
   ExternalLink,
   Plus,
   Settings,
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
import {
   destroy as navbarItemDestroy,
   reorder as navbarItemReorder,
   store as navbarItemStore,
   update as navbarItemUpdate,
} from '@/routes/navbar/items';

interface NavbarItemFormState {
   type: string;
   items: { title: string; url: string }[];
   sort: number;
   active: boolean;
   /** Used when `type === 'action'` (Radix Select does not reliably submit `name`). */
   actionSlug: string;
}

const NavbarEditor = ({ navbar }: { navbar: Navbar }) => {
   const navbarItems = navbar.navbar_items;
   const [activeType, setActiveType] = useState<string>('url');
   const [editingItem, setEditingItem] = useState<NavbarItem | null>(null);
   const [isFormOpen, setIsFormOpen] = useState(false);
   const [formKey, setFormKey] = useState(0);

   const { data, setData } = useForm<NavbarItemFormState>({
      type: 'url',
      items: [],
      sort: 0,
      active: true,
      actionSlug: 'theme',
   });

   // Filter items by type
   const filteredItems = navbarItems.filter((item) => item.type === activeType);

   const openCreateForm = (type: string) => {
      setEditingItem(null);
      setFormKey((k) => k + 1);
      setData({
         type,
         items: [],
         sort: Math.max(...navbarItems.map((item) => item.sort), 0) + 1,
         active: true,
         actionSlug: 'theme',
      });
      setIsFormOpen(true);
   };

   const openEditForm = (item: NavbarItem) => {
      setEditingItem(item);
      setFormKey((k) => k + 1);
      setData({
         type: item.type,
         items: Array.isArray(item.items)
            ? item.items.map((subItem: any) => ({
                 title: subItem.title || '',
                 url: subItem.url || '',
              }))
            : [],
         sort: item.sort,
         active: item.active,
         actionSlug: item.type === 'action' && item.slug ? item.slug : 'theme',
      });
      setIsFormOpen(true);
   };

   const addDropdownItem = () => {
      setData('items', [...data.items, { title: '', url: '' }]);
   };

   const updateDropdownItem = (
      index: number,
      field: 'title' | 'url',
      value: string,
   ) => {
      const updatedItems = [...data.items];
      updatedItems[index] = { ...updatedItems[index], [field]: value };
      setData('items', updatedItems);
   };

   const removeDropdownItem = (index: number) => {
      setData(
         'items',
         data.items.filter((_: any, i: number) => i !== index),
      );
   };

   return (
      <div className="p-4 sm:p-6">
         {/* Type Tabs */}
         <Tabs value={activeType} onValueChange={setActiveType}>
            <div className="mb-6 flex flex-col justify-between gap-6 md:flex-row md:items-center">
               <TabsList className="grid h-auto grid-cols-2 sm:h-10 sm:grid-cols-4">
                  <TabsTrigger
                     value="url"
                     className="flex h-8 cursor-pointer items-center gap-2"
                  >
                     <ExternalLink className="h-4 w-4" />
                     URL Items (
                     {navbarItems.filter((item) => item.type === 'url').length})
                  </TabsTrigger>
                  <TabsTrigger
                     value="dropdown"
                     className="flex h-8 cursor-pointer items-center gap-2"
                  >
                     <ChevronDown className="h-4 w-4" />
                     Dropdowns (
                     {
                        navbarItems.filter((item) => item.type === 'dropdown')
                           .length
                     }
                     )
                  </TabsTrigger>
                  <TabsTrigger
                     value="action"
                     className="flex h-8 cursor-pointer items-center gap-2"
                  >
                     <Settings className="h-4 w-4" />
                     Actions (
                     {
                        navbarItems.filter((item) => item.type === 'action')
                           .length
                     }
                     )
                  </TabsTrigger>
               </TabsList>

               <div className="flex items-center gap-2">
                  <DataSortModal
                     title="Navbar Items"
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
                           navbarItemReorder(),
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
                                    router.put(navbarItemUpdate(item.id), {
                                       ...(item as any),
                                       active: checked,
                                    });
                                 }}
                              />
                           </div>
                        </Card>
                     )}
                  />

                  {activeType !== 'action' && (
                     <Button
                        onClick={() => openCreateForm(activeType)}
                        className="flex items-center gap-2"
                     >
                        <Plus className="h-4 w-4" />
                        Add <span className="capitalize">{activeType}</span>
                     </Button>
                  )}
               </div>
            </div>

            {/* URL Items */}
            <TabsContent value="url" className="space-y-4">
               {filteredItems.length > 0 ? (
                  <div className="space-y-4">
                     {filteredItems.map((item) => (
                        <div
                           key={item.id}
                           className="flex items-center gap-3 rounded-lg bg-muted p-3"
                        >
                           <ExternalLink className="h-4 w-4" />

                           <div className="flex-1">
                              <div className="font-medium">{item.title}</div>
                              <div className="text-sm text-gray-600">
                                 {item.value}
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
                                 routePath={navbarItemDestroy.url(
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
                     ))}
                  </div>
               ) : (
                  <div className="py-8 text-center text-gray-500">
                     No URL items found. Click "Add URL Item" to create one.
                  </div>
               )}
            </TabsContent>

            {/* Dropdown Items */}
            <TabsContent value="dropdown" className="space-y-4">
               {filteredItems.length > 0 ? (
                  <div className="space-y-4">
                     {filteredItems.map((item) => (
                        <div key={item.id} className="rounded-lg bg-muted p-3">
                           <div className="flex items-center gap-3">
                              <ChevronDown className="h-4 w-4" />

                              <div className="flex-1">
                                 <div className="font-medium">{item.title}</div>
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
                                    routePath={navbarItemDestroy.url(
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
                              <div className="ml-8 space-y-1">
                                 {(item.items as any[]).map(
                                    (subItem: any, idx: number) => (
                                       <div
                                          key={idx}
                                          className="flex items-center gap-2 text-sm text-gray-600"
                                       >
                                          <span>•</span>
                                          <span>{subItem.title}</span>
                                          <span className="text-gray-400">
                                             ({subItem.url})
                                          </span>
                                       </div>
                                    ),
                                 )}
                              </div>
                           )}
                        </div>
                     ))}
                  </div>
               ) : (
                  <div className="py-8 text-center text-gray-500">
                     No dropdown items found. Click "Add Dropdown" to create
                     one.
                  </div>
               )}
            </TabsContent>

            {/* Action Items */}
            <TabsContent value="action" className="space-y-4">
               {filteredItems.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                     {filteredItems.map((item) => (
                        <div
                           key={item.id}
                           className="flex items-center justify-between gap-3 rounded-lg border bg-muted p-3"
                        >
                           <div className="flex items-center gap-3">
                              <Settings className="h-4 w-4" />

                              <p className="text-sm font-medium">
                                 {item.title}
                              </p>
                           </div>

                           <div className="flex items-center space-x-2">
                              <Label htmlFor="airplane-mode" className="mb-0">
                                 Active
                              </Label>
                              <Switch
                                 id="airplane-mode"
                                 checked={item.active}
                                 onCheckedChange={(checked) => {
                                    router.put(navbarItemUpdate(item.id), {
                                       ...(item as any),
                                       active: checked,
                                    });
                                 }}
                              />
                           </div>
                        </div>
                     ))}
                  </div>
               ) : (
                  <div className="py-8 text-center text-gray-500">
                     No action items found. Click "Add Action Item" to create
                     one.
                  </div>
               )}
            </TabsContent>
         </Tabs>

         {/* Create/Edit Form Dialog */}
         <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogContent className="max-w-2xl">
               <DialogHeader>
                  <DialogTitle>
                     {editingItem ? 'Edit' : 'Create'}{' '}
                     {data.type.charAt(0).toUpperCase() + data.type.slice(1)}{' '}
                     Item
                  </DialogTitle>
                  <DialogDescription>
                     {editingItem
                        ? 'Update the details of this navbar item.'
                        : 'Add a new navbar item to your navigation.'}
                  </DialogDescription>
               </DialogHeader>

               <Form
                  key={formKey}
                  {...(editingItem
                     ? navbarItemUpdate.form(Number(editingItem.id))
                     : navbarItemStore.form(Number(navbar.id)))}
                  transform={(formData) => ({
                     ...formData,
                     items: data.items,
                     active: data.active,
                     ...(data.type === 'action'
                        ? { slug: data.actionSlug }
                        : {}),
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
                        {(data.type === 'url' || data.type === 'dropdown') && (
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
                        )}

                        {data.type === 'url' && (
                           <div>
                              <Label htmlFor="value">URL</Label>
                              <Input
                                 id="value"
                                 name="value"
                                 defaultValue={editingItem?.value ?? ''}
                                 placeholder="Enter URL (e.g., /courses, https://example.com)"
                                 required
                              />
                           </div>
                        )}

                        {data.type === 'dropdown' && (
                           <div>
                              <div className="mb-2 flex items-center justify-between">
                                 <Label>Dropdown Items</Label>
                                 <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={addDropdownItem}
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
                                          value={item.title}
                                          onChange={(e) =>
                                             updateDropdownItem(
                                                index,
                                                'title',
                                                e.target.value,
                                             )
                                          }
                                          placeholder="Title"
                                          className="flex-1"
                                       />
                                       <Input
                                          value={item.url}
                                          onChange={(e) =>
                                             updateDropdownItem(
                                                index,
                                                'url',
                                                e.target.value,
                                             )
                                          }
                                          placeholder="URL"
                                          className="flex-1"
                                       />
                                       <Button
                                          type="button"
                                          variant="ghost"
                                          size="sm"
                                          onClick={() =>
                                             removeDropdownItem(index)
                                          }
                                       >
                                          <X className="h-3 w-3" />
                                       </Button>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        )}

                        {data.type === 'action' && (
                           <div>
                              <Label htmlFor="action-type">Action Type</Label>
                              <Select
                                 value={data.actionSlug}
                                 onValueChange={(value) =>
                                    setData('actionSlug', value)
                                 }
                              >
                                 <SelectTrigger id="action-type">
                                    <SelectValue placeholder="Select action type" />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem value="theme">
                                       Theme Toggle
                                    </SelectItem>
                                    <SelectItem value="search">
                                       Search
                                    </SelectItem>
                                    <SelectItem value="notification">
                                       Notifications
                                    </SelectItem>
                                    <SelectItem value="profile">
                                       User Profile
                                    </SelectItem>
                                 </SelectContent>
                              </Select>
                           </div>
                        )}

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

export default NavbarEditor;
