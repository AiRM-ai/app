<!-- basic-chat-layout.blade.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    
    <title>Application Dashboard</title>

    <!-- Vite Directives to load compiled CSS and JS -->
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="flex flex-col min-h-screen min-w-screen bg-gray-700">
    
    <!-- Main Content -->
    <main class = "flex-grow bg-white">
        <!-- This is where the content of each page will be injected -->
        {{ $slot }} <!--Whatever is passed to this component will be displayed here-->
    </main>
    
</body>
</html>