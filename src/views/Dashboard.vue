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
							<RouterLink to="/strumenti" class="btn_base_v2">
								Inizia subito
							</RouterLink>
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

			<!-- Recent Activity -->
			<div class="px-4 sm:px-0">
				<div class="bg-white shadow rounded-lg">
					<div class="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
						<h3 class="text-lg leading-6 font-medium text-gray-900">
							Attività Recenti
						</h3>
						<RouterLink to="/attivita" class="text-sm font-medium text-blue-600 hover:text-blue-500">
							Visualizza tutte →
						</RouterLink>
					</div>
					<div class="px-4 py-3 sm:px-6">
						<!-- Loading state -->
						<div v-if="loading" class="py-8 text-center">
							<svg class="animate-spin h-8 w-8 mx-auto text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
							<p class="mt-2 text-sm text-gray-500">Caricamento attività...</p>
						</div>

						<!-- Lista attività -->
						<ul v-else-if="attivita.length > 0" class="divide-y divide-gray-200">
							<AttivitaItem 
								v-for="attivitaItem in attivita" 
								:key="attivitaItem.id" 
								:attivita="attivitaItem"
							/>
						</ul>

						<!-- Nessuna attività -->
						<div v-else class="py-8 text-center text-gray-500">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
							</svg>
							<p>Nessuna attività recente</p>
							<p class="text-sm mt-1">Le attività del sistema appariranno qui</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import StatoStrumentiBlock from '@/components/strumenti/StatoStrumentiBlock.vue'
import AttivitaItem from '@/components/AttivitaItem.vue'
import { useAttivita } from '@/composables/useAttivita'

const { attivita, loading, getAttivitaRecenti } = useAttivita()

let unsubscribe = null

onMounted(() => {
	// Carica le ultime 5 attività in tempo reale
	unsubscribe = getAttivitaRecenti(5)
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
