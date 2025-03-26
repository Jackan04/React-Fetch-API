import { useState, useEffect } from "react";

// Referens
// https://www.youtube.com/watch?v=je3FTTunyp4
const DrinksList = () => {
    const [drinks, setDrinks] = useState([]);

    useEffect(() => {
        fetch("https://informatik5.ei.hv.se/DrinksApi/api/Drinks")
            .then(response => response.json())
            .then(data => setDrinks(data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    return (
        <div className="drinks-table-container">
            <table className="drinks-table">
                <thead>
                <tr>
                    <th>Namn</th>
                    <th>Beskrivning</th>
                    <th>Alkoholhalt</th>
                    <th>Kategori</th>
                    <th>Pris</th>
                </tr>
                </thead>
                <tbody>
                {drinks.map(drink => (
                    <tr key={drink.id}>
                        <td>{drink.namn}</td>
                        <td>{drink.beskrivning}</td>
                        <td>{drink.alkoholhalt}%</td>
                        <td>{drink.kategori}</td>
                        <td>{drink.pris} kr</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default DrinksList;
