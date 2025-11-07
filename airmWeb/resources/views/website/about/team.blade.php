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
<header>
    <h1 class="text-center text-4xl font-bold mb-6">About the Team</h1>
</header>

<main class="max-w-4xl mx-auto text-center space-y-8">
    <div>
        <h2 class="text-2xl font-semibold mb-2 text-blue-400">Team Leader: Bhushith</h2>
        <p class="text-gray-300">
            Leads backend development and AI integration for the AiRM.ai platform, ensuring system efficiency and reliability.
        </p>
    </div>

    <div>
        <h2 class="text-2xl font-semibold mb-2 text-blue-400">Developer: Kevin</h2>
        <p class="text-gray-300">
            Focuses on frontend development, UX optimization, and system architecture.
        </p>
    </div>

    <div>
        <h2 class="text-2xl font-semibold mb-2 text-blue-400">Data Analyst: Alisa</h2>
        <p class="text-gray-300">
            Specializes in data modeling, analytics, and insights for AI-driven decision support.
        </p>
    </div>
</main>
@endsection
>>>>>>> Stashed changes
