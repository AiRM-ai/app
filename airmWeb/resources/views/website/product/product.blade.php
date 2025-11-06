@extends('website.layouts.main')

@section('title', 'Product')

@section('content')
<header>
    <h1 class="text-center text-4xl font-bold mb-6">Our Product</h1>
</header>

<main class="max-w-5xl mx-auto text-center space-y-8">
    <section>
        <h2 class="text-2xl font-semibold text-blue-400 mb-3">What We Offer</h2>
        <p class="text-gray-300 leading-relaxed">
            AiRM.ai provides an AI-driven platform designed to optimize supply chain management through predictive analytics, 
            demand forecasting, and intelligent decision-making. Our system helps businesses minimize waste, prevent stockouts, 
            and maintain healthy inventory levels across their operations.
        </p>
    </section>

    <section>
        <h2 class="text-2xl font-semibold text-blue-400 mb-3">Why It’s Powerful</h2>
        <p class="text-gray-300 leading-relaxed">
            Built with advanced models such as XGBoost and neural forecasting algorithms, 
            the AiRM.ai engine continuously learns from historical data and market behavior. 
            It doesn’t just predict — it explains why a decision is optimal, 
            giving your team confidence in every recommendation.
        </p>
    </section>

    <section>
        <h2 class="text-2xl font-semibold text-blue-400 mb-3">Key Features</h2>
        <ul class="text-gray-300 space-y-2 list-disc list-inside">
            <li>Real-time demand prediction and restock scheduling</li>
            <li>Explainable AI insights with causal reasoning</li>
            <li>Integration-ready API for your ERP or logistics system</li>
            <li>Continuous model retraining for improving accuracy</li>
            <li>Secure, privacy-compliant data handling</li>
        </ul>
</section>
</main>
@endsection