<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title') | AiRM.ai</title>

    @viteReactRefresh
    @vite(['resources/js/app.tsx', 'resources/css/app.css'])
</head>

<body class="bg-gradient-to-br from-[#0a0f24] to-[#0b1a40] min-h-screen">

    {{-- Navbar --}}
    @include('website.partials.navbar')

    {{-- Page-specific content --}}
    <main class="p-6 min-h-screen">
        @yield('content')
    </main>

    {{-- Footer --}}
    @include('website.partials.footer')

</body>
</html>
