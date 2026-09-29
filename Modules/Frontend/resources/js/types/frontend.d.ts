type Device = 'mobile' | 'tablet' | 'desktop';
type ThemeMode = 'visitor' | 'thief';
type ThemeColors = 'Zinc' | 'Rose' | 'Blue' | 'Green' | 'Orange';
type Themes = 'light' | 'dark' | 'system';

interface Collection<T> extends TableCommon {
   success: boolean;
   message?: string;
   collection: T[];
   ids: any[];
}

interface SingleCollection<T> extends TableCommon {
   success: boolean;
   message?: string;
   collection: T;
   ids: any[];
}

interface Project extends TableCommon {
   type: string;
   name: string;
   url: string | null;
   title: string | null;
   description: string | null;
   user_id: string | number;
   theme_color: ThemeColors;
   theme_config: string;
   subdomain: string | null;
   pages: ProjectPage[];
   favicon: string | null;
   metadata: any;
   media?: Array<{
      id: number;
      file_name: string;
      original_url: string;
      size: number;
      mime_type: string;
   }>;
}

interface ProjectPage extends TableCommon {
   name: string;
   title: string;
   slug: string;
   url: string;
   type: string;
   status: boolean;
   project_id: string;
   project: Project;
   description: string | null;
   content: string;
   banner: string | null;
   metadata: any;
}
