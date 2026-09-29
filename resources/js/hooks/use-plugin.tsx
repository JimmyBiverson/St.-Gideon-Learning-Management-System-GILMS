import { usePage } from '@inertiajs/react';
import { pluginEnabled } from '@/lib/plugin';

export function usePlugin(plugin: string) {
   const { props } = usePage<SharedData>();
   const { pluginStatuses } = props;

   return pluginEnabled(pluginStatuses, plugin);
}
