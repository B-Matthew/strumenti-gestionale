<template>
	<div
		class="fixed inset-0 bg-gradient-to-br from-primary to-green bg-opacity-75 flex items-center justify-center z-50">
		<div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-auto p-6">
			<div class="mb-5">
				<h3 class="text-lg font-medium text-gray-900">
					{{ isEdit ? 'Modifica Operatore' : 'Aggiungi Nuovo Operatore' }}
				</h3>
				<p class="mt-1 text-sm text-gray-500">
					Compila i campi sottostanti per {{ isEdit ? 'modificare l' : 'aggiungere un nuovo' }} operatore.
				</p>
			</div>

			<form @submit.prevent="handleSubmit" class="space-y-4">
				<!-- Nome -->
				<div>
					<label for="nome" class="block text-sm font-medium text-gray-700">Nome *</label>
					<input type="text" id="nome" v-model="form.nome" placeholder="Inserisci il nome" required
						class="p-2 mt-1 text-gray shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full border border-gray-300 rounded-md" />
				</div>

				<!-- Cognome -->
				<div>
					<label for="cognome" class="block text-sm font-medium text-gray-700">Cognome *</label>
					<input type="text" id="cognome" v-model="form.cognome" placeholder="Inserisci il cognome" required
						class="p-2 mt-1 text-gray shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full border border-gray-300 rounded-md" />
				</div>

				<!-- Email -->
				<div>
					<label for="email" class="block text-sm font-medium text-gray-700">Email *</label>
					<input type="email" id="email" v-model="form.email" placeholder="Inserisci l'email" required
						class="p-2 mt-1 text-gray shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full border border-gray-300 rounded-md" />
				</div>

				<!-- Ruolo -->
				<div>
					<label for="ruolo" class="block text-sm font-medium text-gray-700">Ruolo *</label>
					<input type="text" id="ruolo" v-model="form.ruolo" placeholder="Inserisci il ruolo" required
						class="p-2 mt-1 text-gray shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full border border-gray-300 rounded-md" />
				</div>

				<!-- Azioni -->
				<div class="pt-4 flex justify-end space-x-3">
					<button type="button" @click="$emit('annulla')"
						class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
						Annulla
					</button>
					<button type="submit" :disabled="!isFormValid" :class="[
						'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
						isFormValid ? 'bg-primary' : 'bg-gray-400 cursor-not-allowed'
					]">
						<svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
							xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
							<path class="opacity-75" fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
						</svg>
						{{ loading ? 'Salvando...' : (isEdit ? 'Salva modifiche' : 'Aggiungi Operatore') }}
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, watch, computed } from 'vue'
import { useOperatori } from '@/composables/useOperatori'

const props = defineProps({
	iniziali: {
		type: Object,
		default: null
	}
})

const emit = defineEmits(['salvato', 'annulla'])

const { aggiungiOperatore, modificaOperatore } = useOperatori()

const isEdit = ref(!!props.iniziali)
const loading = ref(false)

const form = reactive({
	nome: '',
	cognome: '',
	email: '',
	ruolo: ''
})

const isFormValid = computed(() => {
	return form.nome.trim() && form.cognome.trim() && form.email.trim() && form.ruolo.trim()
})

watch(
	() => props.iniziali,
	(val) => {
		if (val) {
			form.nome = val.nome || ''
			form.cognome = val.cognome || ''
			form.email = val.email || ''
			form.ruolo = val.ruolo || ''
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
			cognome: form.cognome.trim(),
			email: form.email.trim(),
			ruolo: form.ruolo.trim()
		}

		if (isEdit.value && props.iniziali?.id) {
			await modificaOperatore(props.iniziali.id, dati)
		} else {
			await aggiungiOperatore(dati)
		}

		emit('salvato')
	} catch (err) {
		console.error('Errore durante il salvataggio:', err)
	} finally {
		loading.value = false
	}
}
</script>

<style scoped>
/* Gestito con Tailwind */
</style>
