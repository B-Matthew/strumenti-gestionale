<template>
	<div
		class="fixed inset-0 bg-gradient-to-br from-primary to-green bg-opacity-75 flex items-center justify-center z-50">
		<div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-auto p-6">
			<div class="mb-5">
				<h3 class="text-lg font-medium text-gray-900">
					{{ modalType === 'assegna' ? 'Assegna Strumento' : 'Trasferisci Strumento' }}
				</h3>
				<p class="mt-1 text-sm text-gray-500">
					{{ modalType === 'assegna'
						? `Seleziona l'operatore a cui assegnare "${strumento?.nome}"`
						: `Seleziona il nuovo operatore per "${strumento?.nome}"`
					}}
				</p>
			</div>

			<!-- Info strumento -->
			<div class="mb-4 p-3 bg-gray-50 rounded-lg">
				<div class="flex items-center">
					<div class="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
						<svg class="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
						</svg>
					</div>
					<div class="ml-3">
						<p class="text-sm font-medium text-gray-900">{{ strumento?.nome }}</p>
						<p class="text-xs text-gray-500">Codice: {{ strumento?.codice }}</p>
					</div>
				</div>
			</div>

			<!-- Operatore attuale (per trasferimenti) -->
			<div v-if="modalType === 'trasferisci' && operatoreAttuale" class="mb-4 p-3 bg-blue-50 rounded-lg">
				<div class="flex items-center">
					<svg class="h-5 w-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
							clip-rule="evenodd" />
					</svg>
					<div>
						<p class="text-sm font-medium text-blue-900">
							Attualmente assegnato a: {{ operatoreAttuale.nome }} {{ operatoreAttuale.cognome }}
						</p>
						<p class="text-xs text-blue-700">{{ operatoreAttuale.ruolo }}</p>
					</div>
				</div>
			</div>

			<form @submit.prevent="handleSubmit" class="space-y-4">
				<!-- Selezione operatore -->
				<div>
					<label for="operatore" class="block text-sm font-medium text-gray-700">
						{{ modalType === 'assegna' ? 'Assegna a:' : 'Trasferisci a:' }}
					</label>
					<select id="operatore" v-model="operatoreSelezionato" required
						class="mt-1 h-10 p-2 text-gray shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full border border-gray-300 rounded-md">
						<option value="">Seleziona operatore...</option>
						<option v-for="operatore in operatoriDisponibili" :key="operatore.id" :value="operatore.id">
							{{ operatore.nome }} {{ operatore.cognome }} - {{ operatore.ruolo }}
						</option>
					</select>
				</div>

				<!-- Note opzionali -->
				<div>
					<label for="note" class="block text-sm font-medium text-gray-700">Note (opzionale)</label>
					<textarea id="note" v-model="note" rows="3" placeholder="Aggiungi note sull'assegnazione..."
						class="mt-1 p-2 text-gray shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full border border-gray-300 rounded-md"></textarea>
				</div>

				<!-- Azioni -->
				<div class="pt-4 flex justify-end space-x-3">
					<button type="button" @click="$emit('annulla')"
						class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
						Annulla
					</button>
					<button type="submit" :disabled="!operatoreSelezionato || loading" :class="[
						'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
						operatoreSelezionato && !loading ? 'bg-primary hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
					]">
						<svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
							xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
							<path class="opacity-75" fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
						</svg>
						{{ loading ? 'Salvando...' : (modalType === 'assegna' ? 'Assegna' : 'Trasferisci') }}
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useOperatori } from '@/composables/useOperatori'
import { useAssegnazioni } from '@/composables/useAssegnazioni'

const props = defineProps({
	strumento: {
		type: Object,
		required: true
	},
	modalType: {
		type: String,
		default: 'assegna', // 'assegna' | 'trasferisci'
		validator: (value) => ['assegna', 'trasferisci'].includes(value)
	}
})

const emit = defineEmits(['confermato', 'annulla'])

const { operatori, getOperatori } = useOperatori()
const { assegnaStrumento, trasferiscaStrumento } = useAssegnazioni()

const operatoreSelezionato = ref('')
const note = ref('')
const loading = ref(false)

// Operatore attuale (per trasferimenti)
const operatoreAttuale = computed(() => {
	if (!props.strumento.operatoreAssegnato) return null
	return operatori.value.find(op => op.id === props.strumento.operatoreAssegnato)
})

// Operatori disponibili (esclude quello attuale nei trasferimenti)
const operatoriDisponibili = computed(() => {
	if (props.modalType === 'trasferisci') {
		return operatori.value.filter(op => op.id !== props.strumento.operatoreAssegnato)
	}
	return operatori.value
})

const handleSubmit = async () => {
	if (!operatoreSelezionato.value) return

	loading.value = true

	try {
		if (props.modalType === 'assegna') {
			await assegnaStrumento(props.strumento.id, operatoreSelezionato.value)
		} else {
			await trasferiscaStrumento(props.strumento.id, operatoreSelezionato.value)
		}

		// Opzionalmente aggiorna le note dello strumento se fornite
		// (questo richiederà un'ulteriore chiamata a modificaStrumento se vuoi salvare le note)

		emit('confermato')
	} catch (error) {
		console.error('Errore durante l\'assegnazione:', error)
		// Qui potresti mostrare un messaggio di errore
	} finally {
		loading.value = false
	}
}

onMounted(async () => {
	await getOperatori()
})
</script>