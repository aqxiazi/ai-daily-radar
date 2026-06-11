<template>
  <div class="min-h-screen bg-gray-950 text-gray-100">
    <header class="border-b border-gray-800 bg-gray-900/50 backdrop-blur sticky top-0 z-50">
      <div class="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <NuxtLink to="/" class="text-lg font-bold text-cyan-400">⚡ AI Daily Radar</NuxtLink>
        <nav class="flex gap-4 text-sm text-gray-400">
          <NuxtLink to="/" class="hover:text-white">首页</NuxtLink>
          <a href="https://github.com" target="_blank" class="hover:text-white">GitHub</a>
        </nav>
      </div>
    </header>
    <main class="max-w-4xl mx-auto px-4 py-6">
      <NuxtPage />
    </main>
    <footer class="border-t border-gray-800 py-4 text-center text-sm text-gray-500">
      AI Daily Radar © 2026 — 全自动运营
    </footer>
  </div>
</template>
