import { router, usePage } from '@inertiajs/react';
import {
   ALargeSmall,
   AlignEndVertical,
   AlignStartVertical,
   Palette,
   Settings,
} from 'lucide-react';
import { useState } from 'react';
import AppearanceToggleTab from '@/components/appearance-tabs';
import { Button } from '@/components/ui/button';
import {
   Sheet,
   SheetContent,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from '@/components/ui/sheet';
import { useAppearance } from '@/hooks/use-appearance';
import setGlobalColorTheme, { getThemeColorConfig } from '@/lib/theme-colors';
import { cn } from '@/lib/utils';
import change from '@/routes/change';
import { update as projectsUpdate } from '@/routes/projects';

const THEME_COLORS: { label: string; value: ThemeColors; hsl: string }[] = [
   { label: 'Zinc', value: 'Zinc', hsl: '#18181b' },
   { label: 'Rose', value: 'Rose', hsl: '#e11d48' },
   { label: 'Blue', value: 'Blue', hsl: '#3b82f6' },
   { label: 'Green', value: 'Green', hsl: '#16a34a' },
   { label: 'Orange', value: 'Orange', hsl: '#f97316' },
];

const FONT_FAMILIES: { label: string; value: string; font: string }[] = [
   { label: 'Inter', value: 'inter', font: 'Inter, sans-serif' },
   { label: 'Roboto', value: 'roboto', font: 'Roboto, sans-serif' },
   { label: 'Poppins', value: 'poppins', font: 'Poppins, sans-serif' },
   { label: 'Nunito', value: 'nunito', font: 'Nunito, sans-serif' },
   { label: 'Outfit', value: 'outfit', font: 'Outfit, sans-serif' },
];

export function SettingsDrawer() {
   const page = usePage<SharedData>();
   const { appearance } = useAppearance();
   const [open, setOpen] = useState(false);

   const currentColor =
      (page.props.frontend?.theme_color as ThemeColors) ?? 'Blue';

   const direction = page.props.direction;
   const currentFont = page.props.system?.fields?.font_family ?? 'inter';
   const systemDirection = page.props.system?.fields?.direction ?? 'none';

   const handleColorChange = (color: ThemeColors) => {
      setGlobalColorTheme(appearance, color);

      if (page.props.frontend) {
         router.post(
            projectsUpdate(page.props.frontend.id).url,
            {
               name: page.props.frontend.name,
               title: page.props.frontend.title,
               theme_color: color,
               theme_config: getThemeColorConfig(color),
            },
            {
               preserveState: true,
               preserveScroll: true,
            },
         );
      }
   };

   const handleDirectionChange = () => {
      router.post(
         change.direction().url,
         { direction: direction === 'ltr' ? 'rtl' : 'ltr' },
         { preserveScroll: true },
      );
   };

   const handleFontChange = (font: string) => {
      router.post(
         change.fontFamily().url,
         { font_family: font },
         { preserveScroll: true },
      );
   };

   return (
      <Sheet open={open} onOpenChange={setOpen}>
         <SheetTrigger asChild>
            <Button
               size="icon"
               variant="ghost"
               className="h-10 w-10 rounded-full bg-transparent"
               title="Settings"
            >
               <Settings className="!h-5 !w-5" />
               <span className="sr-only">Settings</span>
            </Button>
         </SheetTrigger>

         <SheetContent
            className="w-80 p-0 sm:max-w-80"
            side={page.props.direction === 'rtl' ? 'left' : 'right'}
         >
            <SheetHeader className="border-b px-5 py-4">
               <SheetTitle className="flex items-center gap-2 text-base font-semibold">
                  <Palette className="h-4 w-4 text-primary" />
                  Settings
               </SheetTitle>
            </SheetHeader>

            <div className="space-y-6 overflow-y-auto px-5 py-5">
               {/* Appearance Mode */}
               <div className="space-y-3">
                  <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                     Appearance
                  </p>
                  <AppearanceToggleTab className="w-full justify-between" />
               </div>

               {/* Color Presets */}
               <div className="space-y-3">
                  <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                     Color Preset
                  </p>
                  <div className="grid grid-cols-5 gap-2">
                     {THEME_COLORS.map(({ label, value, hsl }) => (
                        <button
                           key={value}
                           title={label}
                           onClick={() => handleColorChange(value)}
                           className={cn(
                              'group relative flex h-10 w-full flex-col items-center justify-center gap-1 rounded-lg border-2 transition-all duration-150 hover:scale-105',
                              currentColor === value
                                 ? 'border-primary shadow-md'
                                 : 'border-transparent hover:border-border',
                           )}
                        >
                           <span
                              className="h-5 w-5 rounded-full shadow-sm"
                              style={{ backgroundColor: hsl }}
                           />
                           {currentColor === value && (
                              <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-primary-foreground">
                                 ✓
                              </span>
                           )}
                        </button>
                     ))}
                  </div>
                  <div className="flex justify-between px-0.5">
                     {THEME_COLORS.map(({ label, value }) => (
                        <span
                           key={value}
                           className={cn(
                              'w-full text-center text-[10px]',
                              currentColor === value
                                 ? 'font-medium text-foreground'
                                 : 'text-muted-foreground',
                           )}
                        >
                           {label}
                        </span>
                     ))}
                  </div>
               </div>

               {/* Font Family */}
               <div className="space-y-3">
                  <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                     Font Family
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                     {FONT_FAMILIES.map(({ label, value, font }) => (
                        <Button
                           key={value}
                           variant="outline"
                           onClick={() => handleFontChange(value)}
                           className={cn(
                              'justify-between',
                              currentFont === value
                                 ? 'border-primary bg-secondary text-secondary-foreground'
                                 : 'border-border hover:border-primary/40 hover:bg-muted',
                           )}
                        >
                           <div className="flex items-center gap-2">
                              <ALargeSmall className="h-4 w-4" />
                              <span style={{ fontFamily: font }}>{label}</span>
                           </div>
                           {currentFont === value && (
                              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-primary-foreground">
                                 ✓
                              </span>
                           )}
                        </Button>
                     ))}
                  </div>
               </div>

               {/* RTL Direction — only shown when system direction is "none" (user-selectable) */}
               {systemDirection === 'none' && (
                  <div className="space-y-3">
                     <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                        Layout Direction
                     </p>
                     <Button
                        variant="outline"
                        onClick={handleDirectionChange}
                        className="w-full justify-between gap-3 border-border hover:border-primary/40"
                     >
                        <div className="flex items-center gap-2">
                           {direction === 'ltr' ? (
                              <AlignEndVertical className="h-4 w-4" />
                           ) : (
                              <AlignStartVertical className="h-4 w-4" />
                           )}
                           <span>
                              {direction === 'ltr'
                                 ? 'Left to Right'
                                 : 'Right to Left'}
                           </span>
                        </div>

                        <div className="flex gap-0.5">
                           {/* LTR icon */}
                           <div
                              className={cn(
                                 'flex h-6 w-8 items-center justify-center rounded-sm px-1',
                                 direction === 'ltr'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted text-muted-foreground',
                              )}
                           >
                              <span className="text-[9px] font-bold">LTR</span>
                           </div>
                           <div
                              className={cn(
                                 'flex h-6 w-8 items-center justify-center rounded-sm px-1',
                                 direction === 'rtl'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted text-muted-foreground',
                              )}
                           >
                              <span className="text-[9px] font-bold">RTL</span>
                           </div>
                        </div>
                     </Button>
                  </div>
               )}
            </div>
         </SheetContent>
      </Sheet>
   );
}
