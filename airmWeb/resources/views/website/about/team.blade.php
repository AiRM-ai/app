<<<<<<< Updated upstream
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AiRM.ai</title>
    @viteReactRefresh
    @vite(["resources/js/app.tsx", "resources/css/app.css"])
</head>
<body>
    <header>
        <h1>About the Team!</h1>
    </header>
    <main>
        <div>
            <h2>Team Leader: Bhushith</h2>
            <p>Hi, I'm Bhushith and I am a 3rd year student at TUJ. I am secretly g-a-y but I am still currently hiding it. "Just because I dont have a gf and I use Nvm doesnt mean im gay..."</p>
        </div>
        <div>
            <h2>Designated Dog: Kevin</h2>
            <p>Woof Woof.</p>
        </div>
        <div>
            <h2>CFO: Alissa</h2>
            <p>I make models and I am very into models and i come to class late.</p>
        </div>
    </main>
</body>
</html>
=======
@extends('website.layouts.main')

@section('title', 'Team')

@section('content')
<header class="mb-8">
    <h1 class="text-4xl font-bold text-center mb-6">About the Team</h1>
</header>

<main class="max-w-5xl mx-auto text-left space-y-10">
    {{-- Bhushith --}}
    <div class="flex items-center space-x-6">
        <img src="{{ asset('website/about/profile_pics/Bhushith.jpg') }}" 
             alt="Bhushith" 
             class="w-40 h-40 object-cover rounded-lg shadow-md">
        <div>
            <h2 class="text-2xl font-semibold mb-2 text-blue-400">Team Leader: Bhushith</h2>
            <p class="text-gray-300">
                Leads backend development and AI integration for the AiRM.ai platform, ensuring system efficiency and reliability.
            </p>
        </div>
    </div>

    {{-- Kevin --}}
    <div class="flex items-center space-x-6">
        <img src="{{ asset('website/about/profile_pics/Kevin.jpg') }}" 
             alt="Kevin" 
             class="w-40 h-40 object-cover rounded-lg shadow-md">
        <div>
            <h2 class="text-2xl font-semibold mb-2 text-blue-400">Developer: Kevin</h2>
            <p class="text-gray-300">
                Focuses on frontend development, UX optimization, and system architecture.
            </p>
        </div>
    </div>

<<<<<<< Updated upstream
    <div>
        <h2 class="text-2xl font-semibold mb-2 text-blue-400">Data Analyst: Alisa</h2>
        <p class="text-gray-300">
            Specializes in data modeling, analytics, and insights for AI-driven decision support.
        </p>
=======
    {{-- Alisa --}}
    <div class="flex items-center space-x-6">
        <img src="{{ asset('website/about/profile_pics/Alisa.jpg') }}" 
             alt="Alisa" 
             class="w-40 h-40 object-cover rounded-lg shadow-md">
        <div>
            <h2 class="text-2xl font-semibold mb-2 text-blue-400">Data Analyst/Model Maker: Alisa</h2>
            <p class="text-gray-300">
                Specializes in data modeling, analytics, and insights for AI-driven decision support.
            </p>
        </div>
>>>>>>> Stashed changes
    </div>
</main>
@endsection
>>>>>>> Stashed changes
