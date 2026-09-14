import './App.css'

import { useState } from 'react'

function App() {
  // משתנים ששומרים את המצב (הזיכרון) של האפליקציה
  const [city, setCity] = useState('')
  const [result, setResult] = useState<any>(null)

  // הפונקציה שמופעלת כשלוחצים על הכפתור
  const searchCity = async () => {
    try {
      // כאן ה-React פונה ל-Backend שלנו! (בדיוק כמו ש-requests עשה בפייתון)
      const response = await fetch(`http://127.0.0.1:8000/api/search?name=${city}`)
      const data = await response.json()
      setResult(data) // שומרים את התשובה כדי להציג אותה במסך
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', textAlign: 'center' }}>
      <h1>ClimaBoard 🌤️</h1>

      <input
        type="text"
        placeholder="הכנס שם עיר (למשל London)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: '10px', fontSize: '16px', marginRight: '10px' }}
      />

      <button onClick={searchCity} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
        חפש עיר
      </button>

      {/* אם יש לנו תוצאה, נדפיס אותה למסך */}
      {result && (
        <div style={{ marginTop: '20px', direction: 'ltr', textAlign: 'left', display: 'inline-block' }}>
          <pre style={{ backgroundColor: '#f4f4f4', padding: '15px', borderRadius: '5px' }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
export default App
