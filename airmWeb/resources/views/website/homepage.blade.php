@extends('website.layouts.main')

@section('title', 'Homepage')

@section('content')
<header>
    <div class="flex-row bg-gray-900 p-4 h-3/4">
        <h1 class="text-center text-6xl text-blue-700 font-bold">
            Smarter Decisions for a Connected Supply Chain
        </h1>
    </div>
</header>

<main>
    <div class="flex-row bg-gray-800 p-3 h-3/4">
        <section class="p-2">
            <h2 class="text-center text-4xl text-blue-400 font-semibold">
                AI-driven insights for the right product, in the right place, at the right time.
            </h2>
        </section>
    
        <section class="text-white text-center p-2">
            <p>
                Our platform combines predictive analytics with causal modeling to forecast outcomes 
                and guide inventory and pricing strategies — minimizing shortages, excess stock, and waste 
                while safeguarding profitability.
            </p>
            <p>
                Each decision continuously improves the next: the system learns from results, 
                explains its reasoning, and simplifies compliance, reporting, and audit tracking.
            </p>
            <p>
                Want to experience it firsthand? Request a live demo and see the impact in action.
            </p>
        </section>
    </div>
</main>
@endsection