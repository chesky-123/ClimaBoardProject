// src/pages/Compare.tsx
import { useState } from 'react'
import useFetch from '../hooks/useFetch'

export default function Compare() {
  const [cityA, setCityA] = useState("")
  const [cityB, setCityB] = useState("")
  const [comparisonData, setComparisonData] = useState<any>(null)

  const [weatherA, setWeatherA] = useState<any>(null)
  const [weatherB, setWeatherB] = useState<any>(null)
  const [nameA, setNameA] = useState("")
  const [nameB, setNameB] = useState("")

  const { doFetch, loading, error } = useFetch()

  const handleCompare = async () => {
    if (!cityA || !cityB) return;
    
    setWeatherA(null);
    setWeatherB(null);
    setNameA("");
    setNameB("");

    const data = await doFetch(`http://localhost:8000/api/compiration?city_a=${cityA}&city_b=${cityB}`);
    if (data) {
      setComparisonData(data);
    }
  }

  const handleCityAClick = async (lat: number, lon: number, name: string) => {
    setNameA(name);
    const data = await doFetch(`http://localhost:8000/api/weater?lat=${lat}&lon=${lon}`);
    if (data) setWeatherA(data);
  }

  const handleCityBClick = async (lat: number, lon: number, name: string) => {
    setNameB(name);
    const data = await doFetch(`http://localhost:8000/api/weater?lat=${lat}&lon=${lon}`);
    if (data) setWeatherB(data);
  }

  return (
    <div>
      <h2>Compare Cities</h2>
      
      <div>
        <input 
          placeholder="First city..." 
          value={cityA} 
          onChange={(e) => setCityA(e.target.value)} 
        />
        <input 
          placeholder="Second city..." 
          value={cityB} 
          onChange={(e) => setCityB(e.target.value)} 
        />
        <button onClick={handleCompare}>Compare!</button>
      </div>

      <br />
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>Error fetching comparison!</div>}

      {comparisonData && (
         <div style={{ display: 'flex', gap: '50px', marginTop: '20px' }}>
            
            <div>
              <h3>Results for: {cityA} (Click to fetch weather)</h3>
              <ul>
                {comparisonData[0]?.map((c: any) => (
                  <li 
                    key={c.id}
                    onClick={() => handleCityAClick(c.latitude, c.longitude, c.name)}
                    style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                  >
                    {c.name} (Lat: {c.latitude}, Lon: {c.longitude})
                  </li>
                ))}
              </ul>

              {weatherA && (
                <div style={{ marginTop: '10px', padding: '10px', border: '1px solid black' }}>
                  <h4>Weather in {nameA}</h4>
                  <p>Temp: {weatherA.current?.temperature_2m}°C</p>
                  <p>Wind: {weatherA.current?.wind_speed_10m} km/h</p>
                </div>
              )}
            </div>
            
            <div>
              <h3>Results for: {cityB} (Click to fetch weather)</h3>
              <ul>
                {comparisonData[1]?.map((c: any) => (
                  <li 
                    key={c.id}
                    onClick={() => handleCityBClick(c.latitude, c.longitude, c.name)}
                    style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                  >
                    {c.name} (Lat: {c.latitude}, Lon: {c.longitude})
                  </li>
                ))}
              </ul>

              {weatherB && (
                <div style={{ marginTop: '10px', padding: '10px', border: '1px solid black' }}>
                  <h4>Weather in {nameB}</h4>
                  <p>Temp: {weatherB.current?.temperature_2m}°C</p>
                  <p>Wind: {weatherB.current?.wind_speed_10m} km/h</p>
                </div>
              )}
            </div>

         </div>
      )}
    </div>
  )
}