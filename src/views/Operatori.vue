<template>
	<div class="min-h-screen bg-gray-200">
		<!-- Main Content -->
		<div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
			<!-- Intestazione pagina -->
			<div class="px-4 py-6 sm:px-0 mb-6">
				<div class="rounded-2xl shadow-md bg-primary overflow-hidden relative">
					<div class="px-6 py-8 md:px-10 md:py-10 text-white">
						<h1 class="text-3xl font-bold tracking-tight">
							Gestione Operatori
						</h1>
						<p class="mt-2 max-w-2xl text-blue-100">
							Gestisci facilmente i tuoi operatori con funzionalità di aggiunta, modifica ed eliminazione.
						</p>
						<div class="mt-6">
							<button @click="showForm = true" class="btn_base_v2">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20"
									fill="currentColor">
									<path fill-rule="evenodd"
										d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
										clip-rule="evenodd" />
								</svg>
								Aggiungi Operatore
							</button>
						</div>
					</div>
				</div>
			</div>

			<!-- Lista operatori con le card -->
			<div class="px-4 sm:px-0">
				<div class="bg-white shadow rounded-lg overflow-hidden">
					<div class="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
						<h3 class="text-lg leading-6 font-medium text-gray-900">
							Elenco Operatori
						</h3>
						<div class="flex space-x-2">
							<input type="text" placeholder="Cerca operatore..." v-model="filtri.ricerca"
								class="text-gray-900 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2">
						</div>
					</div>
					<div class="divide-y divide-gray-200">
						<OperatoreCard v-for="o in operatoriFiltrati" :key="o.id" :operatore="o" @modifica="onModifica" @elimina="onElimina" />

						<!-- Nessun risultato -->
						<div v-if="operatoriFiltrati.length === 0" class="py-10 text-center text-gray-500">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none"
								viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
							</svg>
							<p class="mt-2">
								{{ filtri.ricerca ? 'Nessun operatore trovato con i filtri attuali' : 'Nessun operatore presente' }}
							</p>
							<button @click="showForm = true"
								class="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
								{{ filtri.ricerca ? 'Aggiungi operatore' : 'Aggiungi il primo operatore' }}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Form modale -->
	<OperatoreForm v-if="showForm" :iniziali="operatoreSelezionato" @salvato="gestisciSalvataggio"
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
						Sei sicuro di voler eliminare l'operatore "{{ operatoreDaEliminare?.nome }}"?
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
import { useOperatori } from '@/composables/useOperatori' // ← da creare a parte
import OperatoreCard from '@/components/operatori/OperatoreCard.vue'
import OperatoreForm from '@/components/operatori/OperatoreForm.vue'

const { operatori, getOperatori, eliminaOperatore } = useOperatori()

const showForm = ref(false)
const operatoreSelezionato = ref(null)
const mostraConfermaEliminazione = ref(false)
const operatoreDaEliminare = ref(null)

const filtri = ref({
	ricerca: ''
})

const operatoriFiltrati = computed(() => {
	let risultato = [...operatori.value]
	if (filtri.value.ricerca) {
		const ricerca = filtri.value.ricerca.toLowerCase()
		risultato = risultato.filter(o =>
			o.nome?.toLowerCase().includes(ricerca) ||
			o.email?.toLowerCase().includes(ricerca)
		)
	}
	return risultato
})

const onModifica = (operatore) => {
	operatoreSelezionato.value = { ...operatore }
	showForm.value = true
}

const onElimina = (id) => {
	const trovato = operatori.value.find(o => o.id === id)
	if (trovato) {
		operatoreDaEliminare.value = trovato
		mostraConfermaEliminazione.value = true
	}
}

const confermaEliminazione = async () => {
	if (operatoreDaEliminare.value) {
		await eliminaOperatore(operatoreDaEliminare.value.id)
		mostraConfermaEliminazione.value = false
		operatoreDaEliminare.value = null
		await getOperatori()
	}
}

const gestisciSalvataggio = async () => {
	await getOperatori()
	chiudiForm()
}

const chiudiForm = () => {
	showForm.value = false
	operatoreSelezionato.value = null
}

onMounted(async () => {
	await getOperatori()
})
</script>

<style scoped>
/* Stili opzionali */
</style>
