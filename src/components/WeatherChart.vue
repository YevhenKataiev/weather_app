<script setup>
import { ref, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables);

const chart = ref(null);
const chartInstance = ref(null);
const prop = defineProps({
	data: {
		type: Array,
		default: () => []
	}
})
const createChart = (data) => {
	if (chartInstance.value) {
		chartInstance.value.destroy();
	}
	const labels = data.map(entry => entry.dt_txt);
	const temperatures = data.map(entry => entry.main.temp);
	chartInstance.value = new Chart(chart.value, {
		type: 'line',
		data: {
			labels,
			datasets: [{
				label: 'Temperature (°C)',
				data: temperatures,
				borderColor: 'rgba(0, 0, 0, 1)',
				backgroundColor: 'rgba(75, 192, 192, 0.2)',
				fill: true,
			}],
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			
		},
	});
};

onMounted(() => {
	createChart(prop.data);
});
</script>
<template>
	<div style="width: 300px;height: 300px;">
		<canvas ref="chart"></canvas>
	</div>
</template>