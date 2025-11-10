<<<<<<< Updated upstream
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AiRM.ai</title>
    @viteReactRefresh
    @vite(["resources/js/app.tsx", "resources/css/app.css"])
</head>
<body>
    <header>
        <h1>About the company</h1>
    </header>
    <main>
        <section>
            <h2>We strive to make a better way for businesses to order and allocate prices based on the market as a whole</h2>
            <h1>Our values</h1>
            <p>We as a company love the idea of slavery and exploitation of free labor. We also believe in tax evasion and that the company values lying to the government.</p>
        </section>
        <section>
            <h2>AiRM.ai Demo</h2>
        </section>
    </main>
</body>
</html>
=======
@extends('website.layouts.main')

@section('title', 'About')

@section('content')
<header class="bg-gray-900 py-20">
    <div class="max-w-6xl mx-auto px-6">
        <h1 class="text-5xl md:text-6xl font-extrabold text-blue-600 leading-tight">
            About the Company
        </h1>
        <p class="text-gray-300 text-lg mt-6 max-w-3xl">
            We strive to create smarter, AI-powered ways for businesses to optimize orders and pricing across the market — enabling better efficiency, precision, and growth.
        </p>
    </div>
</header>

<main class="bg-gray-800 py-16">
    <div class="max-w-6xl mx-auto px-6 space-y-12">
        {{-- Values Section --}}
        <section>
            <h2 class="text-3xl font-semibold text-blue-400 mb-4">Our Values</h2>
            <p class="text-gray-300 leading-relaxed max-w-4xl">
                At <span class="font-semibold text-blue-300">AiRM.ai</span>, we believe in transparency, innovation, 
                and responsible AI deployment. Our goal is to empower companies with intelligent tools 
                that drive sustainable growth and smarter decision-making across all operations.
            </p>
        </section>

        {{-- Demo Section --}}
        <section>
            <h2 class="text-3xl font-semibold text-blue-400 mb-4">AiRM.ai Demo</h2>
            <p class="text-gray-300 leading-relaxed max-w-4xl">
                Discover how our system learns, predicts, and adapts to your business needs in real time — 
                combining the power of AI insights with clear, actionable decision support. 
            </p>
        </section>
    </div>
</main>
@endsection
>>>>>>> Stashed changes
