<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import DefaultLayout from './layouts/DefaultLayout.vue'
import NoHeaderLayout from './layouts/NoHeaderLayout.vue'  // crea questo layout senza header

const route = useRoute()

const layoutComponent = computed(() => {
	// Se meta.layout esiste, usa quello, altrimenti DefaultLayout
	if (route.meta.layout === 'no-header') {
		return NoHeaderLayout
	}
	return DefaultLayout
})
</script>

<template>
	<component :is="layoutComponent">
		<router-view />
	</component>
</template>
