<template>
  <div v-if="post">
    <article class="prose prose-invert max-w-none">
      <header class="mb-6">
        <span class="inline-block px-2 py-0.5 rounded text-xs bg-gray-800 text-cyan-400 mb-3">{{ post.category }}</span>
        <h1 class="text-2xl font-bold mb-2">{{ post.title }}</h1>
        <div class="flex gap-4 text-sm text-gray-500">
          <time>{{ formatDate(post.date) }}</time>
          <span>来源: {{ post.source || 'AI 自动抓取' }}</span>
        </div>
      </header>
      <ContentRenderer :value="post" />
    </article>

    <!-- 推广区域 -->
    <div class="mt-8 p-4 rounded-xl border border-cyan-900 bg-cyan-950/30">
      <p class="text-sm text-cyan-300">💡 对这个工具感兴趣？</p>
      <p class="text-sm text-gray-400 mt-1">通过我们的链接注册可享受专属优惠，同时支持本站运营</p>
      <a
        v-if="post.affiliateLink"
        :href="post.affiliateLink"
        target="_blank"
        rel="nofollow noopener"
        class="inline-block mt-3 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm transition"
      >前往官网 →</a>
    </div>

    <NuxtLink to="/" class="inline-block mt-6 text-sm text-cyan-400 hover:underline">← 返回首页</NuxtLink>
  </div>
  <div v-else class="text-center py-16 text-gray-500">
    <p>文章不存在或已被删除</p>
    <NuxtLink to="/" class="text-cyan-400 hover:underline mt-2 inline-block">返回首页</NuxtLink>
  </div>
</template>

<script setup>
const route = useRoute()
const slug = route.params.slug
const { data: post } = await useAsyncData(`post-${slug}`, () => queryContent(`/posts/${slug}`).findOne())

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
}

useHead({ title: post.value?.title ? `${post.value.title} - AI Daily Radar` : '文章不存在' })
</script>
