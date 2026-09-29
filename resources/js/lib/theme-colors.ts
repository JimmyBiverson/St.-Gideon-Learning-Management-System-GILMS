type Theme = {
   // background: string;
   // foreground: string;
   // card: string;
   // cardForeground: string;
   // popover: string;
   // popoverForeground: string;
   primary: string;
   primaryForeground: string;
   // secondary: string;
   // secondaryForeground: string;
   // muted: string;
   // mutedLight: string;
   // mutedForeground: string;
   // accent: string;
   // accentForeground: string;
   // destructive: string;
   // destructiveForeground: string;
   // border: string;
   // input: string;
   // ring: string;
   // chart1: string;
   // chart2: string;
   // chart3: string;
   // chart4: string;
   // chart5: string;
   // sidebar: string;
   // sidebarForeground: string;
   // sidebarPrimary: string;
   // sidebarPrimaryForeground: string;
   // sidebarAccent: string;
   // sidebarAccentForeground: string;
   // sidebarBorder: string;
   // sidebarRing: string;
};

type ThemeMode = {
   light: Theme;
   dark: Theme;
};

type Themes = {
   Zinc: ThemeMode;
   Rose: ThemeMode;
   Blue: ThemeMode;
   Green: ThemeMode;
   Orange: ThemeMode;
};

// secondary = 10% opacity tinted version of the primary hue
// secondaryForeground = solid version of the primary-hue accent color
// This mirrors app.css: --secondary: oklch(... / 10.2%) + --secondary-foreground: oklch(solid)
// so that color-mix tints (--secondary-600 etc.) render correctly after JS hydration.

const themes: Themes = {
   Orange: {
      light: {
         // background: '0 0% 100%',
         // foreground: '20 14.3% 4.1%',
         // card: '0 0% 100%',
         // cardForeground: '20 14.3% 4.1%',
         // popover: '0 0% 100%',
         // popoverForeground: '20 14.3% 4.1%',
         primary: '24.6 95% 53.1%',
         primaryForeground: '60 9.1% 97.8%',
         // secondary: '24.6 95% 53.1% / 10%',
         // secondaryForeground: '24.6 95% 43%',
         // muted: '60 4.8% 95.9%',
         // mutedLight: '60 4.8% 97.5%',
         // mutedForeground: '25 5.3% 44.7%',
         // accent: '60 4.8% 95.9%',
         // accentForeground: '24 9.8% 10%',
         // destructive: '0 84.2% 60.2%',
         // destructiveForeground: '60 9.1% 97.8%',
         // border: '20 5.9% 90%',
         // input: '20 5.9% 90%',
         // ring: '24.6 95% 53.1%',
         // chart1: '12 76% 61%',
         // chart2: '173 58% 39%',
         // chart3: '197 37% 24%',
         // chart4: '43 74% 66%',
         // chart5: '27 87% 67%',
         // sidebar: '0 0% 98%',
         // sidebarForeground: '240 5.3% 26.1%',
         // sidebarPrimary: '24.6 95% 53.1%',
         // sidebarPrimaryForeground: '0 0% 98%',
         // sidebarAccent: '60 4.8% 95.9%',
         // sidebarAccentForeground: '24 9.8% 10%',
         // sidebarBorder: '220 13% 91%',
         // sidebarRing: '24.6 95% 53.1%',
      },
      dark: {
         // background: '20 14.3% 4.1%',
         // foreground: '60 9.1% 97.8%',
         // card: '20 14.3% 4.1%',
         // cardForeground: '60 9.1% 97.8%',
         // popover: '20 14.3% 4.1%',
         // popoverForeground: '60 9.1% 97.8%',
         primary: '20.5 90.2% 48.2%',
         primaryForeground: '60 9.1% 97.8%',
         // secondary: '20.5 90.2% 48.2% / 10%',
         // secondaryForeground: '20.5 90.2% 55%',
         // muted: '12 6.5% 15.1%',
         // mutedLight: '12 6.5% 18%',
         // mutedForeground: '24 5.4% 63.9%',
         // accent: '12 6.5% 15.1%',
         // accentForeground: '60 9.1% 97.8%',
         // destructive: '0 72.2% 50.6%',
         // destructiveForeground: '60 9.1% 97.8%',
         // border: '12 6.5% 15.1%',
         // input: '12 6.5% 15.1%',
         // ring: '20.5 90.2% 48.2%',
         // chart1: '220 70% 50%',
         // chart2: '160 60% 45%',
         // chart3: '30 80% 55%',
         // chart4: '280 65% 60%',
         // chart5: '340 75% 55%',
         // sidebar: '20 14.3% 4.1%',
         // sidebarForeground: '60 9.1% 97.8%',
         // sidebarPrimary: '20.5 90.2% 48.2%',
         // sidebarPrimaryForeground: '60 9.1% 97.8%',
         // sidebarAccent: '12 6.5% 15.1%',
         // sidebarAccentForeground: '60 9.1% 97.8%',
         // sidebarBorder: '12 6.5% 15.1%',
         // sidebarRing: '20.5 90.2% 48.2%',
      },
   },
   Blue: {
      light: {
         // background: '0 0% 100%',
         // foreground: '222.2 84% 4.9%',
         // card: '0 0% 100%',
         // cardForeground: '222.2 84% 4.9%',
         // popover: '0 0% 100%',
         // popoverForeground: '222.2 84% 4.9%',
         primary: '221.2 83.2% 53.3%',
         primaryForeground: '210 40% 98%',
         // secondary: '221.2 83.2% 53.3% / 10%',
         // secondaryForeground: '221.2 83.2% 43%',
         // muted: '210 40% 96.1%',
         // mutedLight: '210 40% 98%',
         // mutedForeground: '215.4 16.3% 46.9%',
         // accent: '210 40% 96.1%',
         // accentForeground: '222.2 47.4% 11.2%',
         // destructive: '0 84.2% 60.2%',
         // destructiveForeground: '210 40% 98%',
         // border: '214.3 31.8% 91.4%',
         // input: '214.3 31.8% 91.4%',
         // ring: '221.2 83.2% 53.3%',
         // chart1: '12 76% 61%',
         // chart2: '173 58% 39%',
         // chart3: '197 37% 24%',
         // chart4: '43 74% 66%',
         // chart5: '27 87% 67%',
         // sidebar: '0 0% 98%',
         // sidebarForeground: '240 5.3% 26.1%',
         // sidebarPrimary: '221.2 83.2% 53.3%',
         // sidebarPrimaryForeground: '210 40% 98%',
         // sidebarAccent: '210 40% 96.1%',
         // sidebarAccentForeground: '222.2 47.4% 11.2%',
         // sidebarBorder: '220 13% 91%',
         // sidebarRing: '221.2 83.2% 53.3%',
      },
      dark: {
         // background: '222.2 84% 4.9%',
         // foreground: '210 40% 98%',
         // card: '222.2 84% 4.9%',
         // cardForeground: '210 40% 98%',
         // popover: '222.2 84% 4.9%',
         // popoverForeground: '210 40% 98%',
         primary: '217.2 91.2% 59.8%',
         primaryForeground: '222.2 47.4% 11.2%',
         // secondary: '217.2 91.2% 59.8% / 10%',
         // secondaryForeground: '217.2 91.2% 65%',
         // muted: '217.2 32.6% 17.5%',
         // mutedLight: '217.2 32.6% 20%',
         // mutedForeground: '215 20.2% 65.1%',
         // accent: '217.2 32.6% 17.5%',
         // accentForeground: '210 40% 98%',
         // destructive: '0 62.8% 30.6%',
         // destructiveForeground: '210 40% 98%',
         // border: '217.2 32.6% 17.5%',
         // input: '217.2 32.6% 17.5%',
         // ring: '224.3 76.3% 48%',
         // chart1: '220 70% 50%',
         // chart2: '160 60% 45%',
         // chart3: '30 80% 55%',
         // chart4: '280 65% 60%',
         // chart5: '340 75% 55%',
         // sidebar: '222.2 84% 4.9%',
         // sidebarForeground: '210 40% 98%',
         // sidebarPrimary: '217.2 91.2% 59.8%',
         // sidebarPrimaryForeground: '222.2 47.4% 11.2%',
         // sidebarAccent: '217.2 32.6% 17.5%',
         // sidebarAccentForeground: '210 40% 98%',
         // sidebarBorder: '217.2 32.6% 17.5%',
         // sidebarRing: '224.3 76.3% 48%',
      },
   },
   Green: {
      light: {
         // background: '0 0% 100%',
         // foreground: '240 10% 3.9%',
         // card: '0 0% 100%',
         // cardForeground: '240 10% 3.9%',
         // popover: '0 0% 100%',
         // popoverForeground: '240 10% 3.9%',
         primary: '142.1 76.2% 36.3%',
         primaryForeground: '355.7 100% 97.3%',
         // secondary: '142.1 76.2% 36.3% / 10%',
         // secondaryForeground: '142.1 76.2% 30%',
         // muted: '240 4.8% 95.9%',
         // mutedLight: '240 4.8% 97.5%',
         // mutedForeground: '240 3.8% 46.1%',
         // accent: '240 4.8% 95.9%',
         // accentForeground: '240 5.9% 10%',
         // destructive: '0 84.2% 60.2%',
         // destructiveForeground: '0 0% 98%',
         // border: '240 5.9% 90%',
         // input: '240 5.9% 90%',
         // ring: '142.1 76.2% 36.3%',
         // chart1: '12 76% 61%',
         // chart2: '173 58% 39%',
         // chart3: '197 37% 24%',
         // chart4: '43 74% 66%',
         // chart5: '27 87% 67%',
         // sidebar: '0 0% 98%',
         // sidebarForeground: '240 5.3% 26.1%',
         // sidebarPrimary: '142.1 76.2% 36.3%',
         // sidebarPrimaryForeground: '355.7 100% 97.3%',
         // sidebarAccent: '240 4.8% 95.9%',
         // sidebarAccentForeground: '240 5.9% 10%',
         // sidebarBorder: '220 13% 91%',
         // sidebarRing: '142.1 76.2% 36.3%',
      },
      dark: {
         // background: '20 14.3% 4.1%',
         // foreground: '0 0% 95%',
         // card: '24 9.8% 10%',
         // cardForeground: '0 0% 95%',
         // popover: '0 0% 9%',
         // popoverForeground: '0 0% 95%',
         primary: '142.1 70.6% 45.3%',
         primaryForeground: '144.9 80.4% 10%',
         // secondary: '142.1 70.6% 45.3% / 10%',
         // secondaryForeground: '142.1 70.6% 50%',
         // muted: '0 0% 15%',
         // mutedLight: '0 0% 18%',
         // mutedForeground: '240 5% 64.9%',
         // accent: '12 6.5% 15.1%',
         // accentForeground: '0 0% 98%',
         // destructive: '0 62.8% 30.6%',
         // destructiveForeground: '0 85.7% 97.3%',
         // border: '240 3.7% 15.9%',
         // input: '240 3.7% 15.9%',
         // ring: '142.4 71.8% 29.2%',
         // chart1: '220 70% 50%',
         // chart2: '160 60% 45%',
         // chart3: '30 80% 55%',
         // chart4: '280 65% 60%',
         // chart5: '340 75% 55%',
         // sidebar: '20 14.3% 4.1%',
         // sidebarForeground: '0 0% 95%',
         // sidebarPrimary: '142.1 70.6% 45.3%',
         // sidebarPrimaryForeground: '144.9 80.4% 10%',
         // sidebarAccent: '12 6.5% 15.1%',
         // sidebarAccentForeground: '0 0% 98%',
         // sidebarBorder: '240 3.7% 15.9%',
         // sidebarRing: '142.4 71.8% 29.2%',
      },
   },
   Rose: {
      light: {
         // background: '0 0% 100%',
         // foreground: '240 10% 3.9%',
         // card: '0 0% 100%',
         // cardForeground: '240 10% 3.9%',
         // popover: '0 0% 100%',
         // popoverForeground: '240 10% 3.9%',
         primary: '346.8 77.2% 49.8%',
         primaryForeground: '355.7 100% 97.3%',
         // secondary: '346.8 77.2% 49.8% / 10%',
         // secondaryForeground: '346.8 77.2% 40%',
         // muted: '240 4.8% 95.9%',
         // mutedLight: '240 4.8% 97.5%',
         // mutedForeground: '240 3.8% 46.1%',
         // accent: '240 4.8% 95.9%',
         // accentForeground: '240 5.9% 10%',
         // destructive: '0 84.2% 60.2%',
         // destructiveForeground: '0 0% 98%',
         // border: '240 5.9% 90%',
         // input: '240 5.9% 90%',
         // ring: '346.8 77.2% 49.8%',
         // chart1: '12 76% 61%',
         // chart2: '173 58% 39%',
         // chart3: '197 37% 24%',
         // chart4: '43 74% 66%',
         // chart5: '27 87% 67%',
         // sidebar: '0 0% 98%',
         // sidebarForeground: '240 5.3% 26.1%',
         // sidebarPrimary: '346.8 77.2% 49.8%',
         // sidebarPrimaryForeground: '355.7 100% 97.3%',
         // sidebarAccent: '240 4.8% 95.9%',
         // sidebarAccentForeground: '240 5.9% 10%',
         // sidebarBorder: '220 13% 91%',
         // sidebarRing: '346.8 77.2% 49.8%',
      },
      dark: {
         // background: '20 14.3% 4.1%',
         // foreground: '0 0% 95%',
         // card: '24 9.8% 10%',
         // cardForeground: '0 0% 95%',
         // popover: '0 0% 9%',
         // popoverForeground: '0 0% 95%',
         primary: '346.8 77.2% 49.8%',
         primaryForeground: '355.7 100% 97.3%',
         // secondary: '346.8 77.2% 49.8% / 10%',
         // secondaryForeground: '346.8 77.2% 60%',
         // muted: '0 0% 15%',
         // mutedLight: '0 0% 18%',
         // mutedForeground: '240 5% 64.9%',
         // accent: '12 6.5% 15.1%',
         // accentForeground: '0 0% 98%',
         // destructive: '0 62.8% 30.6%',
         // destructiveForeground: '0 85.7% 97.3%',
         // border: '240 3.7% 15.9%',
         // input: '240 3.7% 15.9%',
         // ring: '346.8 77.2% 49.8%',
         // chart1: '220 70% 50%',
         // chart2: '160 60% 45%',
         // chart3: '30 80% 55%',
         // chart4: '280 65% 60%',
         // chart5: '340 75% 55%',
         // sidebar: '20 14.3% 4.1%',
         // sidebarForeground: '0 0% 95%',
         // sidebarPrimary: '346.8 77.2% 49.8%',
         // sidebarPrimaryForeground: '355.7 100% 97.3%',
         // sidebarAccent: '12 6.5% 15.1%',
         // sidebarAccentForeground: '0 0% 98%',
         // sidebarBorder: '240 3.7% 15.9%',
         // sidebarRing: '346.8 77.2% 49.8%',
      },
   },
   // Zinc is the default — must match app.css :root / .dark exactly
   Zinc: {
      light: {
         // background: '0 0% 100%',
         // foreground: '240 10% 3.9%',
         // card: '0 0% 100%',
         // cardForeground: '240 10% 3.9%',
         // popover: '0 0% 100%',
         // popoverForeground: '240 10% 3.9%',
         primary: '240 5.9% 10%',
         primaryForeground: '0 0% 98%',
         // secondary matches app.css: a semi-transparent tinted accent color
         // secondary: '159.88 100% 32.74% / 0.102',
         // secondaryForeground: '160 100% 33%',
         // muted: '240 4.8% 95.9%',
         // mutedLight: '240 3.8% 96.5%',
         // mutedForeground: '240 3.8% 46.1%',
         // accent: '240 4.8% 95.9%',
         // accentForeground: '240 5.9% 10%',
         // destructive: '0 84.2% 60.2%',
         // destructiveForeground: '0 0% 98%',
         // border: '240 5.9% 90%',
         // input: '240 5.9% 90%',
         // ring: '240 5.9% 87%',
         // chart1: '12 76% 61%',
         // chart2: '173 58% 39%',
         // chart3: '197 37% 24%',
         // chart4: '43 74% 66%',
         // chart5: '27 87% 67%',
         // sidebar: '0 0% 98%',
         // sidebarForeground: '240 5.3% 26.1%',
         // sidebarPrimary: '240 5.9% 10%',
         // sidebarPrimaryForeground: '0 0% 98%',
         // sidebarAccent: '240 4.8% 95.9%',
         // sidebarAccentForeground: '240 5.9% 10%',
         // sidebarBorder: '220 13% 91%',
         // sidebarRing: '240 5.9% 10%',
      },
      dark: {
         // background: '240 10% 3.9%',
         // foreground: '0 0% 98%',
         // card: '240 10% 3.9%',
         // cardForeground: '0 0% 98%',
         // popover: '240 10% 3.9%',
         // popoverForeground: '0 0% 98%',
         primary: '0 0% 98%',
         primaryForeground: '240 5.9% 10%',
         // secondary: '159.88 100% 32.74% / 0.102',
         // secondaryForeground: '160 100% 33%',
         // muted: '240 3.7% 15.9%',
         // mutedLight: '240 3.7% 20%',
         // mutedForeground: '240 5% 64.9%',
         // accent: '240 3.7% 15.9%',
         // accentForeground: '0 0% 98%',
         // destructive: '0 62.8% 30.6%',
         // destructiveForeground: '0 0% 98%',
         // border: '240 3.7% 15.9%',
         // input: '240 3.7% 15.9%',
         // ring: '240 4.9% 43.9%',
         // chart1: '220 70% 50%',
         // chart2: '160 60% 45%',
         // chart3: '30 80% 55%',
         // chart4: '280 65% 60%',
         // chart5: '340 75% 55%',
         // sidebar: '240 10% 3.9%',
         // sidebarForeground: '0 0% 98%',
         // sidebarPrimary: '0 0% 98%',
         // sidebarPrimaryForeground: '240 5.9% 10%',
         // sidebarAccent: '240 3.7% 15.9%',
         // sidebarAccentForeground: '0 0% 98%',
         // sidebarBorder: '240 3.7% 15.9%',
         // sidebarRing: '240 4.9% 83.9%',
      },
   },
};

export default function setGlobalColorTheme(
   themeMode: 'light' | 'dark' | 'system',
   color: ThemeColors,
) {
   if (themeMode === 'system') {
      themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches
         ? 'dark'
         : 'light';
   }

   const theme = themes[color][themeMode] as Theme;

   for (const key in theme) {
      document.documentElement.style.setProperty(
         `--${camelToKebabCase(key)}`,
         `hsl(${theme[key as keyof Theme]})`,
      );
   }
}

export function getThemeColorConfig(color: ThemeColors) {
   const theme = themes[color] as ThemeMode;

   const convertTheme = (t: Theme) => {
      let css = '\n';
      (Object.keys(t) as (keyof Theme)[]).forEach((key) => {
         css += `--${camelToKebabCase(key)}: hsl(${t[key]});\n`;
      });

      return `{${css}}`;
   };

   return `
:root ${convertTheme(theme.light)}

.dark ${convertTheme(theme.dark)}
`;
}

function camelToKebabCase(str: string): string {
   return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}
