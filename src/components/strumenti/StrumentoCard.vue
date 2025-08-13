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
								strumento.stato === 'manutenzione' ? 'bg-yellow-100 text-yellow-700' :
									strumento.stato === 'assegnato' ? 'bg-blue-100 text-blue-700' :
										'bg-gray-100 text-gray-700'
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
						<svg v-else-if="strumento.stato === 'assegnato'" xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
						</svg>
						<svg v-else-if="strumento.stato === 'manutenzione'" xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
						</svg>
					</div>
				</div>

				<!-- Dettagli strumento -->
				<div class="flex-1">
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
								{{ isScaduto ? 'Scaduto il' : 'Scadenza' }}: {{ formatData(strumento.dataScadenza) }}
							</span>
						</div>
					</div>

					<!-- Info operatore assegnato -->
					<div v-if="operatoreAssegnato" class="mt-3 p-3 bg-blue-50 rounded-lg">
						<div class="flex items-center">
							<svg class="h-5 w-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
									clip-rule="evenodd" />
							</svg>
							<div>
								<p class="text-sm font-medium text-blue-900">
									Assegnato a: {{ operatoreAssegnato.nome }} {{ operatoreAssegnato.cognome }}
								</p>
								<p class="text-xs text-blue-700">
									{{ operatoreAssegnato.ruolo }}
									<span v-if="strumento.dataAssegnazione">
										• Dal {{ formatData(strumento.dataAssegnazione) }}
									</span>
								</p>
							</div>
						</div>

						<!-- Quick actions per l'assegnazione -->
						<div class="mt-2 flex space-x-2">
							<button @click="$emit('libera', strumento.id)"
								class="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200">
								<svg class="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M8 11V7a3 3 0 116 0m-3 7h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
								</svg>
								Libera
							</button>
							<button @click="$emit('trasferisci', strumento.id)"
								class="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200">
								<svg class="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
								</svg>
								Trasferisci
							</button>
						</div>
					</div>

					<div class="mt-2">
						<span :class="[
							'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
							isScaduto ? 'bg-red-100 text-red-800' :
								strumento.stato === 'disponibile' ? 'bg-green-100 text-green-800' :
									strumento.stato === 'assegnato' ? 'bg-blue-100 text-blue-800' :
										strumento.stato === 'manutenzione' ? 'bg-yellow-100 text-yellow-800' :
											'bg-gray-100 text-gray-800'
						]">
							{{ statoLabel }}
						</span>
					</div>

					<!-- Note se presenti -->
					<div v-if="strumento.note" class="mt-2">
						<p class="text-sm text-gray-600 italic">
							<svg class="inline h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd"
									d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
									clip-rule="evenodd" />
							</svg>
							{{ strumento.note }}
						</p>
					</div>
				</div>
			</div>

			<!-- Azioni -->
			<div class="mt-4 sm:mt-0 flex-shrink-0 flex items-center">
				<!-- Azioni veloci per assegnazione (se disponibile) -->
				<div v-if="strumento.stato === 'disponibile'" class="mr-2">
					<button @click="$emit('assegna', strumento.id)" type="button"
						class="inline-flex items-center px-3 py-2 border border-green-300 shadow-sm text-sm leading-4 font-medium rounded-md text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
							stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
						</svg>
						Assegna
					</button>
				</div>

				<div class="mr-2">
					<button @click="$emit('modifica', strumento)" type="button"
						class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
							stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
						</svg>
						Modifica
					</button>
				</div>
				<div>
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
	</div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useOperatori } from '@/composables/useOperatori'

const props = defineProps({
	strumento: {
		type: Object,
		required: true
	}
})

const { operatori, getOperatori } = useOperatori()

// Computed per controllare se lo strumento è scaduto
const isScaduto = computed(() => {
	const oggi = new Date()
	const scadenza = new Date(props.strumento.dataScadenza.seconds * 1000)
	return scadenza < oggi
})

// Computed per l'etichetta dello stato
const statoLabel = computed(() => {
	const stati = {
		'disponibile': 'Disponibile',
		'assegnato': 'Assegnato',
		'manutenzione': 'In Manutenzione'
	}

	if (isScaduto.value) {
		return 'Scaduto'
	}

	return stati[props.strumento.stato] || 'N/D'
})

// Computed per operatore assegnato
const operatoreAssegnato = computed(() => {
	if (!props.strumento.operatoreAssegnato) return null
	return operatori.value.find(op => op.id === props.strumento.operatoreAssegnato)
})

// Funzione per formattare la data
const formatData = (dataString) => {
	if (!dataString) return 'N/D'

	const data = new Date(dataString.seconds * 1000)

	return data.toLocaleDateString('it-IT', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	})
}

// Definizione degli eventi emessi dal componente
defineEmits(['modifica', 'elimina', 'assegna', 'libera', 'trasferisci'])

onMounted(async () => {
	await getOperatori()
})
</script>