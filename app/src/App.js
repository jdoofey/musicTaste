import React, {useEffect, useState} from 'react'
import SongCountTable from './components/SongCount';
import ArtistCountTable from './components/ArtistCount';
import Pagination from './components/Pagination';
/* TODO IMPORT SONGCOUNT AND ARTIST COUNT COMPONENTS */


function App() {

  const [data, setData] = useState([]);
  const [currentSongPage, setCurrentSongPage] = useState(1);
  const [currentArtistPage, setCurrentArtistPage] = useState(1);
  const itemsPerPage = 20;
  const songCounts = {};
  const artistCounts = {};

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const dataPromises = [];
        for (let i = 0; i < 9; i++) {
          const res = await fetch(`/streamingData/StreamingHistory${i}.json`);
          const jsonData = await res.json();
          dataPromises.push(jsonData);
        }

        const mergedData = dataPromises.reduce((acc, jsonData) => acc.concat(jsonData), []);
        setData(mergedData);


        const songCounts = {};
        const artistCounts = {};

        mergedData.forEach((entry) => {
          const songKey = `${entry.artistName} - ${entry.trackName}`;
          if (songCounts[songKey]) {
            songCounts[songKey]++;
          } else {
            songCounts[songKey] = 1;
          }

          if (artistCounts[entry.artistName]) {
            artistCounts[entry.artistName]++;
          } else {
            artistCounts[entry.artistName] = 1;
          }
        });

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAllData();
  }, []);



  return (
    <div className="App">
      <SongCountTable
        data={data}
        currentPage={currentSongPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentSongPage}
        totalPages={Math.ceil(Object.keys(songCounts).length / itemsPerPage)}
      />
      <Pagination
        currentPage={currentSongPage}
        totalPages={Math.ceil(Object.keys(songCounts).length / itemsPerPage)}
        onPageChange={setCurrentSongPage}
      />
      <ArtistCountTable
        data={data}
        currentPage={currentArtistPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentArtistPage}
        totalPages={Math.ceil(Object.keys(artistCounts).length / itemsPerPage)}
      />
      <Pagination
        currentPage={currentArtistPage}
        totalPages={Math.ceil(Object.keys(artistCounts).length / itemsPerPage)}
        onPageChange={setCurrentArtistPage}
      />
    </div>
  );
}

export default App;
