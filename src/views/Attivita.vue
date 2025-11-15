<template>
	<div class="min-h-screen bg-gray-200">
		<!-- Main Content -->
		<div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
			<!-- Intestazione pagina -->
			<div class="px-4 py-6 sm:px-0 mb-6">
				<div class="rounded-2xl shadow-md bg-primary overflow-hidden relative">
					<div class="px-6 py-8 md:px-10 md:py-10 text-white">
						<h1 class="text-3xl font-bold tracking-tight">
							Registro Attività
						</h1>
						<p class="mt-2 max-w-2xl text-blue-100">
							Visualizza lo storico completo di tutte le operazioni effettuate nel sistema
						</p>
					</div>
				</div>
			</div>

			<!-- Filtri -->
			<div class="px-4 sm:px-0 mb-6">
				<div class="bg-white shadow rounded-lg p-4">
					<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
						<!-- Filtro per tipo -->
						<div>
							<label for="filtro-tipo" class="block text-sm font-medium text-gray-700 mb-1">
								Tipo Attività
							</label>
							<select 
								id="filtro-tipo" 
								v-model="filtroTipo"
								class="text-gray-900 shadow-sm block w-full sm:text-sm border-[1px] border-gray-300 rounded-md p-2"
							>
								<option value="">Tutte le attività</option>
								<optgroup label="Strumenti">
									<option value="strumento_aggiunto">Strumenti aggiunti</option>
									<option value="strumento_modificato">Strumenti modificati</option>
									<option value="strumento_eliminato">Strumenti eliminati</option>
									<option value="strumento_assegnato">Strumenti assegnati</option>
									<option value="strumento_liberato">Strumenti liberati</option>
									<option value="strumento_trasferito">Strumenti trasferiti</option>
								</optgroup>
								<optgroup label="Operatori">
									<option value="operatore_aggiunto">Operatori aggiunti</option>
									<option value="operatore_modificato">Operatori modificati</option>
									<option value="operatore_eliminato">Operatori eliminati</option>
								</optgroup>
							</select>
						</div>

						<!-- Ricerca -->
						<div class="md:col-span-2">
							<label for="ricerca" class="block text-sm font-medium text-gray-700 mb-1">
								Cerca
							</label>
							<input 
								id="ricerca"
								type="text" 
								v-model="ricerca" 
								placeholder="Cerca per descrizione o utente..."
								class="text-gray-900 shadow-sm block w-full sm:text-sm border-[1px] border-gray-300 rounded-md p-2"
							>
						</div>
					</div>
				</div>
			</div>

			<!-- Lista attività -->
			<div class="px-4 sm:px-0">
				<div class="bg-white shadow rounded-lg overflow-hidden">
					<div class="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
						<h3 class="text-lg leading-6 font-medium text-gray-900">
							Tutte le Attività
							<span v-if="attivitaFiltrate.length > 0" class="ml-2 text-sm text-gray-500">
								({{ attivitaFiltrate.length }})
							</span>
						</h3>
					</div>

					<div class="px-4 py-3 sm:px-6">
						<!-- Loading state -->
						<div v-if="loading" class="py-12 text-center">
							<svg class="animate-spin h-10 w-10 mx-auto text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
							<p class="mt-3 text-sm text-gray-500">Caricamento attività...</p>
						</div>

						<!-- Lista attività filtrate -->
						<ul v-else-if="attivitaFiltrate.length > 0" class="divide-y divide-gray-200">
							<AttivitaItem 
								v-for="attivitaItem in attivitaFiltrate" 
								:key="attivitaItem.id" 
								:attivita="attivitaItem"
								:mostra-tipo-badge="true"
							/>
						</ul>

						<!-- Nessuna attività trovata -->
						<div v-else class="py-12 text-center text-gray-500">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
							</svg>
							<p class="text-lg font-medium">
								{{ (filtroTipo || ricerca) ? 'Nessuna attività trovata' : 'Nessuna attività registrata' }}
							</p>
							<p class="text-sm mt-1">
								{{ (filtroTipo || ricerca) ? 'Prova a modificare i filtri di ricerca' : 'Le attività del sistema appariranno qui' }}
							</p>
							<button 
								v-if="filtroTipo || ricerca"
								@click="resetFiltri"
								class="mt-4 btn_base"
							>
								Reimposta filtri
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import AttivitaItem from '@/components/AttivitaItem.vue'
import { useAttivita } from '@/composables/useAttivita'

const { attivita, loading, getTutteAttivita } = useAttivita()

const filtroTipo = ref('')
const ricerca = ref('')

let unsubscribe = null

// Computed per attività filtrate
const attivitaFiltrate = computed(() => {
	let risultato = [...attivita.value]

	// Filtro per tipo
	if (filtroTipo.value) {
		risultato = risultato.filter(a => a.tipo === filtroTipo.value)
	}

	// Filtro per ricerca
	if (ricerca.value) {
		const searchTerm = ricerca.value.toLowerCase()
		risultato = risultato.filter(a => 
			a.descrizione?.toLowerCase().includes(searchTerm) ||
			a.userEmail?.toLowerCase().includes(searchTerm)
		)
	}

	return risultato
})

const resetFiltri = () => {
	filtroTipo.value = ''
	ricerca.value = ''
}

onMounted(() => {
	// Carica tutte le attività in tempo reale
	unsubscribe = getTutteAttivita()
})

onUnmounted(() => {
	// Cleanup del listener
	if (unsubscribe) {
		unsubscribe()
	}
})
</script>

<style scoped>
/* Eventuali stili specifici possono essere aggiunti qui */
</style>
