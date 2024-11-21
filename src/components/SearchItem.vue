<script setup>
import { ref, defineEmits } from 'vue'
import { useCity } from '@/composables/useCity'

const query = ref('')
const { cityList, loading, error, search } = useCity()

const handleInput = () => {
  search(query.value) 
}
const emit = defineEmits(['update'])
function updateCity(city) {
	emit('update', city);
	query.value = '';
	cityList.value = [];
}
</script>
<template>
	<div>
		<input type="text" v-model="query" placeholder="Search..." @input="handleInput" />
		<ul v-if="cityList.length">
			<li v-for="city in cityList" @click="updateCity(city)">{{ city.name }}</li>
		</ul>
	</div>
</template>
<style scoped>
ul {
	list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>