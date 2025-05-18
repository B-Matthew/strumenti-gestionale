<template>
	<Header />
	<div class="min-h-screen bg-gray-50">
		<!-- Main Content -->
		<div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
			<!-- Intestazione pagina -->
			<div class="px-4 py-6 sm:px-0 mb-6">
				<div
					class="rounded-2xl shadow-md bg-gradient-to-r from-blue-500 to-indigo-600 overflow-hidden relative">
					<div class="px-6 py-8 md:px-10 md:py-10 text-white">
						<h1 class="text-3xl font-bold tracking-tight">
							Gestione Strumenti
						</h1>
						<p class="mt-2 max-w-2xl text-blue-100">
							Gestisci facilmente i tuoi strumenti con funzionalità di aggiunta, modifica ed eliminazione.
						</p>
						<div class="mt-6">
							<button @click="showForm = true"
								class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-indigo-700">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20"
									fill="currentColor">
									<path fill-rule="evenodd"
										d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
										clip-rule="evenodd" />
								</svg>
								Aggiungi Strumento
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

			<!-- Stats Section -->
			<div class="px-4 sm:px-0 mb-8">
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
					<!-- Stat 1 -->
					<div class="bg-white overflow-hidden shadow rounded-lg">
						<div class="px-4 py-5 sm:p-6">
							<div class="flex items-center">
								<div class="flex-shrink-0 bg-blue-500 rounded-md p-3">
									<svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
										viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
									</svg>
								</div>
								<div class="ml-5 w-0 flex-1">
									<dl>
										<dt class="text-sm font-medium text-gray-500 truncate">
											Totale Strumenti
										</dt>
										<dd>
											<div class="text-lg font-medium text-gray-900">
												{{ strumenti.length }}
											</div>
										</dd>
									</dl>
								</div>
							</div>
						</div>
					</div>

					<!-- Stat 2 -->
					<div class="bg-white overflow-hidden shadow rounded-lg">
						<div class="px-4 py-5 sm:p-6">
							<div class="flex items-center">
								<div class="flex-shrink-0 bg-green-500 rounded-md p-3">
									<svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
										viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
								</div>
								<div class="ml-5 w-0 flex-1">
									<dl>
										<dt class="text-sm font-medium text-gray-500 truncate">
											Disponibili
										</dt>
										<dd>
											<div class="text-lg font-medium text-gray-900">
												{{ strumentiDisponibili.length }}
											</div>
										</dd>
									</dl>
								</div>
							</div>
						</div>
					</div>

					<!-- Stat 3 -->
					<div class="bg-white overflow-hidden shadow rounded-lg">
						<div class="px-4 py-5 sm:p-6">
							<div class="flex items-center">
								<div class="flex-shrink-0 bg-orange-500 rounded-md p-3">
									<svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
										viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
									</svg>
								</div>
								<div class="ml-5 w-0 flex-1">
									<dl>
										<dt class="text-sm font-medium text-gray-500 truncate">
											Assegnato
										</dt>
										<dd>
											<div class="text-lg font-medium text-gray-900">
												{{ strumentiInAssegnato.length }}
											</div>
										</dd>
									</dl>
								</div>
							</div>
						</div>
					</div>

					<!-- Stat 4 -->
					<div class="bg-white overflow-hidden shadow rounded-lg">
						<div class="px-4 py-5 sm:p-6">
							<div class="flex items-center">
								<div class="flex-shrink-0 bg-red-500 rounded-md p-3">
									<svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
										viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
									</svg>
								</div>
								<div class="ml-5 w-0 flex-1">
									<dl>
										<dt class="text-sm font-medium text-gray-500 truncate">
											Manutenzione
										</dt>
										<dd>
											<div class="text-lg font-medium text-gray-900">
												{{ strumentiInManutenzione.length }}
											</div>
										</dd>
									</dl>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Lista strumenti con le card -->
			<div class="px-4 sm:px-0">
				<div class="bg-white shadow rounded-lg overflow-hidden">
					<div class="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
						<h3 class="text-lg leading-6 font-medium text-gray-900">
							Elenco Strumenti
						</h3>
						<div class="flex space-x-2">
							<input type="text" placeholder="Cerca strumento..."
								class="text-gray-900 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2">
							<select
								class="text-gray-900 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md">
								<option value="" selected>Tutti gli stati</option>
								<option value="disponibile">Disponibile</option>
								<option value="disponibile">Assegnato</option>
								<option value="manutenzione">In Manutenzione</option>
							</select>
						</div>
					</div>
					<div class="divide-y divide-gray-200">
						<StrumentoCard v-for="s in strumenti" :key="s.id" :strumento="s" @modifica="onModifica"
							@elimina="onElimina" />

						<!-- Esempio vuoto se non ci sono strumenti -->
						<div v-if="strumenti.length === 0" class="py-10 text-center text-gray-500">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none"
								viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
							</svg>
							<p class="mt-2">Nessuno strumento trovato</p>
							<button @click="showForm = true"
								class="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
								Aggiungi il primo strumento
							</button>
						</div>
					</div>
					<!-- <div v-if="strumenti.length > 0"
						class="px-4 py-4 border-t border-gray-200 sm:px-6 flex justify-between items-center">
						<div class="text-sm text-gray-700">
							Visualizzazione di <span class="font-medium">{{ strumenti.length }}</span> strumenti
						</div>
						<div class="flex space-x-2">
							<button
								class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
								Precedente
							</button>
							<button
								class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
								Successivo
							</button>
						</div>
					</div> -->
				</div>
			</div>
		</div>
	</div>

	<!-- Form modale per aggiungere/modificare strumenti -->
	<StrumentoForm v-if="showForm" :iniziali="strumentoSelezionato" @salvato="gestisciSalvataggio" @annulla="showForm = false" />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStrumenti } from '@/composables/useStrumenti'
import StrumentoCard from '@/components/strumenti/StrumentoCard.vue'
import Header from '@/components/Header.vue'
import StrumentoForm from '@/components/strumenti/StrumentoForm.vue'

const { strumenti, getStrumenti } = useStrumenti()
const showForm = ref(false)

// Computed properties per le statistiche
const strumentiDisponibili = computed(() => {
	return strumenti.value.filter(s => s.stato === 'disponibile')
})

const strumentiInAssegnato = computed(() => {
	return strumenti.value.filter(s => s.stato === 'assegnato')
})

const strumentiInManutenzione = computed(() => {
	return strumenti.value.filter(s => s.stato === 'manutenzione')
})

// Gestione delle azioni
const onModifica = (strumento) => {
	// Logica per modificare lo strumento
	console.log('Modifica strumento:', strumento)
	// Qui potresti anche impostare lo strumento selezionato e aprire il form
	showForm.value = true
}

const onElimina = (strumento) => {
	// Logica per eliminare lo strumento
	console.log('Elimina strumento:', strumento)
	// Qui potresti mostrare una conferma prima di eliminare
}

onMounted(async () => {
	await getStrumenti()
})
</script>

<style scoped>
/* Eventuali stili specifici possono essere aggiunti qui */
</style>