<template>
	<div class="border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors">
		<div class="p-6 flex flex-col sm:flex-row justify-between">
			<!-- Informazioni sullo strumento -->
			<div class="flex items-start space-x-4">
				<!-- Status indicator -->
				<div class="flex-shrink-0">
					<div :class="[
						'h-12 w-12 rounded-full flex items-center justify-center',
						isScaduto ? 'bg-red-100 text-red-700' :
							strumento.stato === 'disponibile' ? 'bg-green-100 text-green-700' :
								strumento.stato === 'prestito' ? 'bg-orange-100 text-orange-700' :
									'bg-blue-100 text-blue-700'
					]">
						<svg v-if="isScaduto" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
							viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<svg v-else-if="strumento.stato === 'disponibile'" xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<svg v-else-if="strumento.stato === 'prestito'" xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
						</svg>
						<svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
							stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
						</svg>
					</div>
				</div>

				<!-- Dettagli strumento -->
				<div>
					<h2 class="text-lg font-medium text-gray-900">{{ strumento.nome }}</h2>
					<div class="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:space-x-6">
						<div class="mt-2 flex items-center text-sm text-gray-500">
							<svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd"
									d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
									clip-rule="evenodd" />
							</svg>
							Codice: {{ strumento.codice }}
						</div>
						<div class="mt-2 flex items-center text-sm text-gray-500">
							<svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd"
									d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
									clip-rule="evenodd" />
							</svg>
							<span :class="{ 'text-red-600 font-medium': isScaduto }">
								Scadenza: {{ formatData(strumento.dataScadenza) }}
								<span v-if="isScaduto" class="ml-1 text-red-600">(Scaduto)</span>
							</span>
						</div>
					</div>
					<div class="mt-2">
						<span :class="[
							'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
							isScaduto ? 'bg-red-100 text-red-800' :
								strumento.stato === 'disponibile' ? 'bg-green-100 text-green-800' :
									strumento.stato === 'prestito' ? 'bg-yellow-100 text-yellow-800' :
										'bg-red-100 text-red-800'
						]">
							{{ statoLabel }}
						</span>
					</div>
				</div>
			</div>

			<!-- Azioni -->
			<div class="mt-4 sm:mt-0 flex-shrink-0 flex">
				<button @click="$emit('modifica', strumento)" type="button"
					class="mr-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
						stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
					</svg>
					Modifica
				</button>
				<button @click="$emit('elimina', strumento.id)" type="button"
					class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
						stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
					</svg>
					Elimina
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
	strumento: {
		type: Object,
		required: true
	}
})

// Computed per controllare se lo strumento è scaduto
const isScaduto = computed(() => {
	const oggi = new Date()
	const scadenza = new Date(props.strumento.dataScadenza)
	return scadenza < oggi
})

// Computed per l'etichetta dello stato
const statoLabel = computed(() => {
	if (isScaduto.value) return 'Scaduto'

	const stati = {
		'disponibile': 'Disponibile',
		'prestito': 'In Prestito',
		'manutenzione': 'In Manutenzione'
	}

	return stati[props.strumento.stato] || 'N/D'
})

// Funzione per formattare la data
const formatData = (dataString) => {
	if (!dataString) return 'N/D'

	const data = new Date(dataString)
	return data.toLocaleDateString('it-IT', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	})
}

// Definizione degli eventi emessi dal componente
defineEmits(['modifica', 'elimina'])
</script>