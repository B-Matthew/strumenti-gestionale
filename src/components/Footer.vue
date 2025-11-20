<template>
	<footer class="fixed bottom-0 left-0 right-0 z-40 bg-primary border-t border-gray-200 shadow-md">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<nav class="flex justify-around items-center h-14 text-sm">
				<RouterLink to="/" class="flex flex-col items-center justify-center text-center"
					:class="{ 'text-white': isActiveRoute('/') }">
					<svg class="h-5 w-5 mb-1" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
						<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
						<g id="SVGRepo_iconCarrier">
							<path d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z"
								fill="currentColor"></path>
						</g>
					</svg>
					<span>Home</span>
				</RouterLink>
	
				<RouterLink to="/operatori" class="flex flex-col items-center justify-center text-center"
					:class="{ 'text-white': isActiveRoute('/operatori') }">
					<svg class="h-5 w-5 mb-1" fill="currentColor" version="1.1" id="Capa_1"
						xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
						viewBox="0 0 431.972 431.973" xml:space="preserve">
						<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
						<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
						<g id="SVGRepo_iconCarrier">
							<g>
								<g>
									<path
										d="M358.543,157.001l-0.044-0.136c-2.741-8.4-6.886-21.095-6.886-39.443C351.614,52.675,290.777,0,215.996,0 C141.216,0,80.378,52.674,80.378,117.421c0,18.342-4.14,31.036-6.873,39.416l-0.079,0.241c-0.482,1.475-0.252,3.09,0.623,4.372 c0.875,1.282,2.295,2.085,3.845,2.173h276.207c1.549-0.088,2.956-0.931,3.831-2.211 C358.807,160.132,359.025,158.476,358.543,157.001z">
									</path>
									<path
										d="M353.424,232.445c-2.066-0.494-4.989-0.86-7.119-1.129l-7.718-0.977l2.461-38.215c0.089-1.367-0.389-2.71-1.318-3.716 c-0.932-1.006-2.232-1.586-3.604-1.604H95.864c-1.37,0.019-2.672,0.599-3.603,1.604c-0.931,1.006-1.407,2.349-1.319,3.716 l2.462,38.215l-7.713,0.977c-2.134,0.27-5.057,0.637-7.124,1.129c-2.468,0.59-4.104,2.934-3.805,5.453 c0.133,1.127,0.392,2.408,0.767,3.812l14.185,46.146c0.366,1.098,1.385,1.771,2.417,2.217c3.731,1.613,6.586,5.844,8.04,11.91 c0.011,0.045,0.022,0.088,0.034,0.133c4.954,18.41,21.277,65.939,37.513,87.248c15.646,20.537,67.318,41.98,77.988,42.602 c0.097,0.006,0.193,0.008,0.29,0.008c0.097,0,0.194-0.002,0.291-0.008c10.669-0.619,62.342-22.064,77.988-42.602 c16.236-21.311,32.559-68.838,37.512-87.246c0.013-0.045,0.023-0.09,0.034-0.135c1.454-6.065,4.31-10.295,8.041-11.91 c1.031-0.446,2.079-1.103,2.416-2.217l14.185-46.146c0.375-1.401,0.634-2.683,0.768-3.812 C357.529,235.38,355.893,233.035,353.424,232.445z">
									</path>
								</g>
							</g>
						</g>
					</svg>
					<span>Operatori</span>
				</RouterLink>
				
	
				<RouterLink to="/strumenti" class="flex flex-col items-center justify-center text-center"
					:class="{ 'text-white': isActiveRoute('/strumenti') }">
					<svg class="h-5 w-5 mb-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
						<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
						<g id="SVGRepo_iconCarrier">
							<path
								d="M6 6L10.5 10.5M6 6H3L2 3L3 2L6 3V6ZM19.259 2.74101L16.6314 5.36863C16.2354 5.76465 16.0373 5.96265 15.9632 6.19098C15.8979 6.39183 15.8979 6.60817 15.9632 6.80902C16.0373 7.03735 16.2354 7.23535 16.6314 7.63137L16.8686 7.86863C17.2646 8.26465 17.4627 8.46265 17.691 8.53684C17.8918 8.6021 18.1082 8.6021 18.309 8.53684C18.5373 8.46265 18.7354 8.26465 19.1314 7.86863L21.5893 5.41072C21.854 6.05488 22 6.76039 22 7.5C22 10.5376 19.5376 13 16.5 13C16.1338 13 15.7759 12.9642 15.4298 12.8959C14.9436 12.8001 14.7005 12.7521 14.5532 12.7668C14.3965 12.7824 14.3193 12.8059 14.1805 12.8802C14.0499 12.9501 13.919 13.081 13.657 13.343L6.5 20.5C5.67157 21.3284 4.32843 21.3284 3.5 20.5C2.67157 19.6716 2.67157 18.3284 3.5 17.5L10.657 10.343C10.919 10.081 11.0499 9.95005 11.1198 9.81949C11.1941 9.68068 11.2176 9.60347 11.2332 9.44681C11.2479 9.29945 11.1999 9.05638 11.1041 8.57024C11.0358 8.22406 11 7.86621 11 7.5C11 4.46243 13.4624 2 16.5 2C17.5055 2 18.448 2.26982 19.259 2.74101ZM12.0001 14.9999L17.5 20.4999C18.3284 21.3283 19.6716 21.3283 20.5 20.4999C21.3284 19.6715 21.3284 18.3283 20.5 17.4999L15.9753 12.9753C15.655 12.945 15.3427 12.8872 15.0408 12.8043C14.6517 12.6975 14.2249 12.7751 13.9397 13.0603L12.0001 14.9999Z"
								stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							</path>
						</g>
					</svg>
					<span>Strumenti</span>
				</RouterLink>

				<RouterLink to="/attivita" class="flex flex-col items-center justify-center text-center"
					:class="{ 'text-white': isActiveRoute('/attivita') }">
					<svg class="h-5 w-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
						<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
						<g id="SVGRepo_iconCarrier">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
								d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
							</path>
						</g>
					</svg>
					<span>Attività</span>
				</RouterLink>
			</nav>
		</div>
	</footer>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const isActiveRoute = (path) => route.path === path
</script>

<style scoped>
.router-link-active {
	color: white;
	/* blue-600 */
}
</style>
