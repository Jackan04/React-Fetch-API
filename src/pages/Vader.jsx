import '../App.css';
import Weather from '../components/Weather';

function Vader() {
  return (
    <div className='container'>
      <h1>Väder</h1>
      <p>Här kan du se vädret för olika platser i Sverige där våra arkadhallar finns på.</p>
      <Weather />
    </div>
  );
}

export default Vader;