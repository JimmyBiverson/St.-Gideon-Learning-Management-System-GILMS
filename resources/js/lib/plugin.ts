export function pluginEnabled(
   pluginStatuses: Record<string, boolean> | undefined,
   name: string,
): boolean | null {
   if (!pluginStatuses || !(name in pluginStatuses)) {
      return null;
   }

   return pluginStatuses[name];
}

export function pluginActive(
   pluginStatuses: Record<string, boolean> | undefined,
   name: string,
): boolean {
   return pluginEnabled(pluginStatuses, name) === true;
}
