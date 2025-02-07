import { useState } from 'react';
import './App.css';
import Modal from './Seminars/Modal/Modal';
import Seminars from './Seminars/Seminars';

function App() {
  const [closeSeminar, setCloseSeminar] = useState(false)
  
  return (
    <div>
      <Seminars 
        setCloseSeminar={setCloseSeminar} 
        closeSeminar={closeSeminar} 

      />
  </div>
  );
}

export default App;
