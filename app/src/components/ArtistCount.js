import React from "react";

const ArtistCountTable = ({ data }) => {

  const formatTime = (ms) => {
    const secs = Math.floor(ms / 1000)
    const days = Math.floor(secs / (3600 * 24))
    const hrs = Math.floor((secs % (3600 * 24)) / 3600)
    const mins = Math.floor((secs % 3600) / 60)
    const remainingSecs = secs % 60

    return `${days} days, ${hrs} hours, ${mins} minutes, ${remainingSecs} seconds`
  };

  const artistCounts = {};
  const artistTimes = {};

  data.forEach((entry) => {
    const artistName = entry.artistName;

    if (artistCounts[artistName]) {
      artistCounts[artistName]++;
      artistTimes[artistName] += entry.msPlayed
    } else {
      artistCounts[artistName] = 1;
      artistTimes[artistName] = entry.msPlayed;
    }
  });

  return (
    <div>
      <h2>Artists By Count</h2>
      <table>
        <thead>
          <tr>
            <th>Artist</th>
            <th>Count</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(artistCounts).map((artistName, i) => (
            <tr key={i}>
              <td>{artistName}</td>
              <td>{artistCounts[artistName]}</td>
              <td>{formatTime(artistTimes[artistName])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ArtistCountTable
