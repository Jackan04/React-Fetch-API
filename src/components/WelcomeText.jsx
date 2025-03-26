import React from 'react';
import { Link } from 'react-router-dom';

function WelcomeText() {
  return (
    <>
      <div className='container'>
        <div className='welcome-text'>
          <h1>Arkadhallen</h1>
          <p>Här kan du bläddra bland de drycker vi erbjuder i våra arkadhallar samt kolla vädret för de platser där våra arkadhallar är belägna.</p>
        </div>
        <div className='welcome-buttons'>
        <button><Link to='/drinks'>🍹 Dryck</Link></button>
        <button><Link to='/vader'>🌤️ Väder</Link></button>
        </div>
      
      </div>
    </>
  );
}

export default WelcomeText;