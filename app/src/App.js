import React, {useEffect, useState} from 'react'
import SongCountTable from './components/SongCount';
import ArtistCountTable from './components/ArtistCount';
/* TODO IMPORT SONGCOUNT AND ARTIST COUNT COMPONENTS */
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
      <SongCountTable data={data}/>
      <ArtistCountTable data={data} />
    </div>
  );
}

export default App;
