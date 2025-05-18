<template>
	<header>
		<!-- Header/Navbar -->
		<nav class="bg-white border-b border-gray-200 shadow-sm">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex justify-between h-16">
					<!-- Logo e titolo -->
					<RouterLink to="/" class="flex">
						<div class="flex-shrink-0 flex items-center">
							<div
								class="rounded flex items-center justify-center h-full py-2">
								<img class="w-full h-full object-contain" src="/logo-cobetsrl.svg" alt="" />
							</div>
							<!-- <span class="ml-2 text-xl font-semibold text-gray-800">Gestionale Strumenti</span> -->
						</div>
					</RouterLink>

					<!-- Pulsanti e profilo utente -->
					<div class="flex items-center">
						<button
							class="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
								stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
							</svg>
						</button>

						<div class="ml-3 relative group" ref="dropdown">
							<div class="flex items-center">
								<button type="button" @click="toggleDropdown"
									class="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
									<div
										class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
										U
									</div>
								</button>
								<div class="ml-2 hidden md:block">
									<div class="text-sm font-medium text-gray-700">Utente</div>
									<div class="text-xs text-gray-500">{{ user.email }}</div>
								</div>
							</div>
							<!-- creo un dropdown menu per il logout adattato come stile-->
							<div v-if="isDropdownOpen"
								class="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5  group-hover:block">
								<button @click="signOut"
									class="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	</header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '@/firebase/firebase'

const user = auth.currentUser
const router = useRouter()
const isDropdownOpen = ref(false)
const dropdown = ref(null)

const toggleDropdown = () => {
	isDropdownOpen.value = !isDropdownOpen.value
}

const handleClickOutside = (event) => {
	if (!dropdown.value.contains(event.target)) {
		isDropdownOpen.value = false
	}
}

const signOut = () => {
	auth.signOut()
	router.push('/login')
	.then(() => {
		console.log('Logout effettuato con successo')
	})
	.catch((error) => {
		console.error('Errore durante il logout:', error)
	})
}

onMounted(() => {
	document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
	document.removeEventListener('click', handleClickOutside)
})

</script>

<style scoped>

</style>