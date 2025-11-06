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
        <h2 class="text-2xl font-semibold mb-2 text-blue-400">Data Analyst: Alissa</h2>
        <p class="text-gray-300">
            Specializes in data modeling, analytics, and insights for AI-driven decision support.
        </p>
    </div>
</main>
@endsection