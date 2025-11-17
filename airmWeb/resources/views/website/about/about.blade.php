@extends('website.layouts.main')

@section('title', 'About')

@section('content')
<header class="py-20">
    <div class="max-w-6xl mx-auto px-6">
        <h1 class="text-5xl md:text-6xl font-extrabold text-blue-600 leading-tight">
            About the Company
        </h1>
        <p class="text-gray-300 text-lg mt-6 max-w-3xl">
            We are committed to building smarter, AI-driven solutions that help businesses optimize their ordering, restocking, and pricing decisions across every market they operate in. Our goal is to enhance efficiency, improve forecasting accuracy, and provide deeper strategic insight—ultimately empowering companies to make more informed decisions, reduce waste, increase profitability, and achieve sustainable long-term growth.
        </p>
    </div>
</header>

<main class="py-6">
    <div class="max-w-6xl mx-auto px-6 space-y-6">
        <section>
            <h2 class="text-3xl font-semibold text-blue-400 mb-4">Our Values</h2>
                <p class="text-gray-300 leading-relaxed max-w-4xl">
                    At <span class="font-semibold text-blue-300">AiRM.ai</span>, we believe that true progress comes from a 
                    commitment to innovation, quality, and responsible use of AI technologies. We design our systems with 
                    reliability at their core — ensuring that every insight, prediction, and recommendation helps businesses 
                    operate with greater confidence and precision. Our mission is to empower companies with intelligent, 
                    future-ready tools that enable sustainable growth, smarter decision-making, and long-term operational excellence 
                    across every part of their organization.
                </p>

            <div>
                <img src="/website/about_images/values.png"
                alt="Dashboard preview"
                class="rounded-xl opacity-90 hover:opacity-100 transition w-4/6 mx-auto">
            </div>

        </section>
        <section>
            <h2 class="text-3xl font-semibold text-blue-400 mb-4">AiRM.ai Demo</h2>
            <p class="text-gray-300 leading-relaxed max-w-4xl">
                Discover how our system continuously learns from your operations, anticipates future trends, and adapts to evolving business needs in real time. By combining advanced AI-driven insights with clear, actionable decision support, it empowers teams to make confident, data-backed choices that enhance efficiency, reduce uncertainty, and unlock new opportunities for growth.
            </p>
            {{-- Insert Demo Video Here --}}
        </section>
    </div>
</main>
@endsection
