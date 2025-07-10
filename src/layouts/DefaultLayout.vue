<template>
	<div class="relative pb-14">
		<Header />
		<main class="pt-16">
			<slot />
		</main>
		<Footer />
	</div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>
  
