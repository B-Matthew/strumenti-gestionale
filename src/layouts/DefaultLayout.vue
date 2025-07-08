<template>
	<div>
		<Header />
		<main class="pt-16">
			<slot />
		</main>
	</div>
</template>

<script setup>
import Header from '@/components/Header.vue'
</script>
  
