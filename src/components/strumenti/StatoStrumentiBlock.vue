<template>
	<!-- Stats Section -->
	<div class="px-4 sm:px-0 mb-8">
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
			<!-- Stat 1 -->
			<RouterLink to="/strumenti" class="bg-white overflow-hidden shadow rounded-lg">
				<div class="px-4 py-5 sm:p-6">
					<div class="flex items-center">
						<div class="flex-shrink-0 bg-blue-500 rounded-md p-3">
							<svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
								viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
							</svg>
						</div>
						<div class="ml-5 w-0 flex-1">
							<dl>
								<dt class="text-sm font-medium text-gray-500 truncate">
									Totale Strumenti
								</dt>
								<dd>
									<div class="text-lg font-medium text-gray-900">
										{{ strumenti.length }}
									</div>
								</dd>
							</dl>
						</div>
					</div>
				</div>
			</RouterLink>

			<!-- Stat 2 -->
			<div class="bg-white overflow-hidden shadow rounded-lg">
				<div class="px-4 py-5 sm:p-6">
					<div class="flex items-center">
						<div class="flex-shrink-0 bg-green-500 rounded-md p-3">
							<svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
								viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</div>
						<div class="ml-5 w-0 flex-1">
							<dl>
								<dt class="text-sm font-medium text-gray-500 truncate">
									Disponibili
								</dt>
								<dd>
									<div class="text-lg font-medium text-gray-900">
										{{ strumentiDisponibili.length }}
									</div>
								</dd>
							</dl>
						</div>
					</div>
				</div>
			</div>

			<!-- Stat 3 -->
			<div class="bg-white overflow-hidden shadow rounded-lg">
				<div class="px-4 py-5 sm:p-6">
					<div class="flex items-center">
						<div class="flex-shrink-0 bg-orange-500 rounded-md p-3">
							<svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
								viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
							</svg>
						</div>
						<div class="ml-5 w-0 flex-1">
							<dl>
								<dt class="text-sm font-medium text-gray-500 truncate">
									Assegnato
								</dt>
								<dd>
									<div class="text-lg font-medium text-gray-900">
										{{ strumentiInAssegnato.length }}
									</div>
								</dd>
							</dl>
						</div>
					</div>
				</div>
			</div>

			<!-- Stat 4 -->
			<div class="bg-white overflow-hidden shadow rounded-lg">
				<div class="px-4 py-5 sm:p-6">
					<div class="flex items-center">
						<div class="flex-shrink-0 bg-red-500 rounded-md p-3">
							<svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
								viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
							</svg>
						</div>
						<div class="ml-5 w-0 flex-1">
							<dl>
								<dt class="text-sm font-medium text-gray-500 truncate">
									Manutenzione
								</dt>
								<dd>
									<div class="text-lg font-medium text-gray-900">
										{{ strumentiInManutenzione.length }}
									</div>
								</dd>
							</dl>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStrumenti } from '@/composables/useStrumenti'

const { strumenti, getStrumenti } = useStrumenti()

// Computed properties per le statistiche
const strumentiDisponibili = computed(() => {
	return strumenti.value.filter(s => s.stato === 'disponibile')
})

const strumentiInAssegnato = computed(() => {
	return strumenti.value.filter(s => s.stato === 'assegnato')
})

const strumentiInManutenzione = computed(() => {
	return strumenti.value.filter(s => s.stato === 'manutenzione')
})

onMounted(async () => {
	await getStrumenti()
})
</script>

<style scoped>
/* Eventuali stili specifici possono essere aggiunti qui */
</style>