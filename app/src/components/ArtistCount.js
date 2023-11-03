import React from "react";
import Pagination from './Pagination';

const ArtistCountTable = ({ data, currentPage, itemsPerPage, onPageChange, totalPages }) => {

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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const artistToDisplay = Object.keys(artistCounts).slice(startIndex, endIndex);

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
          {artistToDisplay.map((artistKey, index) => (
            <tr key={index}>
              <td>{artistKey}</td>
              <td>{artistCounts[artistKey]}</td>
              <td>{formatTime(artistTimes[artistKey])}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  )
}

export default ArtistCountTable
