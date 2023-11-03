import React from 'react'

const SongCountTable = ({ data, currentPage, itemsPerPage, onPageChange, totalPages }) => {

  function formatTime(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const formattedTime = [];

    if (days > 0) formattedTime.push(`${days} days`);

    if (hours % 24 > 0) formattedTime.push(`${hours % 24} hrs`);

    if (minutes % 60 > 0) formattedTime.push(`${minutes % 60} mins`);

    if (seconds % 60 > 0) formattedTime.push(`${seconds % 60} secs`);

    return formattedTime.join(', ');
  }

  const songCounts = {};
  const songTimes = {};

  data.forEach((entry) => {
    const songKey = `${entry.songName} - ${entry.trackName}`;

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
    <div className="container">
      <h2>Songs by Count</h2>
      <table>
        <colgroup>
          <col style={{ width: '65%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '25%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>Song Title</th>
            <th>Count</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {songsToDisplay.map((songKey, index) => {
            const artistName = data[songCounts[songKey]].artistName || 'Unknown Artist';
            const trackName = data[songCounts[songKey]].trackName || 'Unknown Track';
            const count = songCounts[songKey];
            const colorValue = Math.min(255, (count / 100) * 150); // Adjusted color value

            const textColor = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
            const formattedSongKey = `${artistName} - ${trackName}`
            return (
            <tr
              key={index}
              className="dynamic-text-color"
                style={{
                  color: textColor,
                }}
            >
                <td>{formattedSongKey}</td>
                <td>{songCounts[songKey]}</td>
                <td>{formatTime(songTimes[songKey])}</td>
            </tr>
          )})}
        </tbody>
      </table>
      {/* <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} /> */}
    </div>
  )
}

export default SongCountTable
