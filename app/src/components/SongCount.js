import React from 'react'

const SongCountTable = ({data}) => {

  const formatTime = (ms) => {
    const secs = Math.floor(ms/1000)
    const days = Math.floor(secs / (3600 * 24))
    const hrs = Math.floor((secs % (3600 * 24)) / 3600)
    const mins = Math.floor((secs % 3600) / 60)
    const remainingSecs = secs % 60

    return `${days} days, ${hrs} hours, ${mins} minutes, ${remainingSecs} seconds`
  };

  const songCounts = {};
  const songTimes = {};

  data.forEach((entry) => {
    const songKey = `${entry.artistName} - ${entry.trackName}`;

    if (songCounts[songKey]) {
      songCounts[songKey]++
      songTimes[songKey] += entry.msPlayed;
    } else {
      songCounts[songKey] = 1
      songTimes[songKey] = entry.msPlayed;
    }
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const songsToDisplay = Object.keys(songCounts).slice(startIndex, endIndex);


  return (
    <div>
      <h2>Songs by Count</h2>
      <table>
        <thead>
          <tr>
            <th>Song Title</th>
            <th>Count</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {songsToDisplay.map((songKey, index) => (
            <tr key={index}>
              <td>{songKey}</td>
              <td>{songCounts[songKey]}</td>
              <td>{formatTime(songTimes[songKey])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SongCountTable
