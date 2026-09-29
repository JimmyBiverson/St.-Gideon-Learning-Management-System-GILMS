interface PluginRow {
   name: string;
   alias: string;
   description: string;
   version: string | null;
   is_enabled: boolean;
   is_uploaded: boolean;
   can_toggle: boolean;
   has_seeder: boolean;
   needs_setup: boolean;
   seeder_class: string;
   installed_at: string | null;
}

interface PluginsPageProps extends SharedData {
   plugins: PluginRow[];
}
