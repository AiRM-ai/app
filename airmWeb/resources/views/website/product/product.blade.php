@extends('website.layouts.main')

@section('title', 'Product')

@section('content')
<header class="bg-gray-900 py-20">
    <div class="max-w-6xl mx-auto px-6">
        <h1 class="text-5xl md:text-6xl font-extrabold text-blue-600 leading-tight">
            Our Product
        </h1>
        <p class="text-gray-300 text-lg mt-6 max-w-3xl">
            AiRM.ai provides an AI-driven platform that optimizes supply chain operations through predictive analytics, 
            intelligent restocking, and dynamic pricing automation.
        </p>
    </div>
</header>

<main class="bg-gray-800 py-16">
    <div class="max-w-6xl mx-auto px-6 space-y-12">

        {{-- What We Offer --}}
        <section>
            <h2 class="text-3xl font-semibold text-blue-400 mb-4">What We Offer</h2>
            <p class="text-gray-300 leading-relaxed max-w-4xl">
                Our system helps businesses maintain balanced inventory, reduce waste, and prevent out-of-stock events 
                by continuously forecasting demand and adjusting pricing in real time. 
                AiRM.ai’s adaptive AI transforms raw data into actionable supply insights that drive profit and efficiency.
            </p>
        </section>

        {{-- Why It’s Powerful --}}
        <section>
            <h2 class="text-3xl font-semibold text-blue-400 mb-4">Why It’s Powerful</h2>
            <p class="text-gray-300 leading-relaxed max-w-4xl">
                Built with advanced models such as <span class="font-semibold text-blue-300">XGBoost</span> 
                and neural forecasting algorithms, the AiRM.ai engine learns from historical and live market data. 
                It doesn’t just predict — it explains *why* each decision is optimal, giving your team full transparency 
                into pricing and restocking recommendations.
            </p>
        </section>

        {{-- Key Features --}}
        <section>
            <h2 class="text-3xl font-semibold text-blue-400 mb-4">Key Features</h2>
            <ul class="text-gray-300 space-y-2 list-disc list-inside leading-relaxed">
                <li>Real-time demand prediction and intelligent restocking automation</li>
                <li>AI-driven dynamic pricing with causal reasoning</li>
                <li>Integration-ready APIs for ERP and logistics systems</li>
                <li>Continuous model retraining for improved forecast accuracy</li>
                <li>Enterprise-grade security and privacy compliance</li>
            </ul>
        </section>

        {{-- Pricing Plans --}}
        <section class="pt-8">
            <h2 class="text-3xl font-semibold text-blue-400 mb-8">Pricing Plans</h2>

            <div class="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:items-center md:gap-8">

                    {{-- Pro Plan --}}
                    <div class="rounded-2xl border border-indigo-600 p-6 shadow-xs ring-1 ring-indigo-600 sm:px-8 lg:p-12 bg-gray-900">
                        <div class="text-center">
                            <h3 class="text-lg font-medium text-blue-400">Pro</h3>
                            <p class="mt-2 sm:mt-4">
                                <strong class="text-3xl font-bold text-white sm:text-4xl">$149</strong>
                                <span class="text-sm font-medium text-gray-400">/month</span>
                            </p>
                        </div>

                        <ul class="mt-6 space-y-2 text-gray-300">
                            <li class="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 text-blue-500">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                                Up to 20,000 SKUs analyzed per cycle
                            </li>
                            <li class="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 text-blue-500">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                                Multi-warehouse demand forecasting
                            </li>
                            <li class="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 text-blue-500">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                                Dynamic pricing engine with profit optimization
                            </li>
                            <li class="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 text-blue-500">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                                API access for ERP & logistics integration
                            </li>
                            <li class="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 text-blue-500">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                                Priority email & chat support
                            </li>
                        </ul>

                        <a href="#" class="mt-8 block rounded-full border border-indigo-600 bg-indigo-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-indigo-700 hover:ring-1 hover:ring-indigo-700 transition">
                            Get Started
                        </a>
                    </div>

                    {{-- Starter Plan --}}
                    <div class="rounded-2xl border border-gray-600 p-6 shadow-xs sm:px-8 lg:p-12 bg-gray-900">
                        <div class="text-center">
                            <h3 class="text-lg font-medium text-blue-400">Starter</h3>
                            <p class="mt-2 sm:mt-4">
                                <strong class="text-3xl font-bold text-white sm:text-4xl">$79</strong>
                                <span class="text-sm font-medium text-gray-400">/month</span>
                            </p>
                        </div>

                        <ul class="mt-6 space-y-2 text-gray-300">
                            <li class="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 text-blue-500">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                                Up to 5,000 SKUs analyzed per cycle
                            </li>
                            <li class="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 text-blue-500">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                                Single warehouse forecasting
                            </li>
                            <li class="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 text-blue-500">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                                Core AI-driven restocking predictions
                            </li>
                            <li class="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 text-blue-500">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                                Basic email support
                            </li>
                        </ul>

                        <a href="#" class="mt-8 block rounded-full border border-indigo-600 bg-transparent px-12 py-3 text-center text-sm font-medium text-indigo-400 hover:bg-indigo-600 hover:text-white hover:ring-1 hover:ring-indigo-600 transition">
                            Get Started
                        </a>
                    </div>
                </div>
            </div>
        </section>

    </div>
</main>
@endsection