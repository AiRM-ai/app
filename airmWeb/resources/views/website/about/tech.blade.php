@extends('website.layouts.main')

@section('title', 'Technology')

@section('content')
<header>
    <h1 class="text-center text-4xl font-bold mb-6">About the Backend</h1>
</header>

<main class="max-w-4xl mx-auto text-center">
    <div class="space-y-4">
        <h2 class="text-2xl font-semibold text-blue-400">About the Models</h2>
        <p class="text-gray-300 leading-relaxed">
            The current system leverages an XGBoost-based model to predict restocking and ordering schedules. 
            It continuously learns from historical data, allowing AiRM.ai to optimize supply and demand alignment while reducing waste.
        </p>
    </div>
</main>
@endsection