@extends('website.layouts.main')

@section('title', 'About')

@section('content')
<header>
    <h1 class="text-center text-4xl font-bold mb-6">About the Company</h1>
</header>

<main class="max-w-4xl mx-auto space-y-8 text-center">
    <section>
        <h2 class="text-2xl font-semibold mb-4">
            We strive to create smarter, AI-powered ways for businesses to optimize orders and pricing across the market.
        </h2>

        <h3 class="text-xl font-bold mt-8 mb-3 text-blue-400">Our Values</h3>
        <p class="text-gray-300 leading-relaxed">
            At AiRM.ai, we believe in transparency, innovation, and responsible AI deployment. 
            Our goal is to empower companies with tools that drive sustainable growth and smarter decision-making.
        </p>
    </section>

    <section>
        <h2 class="text-2xl font-semibold mb-3 text-blue-400">AiRM.ai Demo</h2>
        <p class="text-gray-300">Discover how our system learns, predicts, and adapts to your business needs.</p>
    </section>
</main>
@endsection