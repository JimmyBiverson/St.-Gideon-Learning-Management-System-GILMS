import setGlobalColorTheme, { getThemeColorConfig } from '@/lib/theme-colors';
import { cn } from '@/lib/utils';
import { update as projectsUpdate } from '@/routes/projects';
import { router } from '@inertiajs/react';

interface Props {
   project: Project;
}

const ThemeConfig = ({ project }: Props) => {
   const onThemeSubmitHandler = (name: ThemeColors) => {
      router.post(
         projectsUpdate(project.id),
         {
            name: project.name,
            title: project.title,
            theme_color: name,
            theme_config: getThemeColorConfig(name),
         },
         {
            onSuccess: (res: any) => {
               const { frontend, appearance } = res.props;

               setGlobalColorTheme(
                  appearance,
                  frontend?.theme_color as ThemeColors,
               );
            },
         },
      );
   };

   return (
      <div className="flex flex-wrap items-center gap-3">
         {availableThemeColors.map(({ name, light }) => (
            <button
               key={name}
               type="button"
               onClick={() => onThemeSubmitHandler(name)}
               className={cn(
                  'h-8 w-8 cursor-pointer rounded-full transition-all',
                  light,
                  project.theme_color === name &&
                     'ring-2 ring-blue-500 ring-offset-2 outline-1 outline-background',
               )}
               aria-label={`Select ${name} theme`}
            ></button>
         ))}
      </div>
   );
};

const availableThemeColors: {
   name: ThemeColors;
   light: string;
   dark: string;
}[] = [
   { name: 'Zinc', light: 'bg-zinc-900', dark: 'bg-zinc-700' },
   { name: 'Rose', light: 'bg-rose-600', dark: 'bg-rose-700' },
   { name: 'Blue', light: 'bg-blue-600', dark: 'bg-blue-700' },
   { name: 'Green', light: 'bg-green-600', dark: 'bg-green-500' },
   { name: 'Orange', light: 'bg-orange-500', dark: 'bg-orange-700' },
];

export default ThemeConfig;
