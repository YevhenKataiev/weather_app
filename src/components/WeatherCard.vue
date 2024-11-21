<script setup>
import { ref, watch } from 'vue';
import WeatherChart from './WeatherChart.vue';
const prop = defineProps({
	data: {
		type: Object,
		default: () => { }
	},
	name:{
		type: String,
		default: () => ''
	},
})
const showType = ref(0)
const showList = ref([])
watch(showType, () => {
	// data for 1 day
	const index = prop.data.list.findIndex((el) => el.dt_txt.includes('00:00:00'));
	if (showType.value === 0) {
		showList.value = prop.data.list.slice(0, index)
	} else {
		//data for 5 day
		showList.value = []
		if (index !== 0) {
			showList.value.push(prop.data.list.slice(0, index))
			for (let step = 0; step < 4; step++) {
				showList.value.push(prop.data.list.slice(step*8 + index,(step+1)*8 + index))
			}
		} else {
			for (let step = 0; step < 5; step++) {
				showList.value.push(prop.data.list.slice(step*8,(step+1)*8))
			}
		}

	}
}, { immediate: true })
</script>
<template>
	<div class="container">
		<div>
			<button @click="showType = 0">day</button>
			<button @click="showType = 1">5 day</button>
		</div>
		<h3>{{ name }}</h3>
		<WeatherChart v-if="showType === 0" :data="showList" />
		<div v-else class="wrapper">
			<WeatherChart v-for="item in showList" :data="item" />
		</div>
	</div>
</template>
<style scoped>
button {
	height: 2rem;
	width: 8rem;
}
.container {
	display: flex;
	flex-direction: column;
	gap: 2em;
	width: 100%;
}
.wrapper {
	display: flex;
	flex-direction: row;
	width: 100%;
	min-width: 320px;
	flex-wrap: wrap;
}
</style>