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
    </div>
</main>
@endsection