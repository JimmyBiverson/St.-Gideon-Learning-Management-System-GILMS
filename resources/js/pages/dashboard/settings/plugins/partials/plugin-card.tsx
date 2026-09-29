import { router } from '@inertiajs/react';
import { Database } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import WarningModal from '@/components/warning-modal';
import { toggle, seeder } from '@/routes/plugins';

const PluginCard = ({ plugin }: { plugin: PluginRow }) => {
   const actionsDisabled = !plugin.is_enabled;

   const onToggle = (plugin: PluginRow, enabled: boolean) => {
      router.put(toggle.url({ module: plugin.name }), { enabled });
   };

   return (
      <Card className="p-4 md:p-6">
         <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 space-y-1">
               <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base font-semibold">{plugin.name}</h2>
                  {plugin.is_enabled ? (
                     <Badge variant="default">Enabled</Badge>
                  ) : (
                     <Badge variant="outline">Disabled</Badge>
                  )}
               </div>
               {plugin.description && (
                  <p className="text-sm text-muted-foreground">
                     {plugin.description}
                  </p>
               )}
               {plugin.version && (
                  <p className="text-xs text-muted-foreground">
                     Version {plugin.version}
                  </p>
               )}
            </div>

            {plugin.can_toggle && (
               <div className="flex shrink-0 items-center gap-2">
                  <Label
                     htmlFor={`toggle-${plugin.name}`}
                     className="sr-only mb-0"
                  >
                     {plugin.is_enabled ? 'Enabled' : 'Disabled'}
                  </Label>
                  <Switch
                     id={`toggle-${plugin.name}`}
                     checked={plugin.is_enabled}
                     onCheckedChange={(checked) => onToggle(plugin, checked)}
                  />
               </div>
            )}
         </div>

         {plugin.needs_setup && plugin.has_seeder && (
            <>
               <Separator className="my-4" />

               <div className="flex flex-col gap-2 sm:flex-row">
                  <WarningModal
                     method="post"
                     routePath={seeder.url({ module: plugin.name })}
                     title={`Run migration and seeder for ${plugin.name}?`}
                     actionComponent={
                        <Button
                           type="button"
                           variant="ghost"
                           className="w-full bg-destructive/8 text-destructive hover:bg-destructive/6 hover:text-destructive"
                           disabled={actionsDisabled}
                        >
                           <Database className="h-4 w-4" />
                           <span>Run Migration and Seeder</span>
                        </Button>
                     }
                  >
                     <div className="space-y-2">
                        <p>
                           This will run the database migration and seeder for
                           the <strong>{plugin.name}</strong> plugin.
                        </p>

                        <div className="rounded-md bg-yellow-50 p-3 text-sm text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300">
                           <p className="font-medium">Important Notes:</p>
                           <ul className="mt-1 list-inside list-disc space-y-2">
                              <li>
                                 Run this only once after installing or updating
                                 the plugin
                              </li>

                              <li>
                                 Running the seeder multiple times may overwrite
                                 existing data
                              </li>
                           </ul>
                        </div>
                     </div>
                  </WarningModal>
               </div>
            </>
         )}

         {plugin.needs_setup && !plugin.has_seeder && (
            <p className="mt-2 text-xs text-muted-foreground">
               No database seeder found for this plugin.
            </p>
         )}
      </Card>
   );
};

export default PluginCard;
