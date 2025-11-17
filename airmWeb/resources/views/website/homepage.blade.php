@extends('website.layouts.main')

@section('title', 'Homepage')

@section('content')
<header class="pt-20">
    <div class="max-w-6xl mx-auto px-6 text-left">
        <h1 class="text-5xl md:text-6xl font-extrabold text-blue-600 leading-tight">
            Smarter Decisions for a Connected Supply Chain
        </h1>
    </div>
</header>
<main class="bg-grey-800 py-22">
    <div class="max-w-6xl mx-auto px-6 space-y-24">
        <section class="grid md:grid-cols-2 gap-12 items-center">
            <div>
                <h2 class="text-3xl font-semibold text-blue-400 mb-4">
                    AI-driven insights for the right product, in the right place, at the right time.
                </h2>
                <p class="text-white-300 leading-relaxed">
                    Our platform brings together advanced predictive analytics and powerful causal modeling to anticipate future outcomes with greater accuracy. By understanding not just what is likely to happen, but why it happens, the system provides clear guidance for optimizing inventory movement and adjusting pricing strategies. This helps organizations proactively prevent stockouts, reduce excess inventory, eliminate unnecessary waste, and ultimately protect profitability across the entire supply chain.
                </p>
            </div>
            <div>
                <img src="/website/home_images/dashboard-mock.png"
                     alt="Dashboard preview"
                     class="rounded-xl shadow-xl opacity-90 hover:opacity-100 transition">
            </div>
        </section>
        <section class="grid md:grid-cols-2 gap-12 items-center">
            <div class="order-2 md:order-1">
                <img src="/website/home_images/cont-learning.jpg"
                     alt="AI learning illustration"
                     class="rounded-xl shadow-lg opacity-90 hover:opacity-100 transition">
            </div>
            <div class="order-1 md:order-2">
                <p class="text-white-500 leading-bold">
                    Each decision the system makes helps enhance the next one. Over time, it learns from real outcomes, refines its reasoning, and becomes increasingly accurate. This continuous learning loop not only strengthens future recommendations but also makes it easier for teams to understand the logic behind every action. As a result, compliance processes, reporting workflows, and audit tracking all become simpler, more transparent, and far more efficient.
                </p>
            </div>
        </section>
    </div>
</main>
@endsection