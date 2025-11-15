<template>
	<li class="py-4">
		<div class="flex space-x-3">
			<!-- Avatar/Icona -->
			<div class="flex-shrink-0">
				<div :class="[
					'h-10 w-10 rounded-full flex items-center justify-center',
					getColorClass()
				]">
					<component :is="getIcon()" class="h-5 w-5" />
				</div>
			</div>

			<!-- Contenuto -->
			<div class="min-w-0 flex-1">
				<p class="text-sm font-medium text-gray">
					<!-- {{ attivita.userEmail || 'Sistema' }} -->
				</p>
				<p class="text-sm text-gray">
					{{ attivita.descrizione }}
				</p>
				<p class="text-xs text-gray-400 mt-1">
					{{ formatTimestamp(attivita.timestamp) }}
				</p>
			</div>

			<!-- Badge tipo (opzionale) -->
			<div v-if="mostraTipoBadge" class="flex-shrink-0">
				<span :class="[
					'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
					getBadgeClass()
				]">
					{{ getTipoLabel() }}
				</span>
			</div>
		</div>
	</li>
</template>

<script setup>
import { computed, h } from 'vue'
import { useAttivita } from '@/composables/useAttivita'

const props = defineProps({
	attivita: {
		type: Object,
		required: true
	},
	mostraTipoBadge: {
		type: Boolean,
		default: false
	}
})

const { formatTimestamp } = useAttivita()

// Configurazione per ogni tipo di attività
const tipiConfig = {
	// Strumenti
	strumento_aggiunto: {
		label: 'Aggiunto',
		color: 'bg-green-100 text-green-600',
		badge: 'bg-green-100 text-green-800',
		icon: 'IconPlus'
	},
	strumento_modificato: {
		label: 'Modificato',
		color: 'bg-blue-100 text-blue-600',
		badge: 'bg-blue-100 text-blue-800',
		icon: 'IconEdit'
	},
	strumento_eliminato: {
		label: 'Eliminato',
		color: 'bg-red-100 text-red-600',
		badge: 'bg-red-100 text-red-800',
		icon: 'IconTrash'
	},
	strumento_assegnato: {
		label: 'Assegnato',
		color: 'bg-orange-100 text-orange-600',
		badge: 'bg-orange-100 text-orange-800',
		icon: 'IconUser'
	},
	strumento_liberato: {
		label: 'Liberato',
		color: 'bg-purple-100 text-purple-600',
		badge: 'bg-purple-100 text-purple-800',
		icon: 'IconUnlock'
	},
	strumento_trasferito: {
		label: 'Trasferito',
		color: 'bg-indigo-100 text-indigo-600',
		badge: 'bg-indigo-100 text-indigo-800',
		icon: 'IconTransfer'
	},
	// Operatori
	operatore_aggiunto: {
		label: 'Aggiunto',
		color: 'bg-green-100 text-green-600',
		badge: 'bg-green-100 text-green-800',
		icon: 'IconPlus'
	},
	operatore_modificato: {
		label: 'Modificato',
		color: 'bg-blue-100 text-blue-600',
		badge: 'bg-blue-100 text-blue-800',
		icon: 'IconEdit'
	},
	operatore_eliminato: {
		label: 'Eliminato',
		color: 'bg-red-100 text-red-600',
		badge: 'bg-red-100 text-red-800',
		icon: 'IconTrash'
	}
}

const getColorClass = () => {
	return tipiConfig[props.attivita.tipo]?.color || 'bg-gray-100 text-gray-600'
}

const getBadgeClass = () => {
	return tipiConfig[props.attivita.tipo]?.badge || 'bg-gray-100 text-gray-800'
}

const getTipoLabel = () => {
	return tipiConfig[props.attivita.tipo]?.label || 'Attività'
}

// Icone SVG come componenti funzionali
const IconPlus = () => h('svg', {
	xmlns: 'http://www.w3.org/2000/svg',
	fill: 'none',
	viewBox: '0 0 24 24',
	stroke: 'currentColor'
}, [
	h('path', {
		'stroke-linecap': 'round',
		'stroke-linejoin': 'round',
		'stroke-width': '2',
		d: 'M12 4v16m8-8H4'
	})
])

const IconEdit = () => h('svg', {
	xmlns: 'http://www.w3.org/2000/svg',
	fill: 'none',
	viewBox: '0 0 24 24',
	stroke: 'currentColor'
}, [
	h('path', {
		'stroke-linecap': 'round',
		'stroke-linejoin': 'round',
		'stroke-width': '2',
		d: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
	})
])

const IconTrash = () => h('svg', {
	xmlns: 'http://www.w3.org/2000/svg',
	fill: 'none',
	viewBox: '0 0 24 24',
	stroke: 'currentColor'
}, [
	h('path', {
		'stroke-linecap': 'round',
		'stroke-linejoin': 'round',
		'stroke-width': '2',
		d: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
	})
])

const IconUser = () => h('svg', {
	xmlns: 'http://www.w3.org/2000/svg',
	fill: 'none',
	viewBox: '0 0 24 24',
	stroke: 'currentColor'
}, [
	h('path', {
		'stroke-linecap': 'round',
		'stroke-linejoin': 'round',
		'stroke-width': '2',
		d: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
	})
])

const IconUnlock = () => h('svg', {
	xmlns: 'http://www.w3.org/2000/svg',
	fill: 'none',
	viewBox: '0 0 24 24',
	stroke: 'currentColor'
}, [
	h('path', {
		'stroke-linecap': 'round',
		'stroke-linejoin': 'round',
		'stroke-width': '2',
		d: 'M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z'
	})
])

const IconTransfer = () => h('svg', {
	xmlns: 'http://www.w3.org/2000/svg',
	fill: 'none',
	viewBox: '0 0 24 24',
	stroke: 'currentColor'
}, [
	h('path', {
		'stroke-linecap': 'round',
		'stroke-linejoin': 'round',
		'stroke-width': '2',
		d: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4'
	})
])

const getIcon = () => {
	const iconName = tipiConfig[props.attivita.tipo]?.icon || 'IconEdit'
	const icons = {
		IconPlus,
		IconEdit,
		IconTrash,
		IconUser,
		IconUnlock,
		IconTransfer
	}
	return icons[iconName] || IconEdit
}
</script>
