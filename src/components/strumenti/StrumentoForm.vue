<template>
	<div
		class="fixed inset-0 bg-gradient-to-br from-primary to-green bg-opacity-75 flex items-center justify-center z-50">
		<div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-auto p-6">
			<div class="mb-5">
				<h3 class="text-lg font-medium text-gray-900">
					{{ isEdit ? 'Modifica Strumento' : 'Aggiungi Nuovo Strumento' }}
				</h3>
				<p class="mt-1 text-sm text-gray-500">
					Compila i campi sottostanti per {{ isEdit ? 'modificare lo' : 'aggiungere un nuovo' }} strumento.
				</p>
			</div>

			<form @submit.prevent="handleSubmit" class="space-y-4">
				<!-- Nome strumento -->
				<div>
					<label for="nome" class="block text-sm font-medium text-gray-700">Nome Strumento *</label>
					<input type="text" id="nome" v-model="form.nome" placeholder="Inserisci il nome dello strumento"
						required
						class="p-2 mt-1 text-gray shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full  border-[1px] border-gray-300 rounded-md" />
				</div>

				<!-- Codice strumento -->
				<div>
					<label for="codice" class="block text-sm font-medium text-gray-700">Codice *</label>
					<input type="text" id="codice" v-model="form.codice" placeholder="Inserisci il codice" required
						class="p-2 mt-1 text-gray shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full border-[1px] border-gray-300 rounded-md" />
				</div>

				<!-- Data scadenza -->
				<div>
					<label for="dataScadenza" class="block text-sm font-medium text-gray-700">Data Scadenza *</label>
					<DatePicker v-model="form.dataScadenza" placeholder="Seleziona la data di scadenza" required auto-apply
						cancelText="Annulla" selectText="Seleziona" format="dd/MM/yyyy" locale="it" class="mt-1" />
				</div>


				<!-- Stato -->
				<div>
					<label for="stato" class="block text-sm font-medium text-gray-700">Stato</label>
					<select id="stato" v-model="form.stato"
						class="h-10.5 p-2 mt-1 text-gray shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full border-[1px] text-base border-gray-300 rounded-md">
						<option value="disponibile">Disponibile</option>
						<option value="prestito">In Prestito</option>
						<option value="manutenzione">In Manutenzione</option>
					</select>
				</div>

				<!-- Azioni -->
				<div class="pt-4 flex justify-end space-x-3">
					<button type="button" @click="$emit('annulla')"
						class="inline-flex items-center px-4 py-2 border-[1px] border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
						Annulla
					</button>
					<button type="submit" :disabled="!isFormValid" :class="[
						'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
						isFormValid
							? 'bg-primary'
							: 'bg-gray-400 cursor-not-allowed'
					]">
						<svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
							xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
							</circle>
							<path class="opacity-75" fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
							</path>
						</svg>
						{{ loading ? 'Salvando...' : (isEdit ? 'Salva modifiche' : 'Aggiungi strumento') }}
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup>
import { ref, watch, reactive, computed } from 'vue'
import { useStrumenti } from '@/composables/useStrumenti'
import DatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps({
	iniziali: {
		type: Object,
		default: null
	}
})

const emit = defineEmits(['salvato', 'annulla'])

const { aggiungiStrumento, modificaStrumento } = useStrumenti()

const isEdit = ref(!!props.iniziali)

const loading = ref(false)

const form = reactive({
	nome: '',
	codice: '',
	dataScadenza: '',
	stato: 'disponibile'
})

// Computed per validare il form
const isFormValid = computed(() => {
	return form.nome.trim() !== '' &&
		form.codice.trim() !== '' 
		// &&
		// form.dataScadenza instanceof Date && !isNaN(form.dataScadenza)
})

// Se stai modificando, inizializza il form con i dati
watch(
	() => props.iniziali,
	(val) => {
				
		if (val) {
			form.nome = val.nome || ''
			form.codice = val.codice || ''
			form.dataScadenza = val.dataScadenza?.seconds * 1000 || ''
			form.stato = val.stato || 'disponibile'
		}
	},
	{ immediate: true }
)

const handleSubmit = async () => {
	if (!isFormValid.value) return

	loading.value = true
	
	try {
		const dati = {
			nome: form.nome.trim(),
			codice: form.codice.trim(),
			dataScadenza: new Date(form.dataScadenza),
			stato: form.stato,
			note: ''
		}

		if (isEdit.value && props.iniziali?.id) {
			await modificaStrumento(props.iniziali.id, dati)
		} else {
			await aggiungiStrumento(dati)
		}

		emit('salvato')
	} catch (error) {
		console.error('Errore durante il salvataggio:', error)
		// Qui potresti aggiungere una notifica di errore
	} finally {
		loading.value = false
	}
}
</script>

<style scoped>
/* Gli stili sono gestiti tramite Tailwind CSS */
</style>