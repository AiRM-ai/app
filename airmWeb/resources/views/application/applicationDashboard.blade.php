<x-application.basic-app-layout>
    <!-- Format for the layout = <x-folder.layoutName> this folder must be in views/components -->

    <!-- This is the magic div. React will take control of everything inside it. -->
    <div id="application-dashboard"></div>

    <!-- This script loads your compiled React app -->
    @viteReactRefresh
    @vite('resources/js/app.tsx')

</x-application.basic-app-layout>