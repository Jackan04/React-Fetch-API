import { useState, useEffect } from "react";

// Referenser
// https://www.smhi.se/data/utforskaren-oppna-data/meteorologisk-prognosmodell-pmp3g-2-8-km-upplosning-api 
// https://opendata.smhi.se/
// ChatGPT för att omvandla SMHI vädersymboler/ siffror till beskrivande ord (Se nedanför)

function Weather() {
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);

  const desciptionOfWeatherSymbols = {
    // Objekt som översätter SMHI's siffror av vädersymboler till en beskrivande text
    1: "Klart",
    2: "Lätt molnighet",
    3: "Halvklart",
    4: "Molnigt",
    5: "Mycket molnigt",
    6: "Mulet",
    7: "Dimma",
    8: "Lätt regnskur",
    9: "Regnskur",
    10: "Kraftig regnskur",
    11: "Åskskur",
    12: "Lätt snöby",
    13: "Snöby",
    14: "Kraftig snöby",
    15: "Lätt regn",
    16: "Regn",
    17: "Kraftigt regn",
    18: "Åska",
    19: "Lätt snöfall",
    20: "Snöfall",
    21: "Kraftigt snöfall",
  };

  const cities = [ // Array som lagrar de olika städer som ska finnas med
    { name: "Göteborg", lon: 11.97, lat: 57.71 },
    { name: "Stockholm", lon: 18.06, lat: 59.33 },
    { name: "Malmö", lon: 13.00, lat: 55.60 },
    { name: "Trollhättan", lon: 12.28 , lat: 58.28  },

  ];

  useEffect(() => {
    
    const getWeather = async (city) => { // Hämta varje stad enskilt från arrayen, men eftersom den körs asynkront, kan detta ske samtidigt för varje enskild stad
      try {
        const answer = await fetch( // Variabel som lagrar väderdatan som hämtats för varje enskild stad med länk nedanför
          `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${city.lon}/lat/${city.lat}/data.json`
        );

        if (!answer.ok) throw new Error("Inget hittades");

        const data = await answer.json(); // Omvandlar datan till json-format

        const today = new Date().toISOString().split("T")[0]; // Skapar en variabel "Today" för att spara dagens datum.
        
        const dailyForecast = data.timeSeries.find((entry) =>
          // Denna hämtar progonosen för en viss tid som i detta fall är 15:00
          entry.validTime.includes(`${today}T15:00`)
        );

        if (dailyForecast) {
          const temp = dailyForecast.parameters.find((p) => p.name === "t").values[0]; // "t" är parametern för att hämta temperaturen från API:et
          const weatherSymbol = dailyForecast.parameters.find((p) => p.name === "Wsymb2").values[0];

          return { city: city.name, temp: Math.round(temp), weatherSymbol }; // Skickar med stad, temperatur och vädersymbol (vädersymbolen översätts från siffror till text som kan ses högst upp i filen)
        } else {
          throw new Error("Inget hittades");
        }
      } catch (e) {
        setError(e.message);
      }
    };

    // Sätter vädret för varje stad och skickad med det till
    const fetchWeatherData = async () => {
      const weatherPromises = cities.map((city) => getWeather(city));
      const weatherData = await Promise.all(weatherPromises);
      setWeatherData(weatherData); // Funktionen som uppdaterar variabeln "weatherData"
      
    };

    fetchWeatherData();
    
  }, []);

  
  if (error) return <p>Fel: {error}</p>;

  return (
    <div>
      <table>
        <thead>
          <tr className='table-items'>
            <th className='table-item'>📍 Stad</th>
            <th className='table-item'>🌡️ Temperatur</th>
            <th className='table-item'>🌤️ Väder</th>
          </tr>
        </thead>
        <tbody>
        
          {weatherData.map((weather) => (
            <tr key={weather.city} className='table-items'>
              <td className='table-item'>{weather.city}</td>
              <td className='table-item'>{weather.temp}</td>
              <td className='table-item'>{ desciptionOfWeatherSymbols[weather.weatherSymbol] || "Väder Okänt"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Weather;



