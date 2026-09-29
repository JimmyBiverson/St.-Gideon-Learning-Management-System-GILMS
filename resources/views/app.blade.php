<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta
           name="viewport"
           content="width=device-width, initial-scale=1"
        >
        <meta
           name="csrf-token"
           content="{{ csrf_token() }}"
        >
     
        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
           html {
              background-color: oklch(1 0 0);
           }
     
           html.dark {
              background-color: oklch(0.145 0 0);
           }
        </style>
     
        @if (app('system'))
           <title inertia>
              {{ $metaTitle ?? app('system')->fields['name'] }}
           </title>
           <meta
              name="description"
              content="{{ $metaDescription ?? app('system')->fields['description'] }}"
           >
           <meta
              name="keywords"
              content="{{ $metaKeywords ?? app('system')->fields['keywords'] }}"
           >
           <meta
              name="author"
              content="{{ app('system')->fields['author'] }}"
           >
     
           @if (!empty(app('system')->fields['favicon']))
              <link
                 rel="icon"
                 href="{{ app('system')->fields['favicon'] }}"
                 type="image/png"
              >
           @elseif (!empty(app('system')->fields['logo_light']))
              <link
                 rel="icon"
                 href="{{ app('system')->fields['logo_light'] }}"
                 type="image/png"
              >
           @endif
     
           <meta
              property="og:type"
              content="{{ $ogType ?? 'website' }}"
           >
           <meta
              property="og:url"
              content="{{ $ogUrl ?? env('APP_URL', config('app.url')) }}"
           >
           <meta
              property="og:title"
              content="{{ $ogTitle ?? (app('system')->fields['title'] ?? app('system')->fields['name']) }}"
           >
           <meta
              property="og:description"
              content="{{ $ogDescription ?? app('system')->fields['description'] }}"
           >
           <meta
              property="og:site_name"
              content="{{ app('system')->fields['name'] }}"
           >
     
           @if (!empty($ogImage))
              <meta
                 property="og:image"
                 content="{{ $ogImage }}"
              >
              <meta
                 property="og:image:width"
                 content="1200"
              >
              <meta
                 property="og:image:height"
                 content="630"
              >
              <meta
                 property="og:image:alt"
                 content="{{ $ogTitle ?? app('system')->fields['name'] }}"
              >
           @elseif (!empty(app('system')->fields['banner']))
              <meta
                 property="og:image"
                 content="{{ app('system')->fields['banner'] }}"
              >
              <meta
                 property="og:image:width"
                 content="1000"
              >
              <meta
                 property="og:image:height"
                 content="600"
              >
              <meta
                 property="og:image:alt"
                 content="{{ app('system')->fields['name'] }}"
              >
           @endif
     
           <meta
              name="twitter:card"
              content="{{ $twitterCard ?? 'summary_large_image' }}"
           >
           <meta
              name="twitter:title"
              content="{{ $twitterTitle ?? (app('system')->fields['title'] ?? app('system')->fields['name']) }}"
           >
           <meta
              name="twitter:description"
              content="{{ $twitterDescription ?? app('system')->fields['description'] }}"
           >
           @if (!empty($twitterImage))
              <meta
                 name="twitter:image"
                 content="{{ $twitterImage }}"
              >
           @elseif (!empty(app('system')->fields['banner']))
              <meta
                 name="twitter:image"
                 content="{{ app('system')->fields['banner'] }}"
              >
           @endif
        @endif

        @php
            $fontFamily = 'inter';
            if (app('system') && isset(app('system')->fields['font_family'])) {
                $fontFamily = app('system')->fields['font_family'];
            }

            $fontMap = [
                'inter' => 'inter:400,500,600,700',
                'roboto' => 'roboto:400,500,700',
                'poppins' => 'poppins:400,500,600,700',
                'nunito' => 'nunito:400,600,700',
                'outfit' => 'outfit:400,500,600,700',
            ];

            $fontNameMap = [
                'inter' => 'Inter',
                'roboto' => 'Roboto',
                'poppins' => 'Poppins',
                'nunito' => 'Nunito',
                'outfit' => 'Outfit',
            ];

            $fontQuery = $fontMap[$fontFamily] ?? 'inter:400,500,600,700';
            $fontName = $fontNameMap[$fontFamily] ?? 'Inter';
        @endphp

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family={{ $fontQuery }}" rel="stylesheet" />

        <style>
            :root {
                --font-sans: '{{ $fontName }}', sans-serif !important;
            }
        </style>

        @php
            $component = $page['component'] ?? '';
            $segments = explode('/', $component);
            $moduleName = $segments[0] ?? null;
            $isModulePage = $moduleName && count($segments) > 1;
            $moduleManifestPagePath = $isModulePage
                ? 'Modules/'.$moduleName.'/resources/js/pages/'.implode('/', array_slice($segments, 1)).'.tsx'
                : null;

            $pluginPageEntry = null;
            $manifestPath = public_path('build/manifest.json');

            if ($moduleManifestPagePath && file_exists($manifestPath)) {
                $manifest = json_decode(file_get_contents($manifestPath), true);

                if (is_array($manifest) && isset($manifest[$moduleManifestPagePath]) && is_array($manifest[$moduleManifestPagePath])) {
                    $entry = $manifest[$moduleManifestPagePath];
                    $pluginPageEntry = [
                        'component' => $component,
                        'file' => isset($entry['file']) ? asset('build/'.$entry['file']) : null,
                        'css' => collect($entry['css'] ?? [])
                            ->filter(fn ($path) => is_string($path))
                            ->map(fn (string $path) => asset('build/'.$path))
                            ->values()
                            ->all(),
                    ];
                }
            }

            $viteEntries = ['resources/css/app.css', 'resources/js/app.tsx'];
        @endphp

        @if ($pluginPageEntry)
            <script>
                window.__PLUGIN_PAGE_ENTRY__ = @json($pluginPageEntry);
            </script>
        @endif

        @viteReactRefresh
        @vite($viteEntries)
        <x-inertia::head>
            <title>{{ config('app.name') }}</title>
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />

         {{-- Inject Global Style AFTER app styles so it wins in the cascade --}}
         @if (app('system'))
            @php($globalStyle = array_key_exists('global_style', app('system')->fields) ? app('system')->fields['global_style'] : '')
            <style
               data-global-style
               type="text/css"
            >
               {!! $globalStyle !!}
            </style>
         @endif
    </body>
</html>
