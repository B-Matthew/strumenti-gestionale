<template>
	<footer class="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-md">
		<nav class="flex justify-around items-center h-14 text-sm text-gray-600">
			<RouterLink to="/" class="flex flex-col items-center justify-center text-center"
				:class="{ 'text-blue-600': isActiveRoute('/') }">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mb-1" fill="none" viewBox="0 0 24 24"
					stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6" />
				</svg>
				<span>Home</span>
			</RouterLink>

			<RouterLink to="/dipendenti" class="flex flex-col items-center justify-center text-center"
				:class="{ 'text-blue-600': isActiveRoute('/') }">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mb-1" fill="none" viewBox="0 0 24 24"
					stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6" />
				</svg>
				<span>Dipendenti</span>
			</RouterLink>

			<RouterLink to="/strumenti" class="flex flex-col items-center justify-center text-center"
				:class="{ 'text-blue-600': isActiveRoute('/strumenti') }">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mb-1" fill="none" viewBox="0 0 24 24"
					stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						d="M9 17v-6h13M9 11H6v6h3zM6 11V5a2 2 0 012-2h2m0 0h2a2 2 0 012 2v6m-6 0h6" />
				</svg>
				<span>Strumenti</span>
			</RouterLink>
		</nav>
	</footer>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const isActiveRoute = (path) => route.path === path
</script>

<style scoped>
.router-link-active {
	color: #2563eb;
	/* blue-600 */
}
</style>
