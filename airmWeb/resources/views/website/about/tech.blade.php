@extends('website.layouts.main')

@section('title', 'Technology')

@section('content')
<header class="bg-gray-900 py-20">
    <div class="max-w-6xl mx-auto px-6">
        <h1 class="text-5xl md:text-6xl font-extrabold text-blue-600 leading-tight">
            About the Backend
        </h1>
        <p class="text-gray-300 text-lg mt-6 max-w-3xl">
            Powering AiRM.ai’s intelligent supply chain optimization with scalable, data-driven machine learning.
        </p>
    </div>
</header>

<main class="bg-gray-800 py-16">
    <div class="max-w-6xl mx-auto px-6 space-y-10">
        {{-- Model Overview --}}
        <section>
            <h2 class="text-3xl font-semibold text-blue-400 mb-4">About the Models</h2>
            <p class="text-gray-300 leading-relaxed max-w-4xl">
                The current system leverages an <span class="font-semibold text-blue-300">XGBoost-based model</span> 
                to predict restocking and ordering schedules. It continuously learns from historical data, 
                allowing <span class="font-semibold text-blue-300">AiRM.ai</span> to optimize supply and demand 
                alignment while reducing waste.
            </p>
        </section>

        {{-- Additional Technical Insight --}}
        <section>
            <h2 class="text-3xl font-semibold text-blue-400 mb-4">Learning and Optimization</h2>
            <p class="text-gray-300 leading-relaxed max-w-4xl">
                The backend integrates automated retraining pipelines that update model weights 
                based on new transaction data. This ensures forecasts remain accurate even as market conditions evolve.
            </p>
        </section>

        {{-- Scalability --}}
        <section>
            <h2 class="text-3xl font-semibold text-blue-400 mb-4">Scalability and Integration</h2>
            <p class="text-gray-300 leading-relaxed max-w-4xl">
                Built on a modular architecture, the system supports multi-site deployments, 
                integrates seamlessly with ERP and POS systems, and provides APIs for real-time 
                synchronization and analytics delivery.
            </p>
        </section>
    </div>
</main>
@endsection
