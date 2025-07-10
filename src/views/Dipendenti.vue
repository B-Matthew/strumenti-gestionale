<template>
	<div class="min-h-screen bg-gray-200">
		<!-- Main Content -->
		<div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
			<!-- Intestazione pagina -->
			<div class="px-4 py-6 sm:px-0 mb-6">
				<div class="rounded-2xl shadow-md bg-primary overflow-hidden relative">
					<div class="px-6 py-8 md:px-10 md:py-10 text-white">
						<h1 class="text-3xl font-bold tracking-tight">
							Gestione Strumenti
						</h1>
						<p class="mt-2 max-w-2xl text-blue-100">
							Gestisci facilmente i tuoi strumenti con funzionalità di aggiunta, modifica ed eliminazione.
						</p>
						<div class="mt-6">
							<button @click="showForm = true" class="btn_base_v2">
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
				</div>
			</div>

			<StatoStrumentiBlock />

			<!-- Lista strumenti con le card -->
			<div class="px-4 sm:px-0">
				<div class="bg-white shadow rounded-lg overflow-hidden">
					<div class="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
						<h3 class="text-lg leading-6 font-medium text-gray-900">
							Elenco Strumenti
						</h3>
						<div class="flex space-x-2">
							<input type="text" placeholder="Cerca strumento..." v-model="filtri.ricerca"
								class="text-gray-900 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2">
							<select v-model="filtri.stato"
								class="text-gray-900 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md">
								<option value="" selected>Tutti gli stati</option>
								<option value="disponibile">Disponibile</option>
								<option value="prestito">Prestito</option>
								<option value="manutenzione">In Manutenzione</option>
							</select>
						</div>
					</div>
					<div class="divide-y divide-gray-200">
						<StrumentoCard v-for="s in strumentiFiltrati" :key="s.id" :strumento="s" @modifica="onModifica"
							@elimina="onElimina" />

						<!-- Esempio vuoto se non ci sono strumenti -->
						<div v-if="strumentiFiltrati.length === 0" class="py-10 text-center text-gray-500">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none"
								viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
							</svg>
							<p class="mt-2">{{ filtri.ricerca || filtri.stato ? 'Nessuno strumento trovato con i filtri attuali' : 'Nessuno strumento trovato' }}</p>
							<button @click="showForm = true"
								class="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
								{{ filtri.ricerca || filtri.stato ? 'Aggiungi strumento' : 'Aggiungi il primo strumento'
								}}
							</button>
						</div>
					</div>
					<!-- <div v-if="strumentiFiltrati.length > 0"
						class="px-4 py-4 border-t border-gray-200 sm:px-6 flex justify-between items-center">
						<div class="text-sm text-gray-700">
							Visualizzazione di <span class="font-medium">{{ strumentiFiltrati.length }}</span> strumenti
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
	<StrumentoForm v-if="showForm" :iniziali="strumentoSelezionato" @salvato="gestisciSalvataggio"
		@annulla="chiudiForm" />

	<!-- Modal di conferma eliminazione -->
	<div v-if="mostraConfermaEliminazione"
		class="fixed inset-0 bg-gradient-to-br from-primary to-green bg-opacity-75 flex items-center justify-center z-50">
		<div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-auto p-6">
			<div class="flex items-center">
				<div class="flex-shrink-0">
					<svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
						stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
					</svg>
				</div>
				<div class="ml-3">
					<h3 class="text-lg font-medium text-gray-900">Conferma eliminazione</h3>
					<p class="mt-2 text-sm text-gray-500">
						Sei sicuro di voler eliminare lo strumento "{{ strumentoDaEliminare?.nome }}"?
						Questa azione non può essere annullata.
					</p>
				</div>
			</div>
			<div class="mt-5 flex justify-end space-x-3">
				<button @click="mostraConfermaEliminazione = false"
					class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
					Annulla
				</button>
				<button @click="confermaEliminazione"
					class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700">
					Elimina
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStrumenti } from '@/composables/useStrumenti'
import StrumentoCard from '@/components/strumenti/StrumentoCard.vue'
import StrumentoForm from '@/components/strumenti/StrumentoForm.vue'
import StatoStrumentiBlock from '@/components/strumenti/StatoStrumentiBlock.vue'

const { strumenti, getStrumenti, eliminaStrumento } = useStrumenti()

// Stato del componente
const showForm = ref(false)
const strumentoSelezionato = ref(null)
const mostraConfermaEliminazione = ref(false)
const strumentoDaEliminare = ref(null)

// Filtri
const filtri = ref({
	ricerca: '',
	stato: ''
})

// Computed per filtrare gli strumenti
const strumentiFiltrati = computed(() => {
	let risultato = [...strumenti.value]

	// Filtro ricerca
	if (filtri.value.ricerca) {
		const ricerca = filtri.value.ricerca.toLowerCase()
		risultato = risultato.filter(s =>
			s.nome.toLowerCase().includes(ricerca) ||
			s.codice.toLowerCase().includes(ricerca)
		)
	}

	// Filtro stato
	if (filtri.value.stato) {
		risultato = risultato.filter(s => s.stato === filtri.value.stato)
	}

	return risultato
})

// Gestione delle azioni
const onModifica = (strumento) => {
	strumentoSelezionato.value = { ...strumento }
	showForm.value = true
}

const onElimina = (strumentoId) => {
	const strumento = strumenti.value.find(s => s.id === strumentoId)
	if (strumento) {
		strumentoDaEliminare.value = strumento
		mostraConfermaEliminazione.value = true
	}
}

const confermaEliminazione = async () => {
	if (strumentoDaEliminare.value) {
		await eliminaStrumento(strumentoDaEliminare.value.id)
		mostraConfermaEliminazione.value = false
		strumentoDaEliminare.value = null
		// Ricarica la lista
		await getStrumenti()
	}
}

const gestisciSalvataggio = async () => {
	// Aggiorna la lista degli strumenti
	await getStrumenti()
	chiudiForm()
}

const chiudiForm = () => {
	showForm.value = false
	strumentoSelezionato.value = null
}

onMounted(async () => {
	await getStrumenti()
})
</script>

<style scoped>
/* Eventuali stili specifici possono essere aggiunti qui */
</style>