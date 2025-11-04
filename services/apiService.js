import axios from 'axios'

const FAKE_STORE_API = 'https://fakestoreapi.com'
const WEATHER_API = 'https://api.openweathermap.org/data/2.5'
const WEATHER_API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY

class ApiService {
  async getRecommendedDeals() {
    const r = await axios.get(`${FAKE_STORE_API}/products?limit=6`)
    return r.data.map(p => ({ id: p.id, name: p.title, price: Math.floor(p.price * 10), rating: p.rating.rate, image: p.image, description: p.description }))
  }
  async getWeatherForLocation(city) {
    const r = await axios.get(`${WEATHER_API}/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`)
    return { temperature: Math.round(r.data.main.temp), description: r.data.weather[0].description, icon: r.data.weather[0].icon, humidity: r.data.main.humidity, windSpeed: r.data.wind.speed }
  }
}
export default new ApiService()
