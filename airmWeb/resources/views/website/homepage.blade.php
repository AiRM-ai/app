@extends('website.layouts.main')

@section('title', 'Homepage')

@section('content')
<header class="bg-gray-900 py-20">
    <div class="max-w-6xl mx-auto px-6 text-left">
        <h1 class="text-5xl md:text-6xl font-extrabold text-blue-600 leading-tight">
            Smarter Decisions for a Connected Supply Chain
        </h1>
    </div>
</header>

<main class="bg-gray-800 py-16">
    <div class="max-w-6xl mx-auto px-6 space-y-12">

        {{-- Section: AI-driven insights --}}
        <section>
            <h2 class="text-3xl font-semibold text-blue-400 mb-4">
                AI-driven insights for the right product, in the right place, at the right time.
            </h2>
            <p class="text-gray-300 leading-relaxed max-w-4xl">
                Our platform combines predictive analytics with causal modeling to forecast outcomes 
                and guide inventory and pricing strategies — minimizing shortages, excess stock, and waste 
                while safeguarding profitability.
            </p>
        </section>

        {{-- Section: Continuous improvement --}}
        <section>
            <p class="text-gray-300 leading-relaxed max-w-4xl">
                Each decision continuously improves the next: the system learns from results, 
                explains its reasoning, and simplifies compliance, reporting, and audit tracking.
            </p>
        </section>

    </div>
</main>
@endsection
