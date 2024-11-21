
import { ref } from 'vue'

export function useWeather() {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)
  const weatherApi = import.meta.env.VITE_WEATHER_URL
	const weatherApikey = import.meta.env.VITE_WEATHER_API_KEY
  const fetchWeather = async (query) => {
    loading.value = true
    try {
      const response = await fetch(`${weatherApi}/forecast?lat=${query.latitude}&lon=${query.longitude}&appid=${weatherApikey}&units=metric`)
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      data.value = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }


  return { data, error, loading, fetchWeather }
}
