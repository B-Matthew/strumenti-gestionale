<template>
	<div class="min-h-screen bg-gray-200">
		<!-- Main Content -->
		<div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
			<!-- Welcome card -->
			<div class="px-4 py-6 sm:px-0 mb-6">
				<div class="rounded-2xl shadow-md bg-primary overflow-hidden">
					<div class="px-6 py-8 md:px-10 md:py-10 text-white">
						<h1 class="text-3xl font-bold tracking-tight">
							Benvenuto nel Gestionale Strumenti
						</h1>
						<p class="mt-2 max-w-2xl text-blue-100">
							Accesso effettuato con successo. Gestisci facilmente i tuoi strumenti e risorse con il
							nostro sistema.
						</p>
						<div class="mt-6">
							<button class="btn_base_v2">
								Inizia subito
							</button>
						</div>
					</div>
					<div class="absolute right-0 bottom-0 opacity-10">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-64 w-64 text-white" fill="none"
							viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
								d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
						</svg>
					</div>
				</div>
			</div>

			<StatoStrumentiBlock />

			<!-- Recent Activity & Quick Access -->
			<div class="px-4 sm:px-0">
				<div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
					<!-- Recent Activity -->
					<div class="lg:col-span-2">
						<div class="bg-white shadow rounded-lg">
							<div class="px-4 py-5 border-b border-gray-200 sm:px-6">
								<h3 class="text-lg leading-6 font-medium text-gray-900">
									Attività Recenti
								</h3>
							</div>
							<div class="px-4 py-3 sm:px-6">
								<ul class="divide-y divide-gray-200">
									<li class="py-4">
										<div class="flex space-x-3">
											<div class="flex-shrink-0">
												<div
													class="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
													<span class="text-indigo-600 font-medium">MR</span>
												</div>
											</div>
											<div class="min-w-0 flex-1">
												<p class="text-sm font-medium text-gray-900">
													<a href="#" class="hover:underline">Mario Rossi</a>
												</p>
												<p class="text-sm text-gray-500">
													Ha preso in prestito <span class="font-medium">Trapano a
														percussione</span>
												</p>
												<p class="text-xs text-gray-400 mt-1">2 ore fa</p>
											</div>
										</div>
									</li>
									<li class="py-4">
										<div class="flex space-x-3">
											<div class="flex-shrink-0">
												<div
													class="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
													<span class="text-green-600 font-medium">LB</span>
												</div>
											</div>
											<div class="min-w-0 flex-1">
												<p class="text-sm font-medium text-gray-900">
													<a href="#" class="hover:underline">Luigi Bianchi</a>
												</p>
												<p class="text-sm text-gray-500">
													Ha restituito <span class="font-medium">Sega circolare</span>
												</p>
												<p class="text-xs text-gray-400 mt-1">Ieri alle 14:30</p>
											</div>
										</div>
									</li>
									<li class="py-4">
										<div class="flex space-x-3">
											<div class="flex-shrink-0">
												<div
													class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
													<span class="text-blue-600 font-medium">GV</span>
												</div>
											</div>
											<div class="min-w-0 flex-1">
												<p class="text-sm font-medium text-gray-900">
													<a href="#" class="hover:underline">Giulia Verdi</a>
												</p>
												<p class="text-sm text-gray-500">
													Ha aggiunto <span class="font-medium">3 nuovi strumenti</span>
													all'inventario
												</p>
												<p class="text-xs text-gray-400 mt-1">2 giorni fa</p>
											</div>
										</div>
									</li>
								</ul>
							</div>
							<div class="px-4 py-4 border-t border-gray-200 sm:px-6">
								<a href="#" class="text-sm font-medium text-blue-600 hover:text-blue-500">Visualizza
									tutte le attività</a>
							</div>
						</div>
					</div>

					<!-- Quick Access -->
					<div class="lg:col-span-1">
						<div class="bg-white shadow rounded-lg">
							<div class="px-4 py-5 border-b border-gray-200 sm:px-6">
								<h3 class="text-lg leading-6 font-medium text-gray-900">
									Accesso Rapido
								</h3>
							</div>
							<div class="p-4">
								<div class="grid grid-cols-2 gap-4">
									<button
										class="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors">
										<div
											class="h-8 w-8 bg-blue-100 text-blue-600 rounded-md flex items-center justify-center mb-2">
											<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
												fill="currentColor">
												<path fill-rule="evenodd"
													d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
													clip-rule="evenodd" />
											</svg>
										</div>
										<span class="text-sm text-gray-700">Nuovo Prestito</span>
									</button>
									<button
										class="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors">
										<div
											class="h-8 w-8 bg-green-100 text-green-600 rounded-md flex items-center justify-center mb-2">
											<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
												fill="currentColor">
												<path fill-rule="evenodd"
													d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
													clip-rule="evenodd" />
											</svg>
										</div>
										<span class="text-sm text-gray-700">Restituzione</span>
									</button>
									<button
										class="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors">
										<div
											class="h-8 w-8 bg-indigo-100 text-indigo-600 rounded-md flex items-center justify-center mb-2">
											<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
												fill="currentColor">
												<path
													d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
											</svg>
										</div>
										<span class="text-sm text-gray-700">Inventario</span>
									</button>
									<button
										class="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors">
										<div
											class="h-8 w-8 bg-yellow-100 text-yellow-600 rounded-md flex items-center justify-center mb-2">
											<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
												fill="currentColor">
												<path fill-rule="evenodd"
													d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
													clip-rule="evenodd" />
											</svg>
										</div>
										<span class="text-sm text-gray-700">Report</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
// Per ora mantenuto vuoto, pronto per l'aggiunta di logica
import StatoStrumentiBlock from '@/components/strumenti/StatoStrumentiBlock.vue';

</script>

<style scoped>
/* Eventuali stili specifici possono essere aggiunti qui */
</style>