<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        @viteReactRefresh
        @vite(["resources/js/app.tsx", "resources/css/app.css"])
    </head>
    <body class="font-sans antialiased">
        
        <h1 class="text-4xl hover:underline bg-color-400 text-blue-400"> HELLO WORLD!! </h1>
    </body>
</html>