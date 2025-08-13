<template>
	<header class="fixed top-0 left-0 right-0 z-50">
		<!-- Header/Navbar -->
		<nav class="bg-primary border-b border-gray-200 shadow-sm">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex justify-between h-16">
					<!-- Logo e titolo -->
					<RouterLink to="/" class="flex">
						<div class="flex-shrink-0 flex items-center">
							<div class="rounded flex items-center justify-center h-full py-2">
								<img class="w-full h-full object-contain" src="/logo.jpg" alt="" />
							</div>
							<!-- <span class="ml-2 text-xl font-semibold text-gray-800">Gestionale Strumenti</span> -->
						</div>
					</RouterLink>

					<!-- Pulsanti e profilo utente -->
					<div class="flex items-center">
						<button class="p-2 rounded-full text-whitefocus:outline-none focus:ring-2 focus:ring-blue-500">
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
										class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-primary font-semibold">
										<svg class="h-5 w-5" fill="currentColor" height="200px" width="200px" version="1.1" id="Layer_1"
											xmlns="http://www.w3.org/2000/svg"
											xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"
											enable-background="new 0 0 512 512" xml:space="preserve">
											<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
											<g id="SVGRepo_tracerCarrier" stroke-linecap="round"
												stroke-linejoin="round"></g>
											<g id="SVGRepo_iconCarrier">
												<path
													d="M448,362.7l-117.3-21.3C320,320,320,310.7,320,298.7c10.7-10.7,32-21.3,32-32c10.7-32,10.7-53.3,10.7-53.3 c5.5-8,21.3-21.3,21.3-42.7s-21.3-42.7-21.3-53.3C362.7,32,319.2,0,256,0c-60.5,0-106.7,32-106.7,117.3c0,10.7-21.3,32-21.3,53.3 s15.2,35.4,21.3,42.7c0,0,0,21.3,10.7,53.3c0,10.7,21.3,21.3,32,32c0,10.7,0,21.3-10.7,42.7L64,362.7C21.3,373.3,0,448,0,512h512 C512,448,490.7,373.3,448,362.7z">
												</path>
											</g>
										</svg>
									</div>
								</button>
								<div @click="toggleDropdown" class="ml-2 hidden md:block cursor-pointer">
									<div class="text-sm font-medium text-white">{{ user?.email }}</div>
									<div class="text-xs text-gray-400">Esci</div>
								</div>
							</div>
							<!-- creo un dropdown menu per il logout adattato come stile-->
							<div v-if="isDropdownOpen"
								class="fixed inset-0 z-50 flex items-center justify-center bg-primary/50 backdrop-blur-2xl">
								<div class="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
									<h2 class="text-lg font-semibold text-primary mb-4">Sei sicuro di voler uscire?
									</h2>
									<div class="flex justify-center gap-4">
										<button @click="signOut" class="btn_base">
											Esci
										</button>
										<button @click="isDropdownOpen = false" class="btn_base">
											Annulla
										</button>
									</div>
								</div>
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
import { useAuth } from '@/composables/useAuth'

const { user } = useAuth() // 🔁 questo è il vero utente attuale, reattivo

const router = useRouter()

const isDropdownOpen = ref(false)
const dropdown = ref(null)

const toggleDropdown = () => {
	isDropdownOpen.value = !isDropdownOpen.value
}

const handleClickOutside = (event) => {
	if (dropdown.value && !dropdown.value.contains(event.target)) {
		isDropdownOpen.value = false
	}
}

const signOut = () => {
	auth.signOut()
		.then(() => {
			router.push('/login')
		})
		.catch((error) => {
			console.error('Errore durante il logout:', error)
		})
		.finally(() => {
			isDropdownOpen.value = false
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