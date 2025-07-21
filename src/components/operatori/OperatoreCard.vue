<template>
	<div class="border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors">
		<div class="p-6 flex flex-col sm:flex-row justify-between">
			<!-- Info Operatore -->
			<div class="flex items-start space-x-4">
				<!-- Avatar placeholder -->
				<div class="flex-shrink-0">
					<div
						class="h-12 w-12 rounded-full bg-green text-primary flex items-center justify-center font-semibold">
						{{ inizialiOperatore }}
					</div>
				</div>

				<!-- Dettagli -->
				<div class="flex-1">
					<h2 class="text-lg font-medium text-gray-900">{{ operatore.nome }} {{ operatore.cognome }}</h2>
					<div class="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:space-x-6">
						<div class="mt-2 flex items-center text-sm text-gray-500">
							<svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
								<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
								<g id="SVGRepo_iconCarrier">
									<path
										d="M21 8L17.4392 9.97822C15.454 11.0811 14.4614 11.6326 13.4102 11.8488C12.4798 12.0401 11.5202 12.0401 10.5898 11.8488C9.53864 11.6326 8.54603 11.0811 6.5608 9.97822L3 8M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z"
										stroke="currentColor" stroke-width="2" stroke-linecap="round"
										stroke-linejoin="round"></path>
								</g>
							</svg>
							Email: {{ operatore.email }}
						</div>
						<div class="mt-2 flex items-center text-sm text-gray-500">
							<svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
								<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
								<g id="SVGRepo_iconCarrier">
									<path
										d="M9 7H5C3.89543 7 3 7.89543 3 9V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V9C21 7.89543 20.1046 7 19 7H15M9 7V5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7M9 7H15"
										stroke="currentColor" stroke-width="2" stroke-linecap="round"
										stroke-linejoin="round"></path>
								</g>
							</svg>
							Ruolo: {{ operatore.ruolo || 'N/D' }}
						</div>
					</div>

					<!-- Statistiche strumenti -->
					<div class="mt-3 flex items-center space-x-4">
						<div class="flex items-center text-sm">
							<div class="h-3 w-3 bg-blue-500 rounded-full mr-2"></div>
							<span class="text-gray-600">Strumenti assegnati: </span>
							<span class="font-medium text-blue-600 ml-1">{{ strumentiAssegnati.length }}</span>
						</div>
						<div v-if="strumentiScaduti.length > 0" class="flex items-center text-sm">
							<div class="h-3 w-3 bg-red-500 rounded-full mr-2"></div>
							<span class="text-gray-600">Scaduti: </span>
							<span class="font-medium text-red-600 ml-1">{{ strumentiScaduti.length }}</span>
						</div>
					</div>

					<!-- Lista strumenti assegnati -->
					<div v-if="strumentiAssegnati.length > 0" class="mt-4">
						<div class="flex items-center justify-between mb-2">
							<h4 class="text-sm font-medium text-gray-700">Strumenti in uso:</h4>
							<button @click="toggleStrumenti" class="text-sm text-blue-600 hover:text-blue-800">
								{{ mostraStrumenti ? 'Nascondi' : 'Mostra' }}
							</button>
						</div>

						<div v-show="mostraStrumenti" class="space-y-2">
							<div v-for="strumento in strumentiAssegnati" :key="strumento.id"
								class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
								<div class="flex-1">
									<p class="text-sm font-medium text-gray-900">{{ strumento.nome }}</p>
									<p class="text-xs text-gray-500">
										{{ strumento.codice }} •
										<span :class="{ 'text-red-600 font-medium': isScaduto(strumento) }">
											{{ isScaduto(strumento) ? 'Scaduto' : 'Scade' }} il {{
												formatData(strumento.dataScadenza) }}
										</span>
									</p>
								</div>
								<div class="flex space-x-2">
									<button @click="$emit('libera-strumento', strumento.id)"
										class="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
										Libera
									</button>
									<button @click="$emit('trasferisci-strumento', strumento.id)"
										class="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
										Trasferisci
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Azioni -->
			<div class="mt-4 sm:mt-0 flex-shrink-0 flex">
				<button @click="$emit('assegna-strumento', operatore.id)" type="button"
					class="mr-2 inline-flex items-center px-3 py-2 border border-green-300 shadow-sm text-sm font-medium rounded-md text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
						stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
					</svg>
					Assegna Strumento
				</button>

				<button @click="$emit('modifica', operatore)" type="button"
					class="mr-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
						stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
					</svg>
					Modifica
				</button>
				<button @click="$emit('elimina', operatore.id)" type="button"
					class="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
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
import { computed, ref, onMounted } from 'vue'
import { useAssegnazioni } from '@/composables/useAssegnazioni'
import { useStrumenti } from '@/composables/useStrumenti'

const props = defineProps({
	operatore: {
		type: Object,
		required: true
	}
})

const { getStrumentiOperatore } = useAssegnazioni()
const { strumenti, getStrumenti } = useStrumenti()

const mostraStrumenti = ref(false)

const inizialiOperatore = computed(() => {
	const nome = props.operatore.nome || ''
	const cognome = props.operatore.cognome || ''
	return (nome.charAt(0) + cognome.charAt(0)).toUpperCase()
})

// Computed per strumenti assegnati a questo operatore
const strumentiAssegnati = computed(() => {

	const strumentiDelOperatore = strumenti.value.filter(strumento => {
		return strumento.operatoreAssegnato === props.operatore.id;
	});

	return strumentiDelOperatore;
})

// Computed per strumenti scaduti
const strumentiScaduti = computed(() => {
	return strumentiAssegnati.value.filter(strumento => isScaduto(strumento))
})

// Funzioni utility
const toggleStrumenti = () => {
	mostraStrumenti.value = !mostraStrumenti.value
}

const isScaduto = (strumento) => {
	const oggi = new Date()
	const scadenza = new Date(strumento.dataScadenza.seconds * 1000)
	return scadenza < oggi
}

const formatData = (dataString) => {
	if (!dataString) return 'N/D'
	const data = new Date(dataString.seconds * 1000)
	return data.toLocaleDateString('it-IT', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	})
}

// Assicurati che i dati siano caricati
onMounted(async () => {
	await getStrumenti();
})

defineEmits([
	'modifica',
	'elimina',
	'assegna-strumento',
	'libera-strumento',
	'trasferisci-strumento'
])
</script>