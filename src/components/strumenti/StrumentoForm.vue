<template>
	<div class="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
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
				<div>
					<label for="codice" class="block text-sm font-medium text-gray-700">Codice</label>
					<input type="text" id="codice" v-model="form.codice" placeholder="Inserisci il codice"
						class="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" />
				</div>

				<div>
					<label for="scadenza" class="block text-sm font-medium text-gray-700">Data Scadenza</label>
					<input type="date" id="scadenza" v-model="form.scadenza"
						class="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" />
				</div>

				<div>
					<label for="stato" class="block text-sm font-medium text-gray-700">Stato</label>
					<select id="stato" v-model="form.stato"
						class="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md">
						<option value="disponibile">Disponibile</option>
						<option value="prestito">In Prestito</option>
						<option value="manutenzione">In Manutenzione</option>
					</select>
				</div>

				<div class="pt-4 flex justify-end space-x-3">
					<button type="button" @click="$emit('annulla')"
						class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
						Annulla
					</button>
					<button type="submit"
						class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
						{{ isEdit ? 'Salva modifiche' : 'Aggiungi strumento' }}
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup>
import { ref, watch, reactive } from 'vue'
import { useStrumenti } from '@/composables/useStrumenti'

const props = defineProps({
	iniziali: Object, // per modifica, contiene i dati dello strumento
})

const emit = defineEmits(['salvato', 'annulla'])

const { aggiungiStrumento, modificaStrumento } = useStrumenti()

const isEdit = ref(!!props.iniziali)
const form = reactive({
	codice: '',
	scadenza: '',
	stato: 'disponibile',
})

// Se stai modificando, inizializza il form con i dati
watch(
	() => props.iniziali,
	(val) => {
		if (val) Object.assign(form, val)
	},
	{ immediate: true }
)

const handleSubmit = async () => {
	const dati = { ...form }

	if (isEdit.value && props.iniziali?.id) {
		await modificaStrumento(props.iniziali.id, dati)
	} else {
		await aggiungiStrumento(dati)
	}

	emit('salvato') // per aggiornare la lista o chiudere il form
}
</script>

<style scoped>
/* Gli stili sono gestiti tramite Tailwind CSS */
</style>