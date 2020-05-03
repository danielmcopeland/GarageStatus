import React, { useEffect, useState } from 'react';
import {ReactComponent as Logo} from './logo.svg';
import {ReactComponent as OpenGarage} from './openGarage.svg';
import {ReactComponent as ClosedGarage} from './closedGarage.svg';
import './App.css';

function App() {
  const [localState, setLocalState] = useState('');
  
  useEffect(() => {
    if (localState == ''){
    fetch('http://192.168.1.108:5000/status')
            .then(res => res.json())
            .then((data) => {
              console.log(data);
              setLocalState(data);
            })
            .catch(console.log)
          };
        }, [localState]);
        
  const statusClass = localState == '' ? 'Blue' : localState.is_open == 'OPEN' ? 'Red' : 'Green';
  const GarageLogo = () => localState.is_open == 'OPEN' ? <OpenGarage className='Open-garage'/> : localState.is_open == 'CLOSED' ? <ClosedGarage className='Closed-garage'/> : <Logo className='App-logo'/>;
  const getStatus = () => localState && localState.is_open || 'LOADING'
  
  return (
    <div className='App'>
      <header className='App-header'>
        {/* <img src={garageLogo} className={garageClass} alt='logo' /> */}
        <GarageLogo />
        <p>Garage Status: <span className={statusClass}>{getStatus()}</span></p>
        <br/>
        <button onClick={()=>setLocalState('')}>Get Status</button>
 
      </header>
    </div>
  );
}

export default App;
