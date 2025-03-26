import { Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/Navbar';
import Vader from './pages/Vader';
import DrinksList from './pages/Drinks.jsx';
import Drinks from './components/DrinksList.jsx';
import WelcomeText from './components/WelcomeText';

function App() {
  return (
    <>
      <NavBar />  
      <Routes>
        
        <Route path="/" element={<WelcomeText />} />
        <Route path="/drinks" element={<DrinksList />} />
        <Route path="/vader" element={<Vader />} />
      </Routes>


    </>
  );
}

export default App;