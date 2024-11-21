<script setup>
import { ref, watch } from 'vue';
import WeatherCard from './WeatherCard.vue';
import SearchItem from './SearchItem.vue';
const city = ref(null)
function update(e) {
	city.value = e
}
import { useWeather } from '@/composables/useWeather';
const { data, loading, error, fetchWeather } = useWeather()
watch(() => city.value, async (newVal) => {
	if (newVal) {
		await fetchWeather(newVal)
	}
})
</script>
<template>
	<SearchItem @update="update" />
	<div v-if="loading"> Loading </div>
	<WeatherCard v-else-if="data" :data="data" :name="city.city" />
</template>