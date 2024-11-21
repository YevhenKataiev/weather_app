
import { ref } from 'vue'

export function useCity() {
  const cityList = ref([])
  const error = ref(null)
  const loading = ref(false)
  const cityApi = import.meta.env.VITE_CITY_URL
	const cityApikey = import.meta.env.VITE_CITY_API_KEY
	const options = {
		method: 'GET',
		headers: {
			'x-rapidapi-key': cityApikey,
			'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
		}
	};
  const fetchCity = async (query) => {
    loading.value = true
    try {
      const response = await fetch(`${cityApi}?limit=10&offset=0&namePrefix=${query}`, options)
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
			const { data } = await response.json()
      cityList.value = data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }
	let timeoutId = null

  const search = (query, delay = 500) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      if (query) {
        fetchCity(query)
      } else {
        cityList.value = [] 
      }
    }, delay)
  }
  return { cityList, error, loading, search }
}
