import { useState, useContext, useEffect, useRef } from 'react' 
import useFetch from '../hooks/useFetch'
import { UserContext } from '../contenx/UserContext'

type CityResult = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function Home() {
  const [cityName, setCityName] = useState("")
  const [selectedCityName, setSelectedCityName] = useState("") 
  const [results, setResults] = useState<CityResult[]>([])
  const [weather, setWeather] = useState<any>(null) 
  const SearchRef = useRef<HTMLInputElement>(null)
  const [myFavorites, setMyFavorites] = useState<string[]>([]) 

  const { doFetch, loading, error } = useFetch()
  const userContext = useContext(UserContext)

  const loadFavorites = async () => {
    if (!userContext?.userName) return;
    
    const data = await doFetch(`http://localhost:8000/api/favorites?name=${userContext.userName}`);
    if (data && data.favorites) {
      setMyFavorites(data.favorites); 
    }
  }

  useEffect(() => {
    loadFavorites();
  }, [userContext?.userName]) 

  const handleSearch = async () => {
    if (!cityName) return;
    setWeather(null); 
    const data = await doFetch(`http://localhost:8000/api/search?name=${cityName}`);
    if (data) setResults(data);
  }

  const handleCityClick = async (lat: number, lon: number, name: string) => {
    setSelectedCityName(name); 
    const data = await doFetch(`http://localhost:8000/api/weater?lat=${lat}&lon=${lon}`);
    if (data) setWeather(data); 
  }

  const handleAddFavorite = async () => {
    if (!userContext?.userName || !selectedCityName) return;

    const data = await doFetch(
      `http://localhost:8000/api/favorites/add`,
      { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' 
        },

        body: JSON.stringify({
          name: userContext.userName,
          city: selectedCityName
        })
      } 
    );

    if (data?.create) {
      alert("City added to favorites successfully!");
      loadFavorites(); 
    } else {
      alert("Failed to add or city already in favorites.");
    }
  }
  
  useEffect(() => {
    SearchRef.current?.focus()
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      
      <div style={{ width: '60%' }}>
        <h2>Search Weather</h2>
        <div>
          <input 
            type="text" 
            ref={SearchRef}
            placeholder="Enter city name..."
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        
        <br />
        {loading && <div>Loading...</div>}
        {error && <div style={{ color: 'red' }}>Error fetching data!</div>}

        <div>
          {results.length > 0 && <h3>Results: (Click a city)</h3>}
          <ul>
            {results.map((city) => (
              <li 
                key={city.id} 
                onClick={() => handleCityClick(city.latitude, city.longitude, city.name)}
                style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
              >
                {city.name} (Lat: {city.latitude}, Lon: {city.longitude})
              </li>
            ))}
          </ul>
        </div>

        {weather && (
          <div style={{ marginTop: '20px', padding: '15px', border: '1px solid black', display: 'inline-block' }}>
            <h3>Current Weather in {selectedCityName}</h3>
            <p>Temperature: {weather.current?.temperature_2m}°C</p>
            <p>Wind Speed: {weather.current?.wind_speed_10m} km/h</p>
            <br />
            <button onClick={handleAddFavorite}>Add to Favorites</button>
          </div>
        )}
      </div>

      <div style={{ width: '30%', borderLeft: '1px solid #ccc', paddingLeft: '20px' }}>
        <h2>My Favorites</h2>
        {myFavorites.length === 0 ? (
          <p>No favorites yet...</p>
        ) : (
          <ul>
            {myFavorites.map((fav, index) => (
              <li key={index}>{fav}</li>
            ))}
          </ul>
        )}
      </div>

    </div>
  )
}