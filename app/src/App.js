import React, {useEffect, useState} from 'react'
import logo from './logo.svg';
import './App.css';

function App() {

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const dataPromises = [];
        for (let i = 0; i < 9; i++) {
          const res = await fetch(`/streamingData/StreamingHistory${i}.json`)
          const jsonData = await res.json();
          dataPromises.push(jsonData);
        }

        const mergedData = dataPromises.reduce((acc, jsonData) => acc.concat(jsonData), []);
        setData(mergedData);
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchAllData();
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
