import React from "react";
import Pagination from './Pagination';

const ArtistCountTable = ({ data, currentPage, itemsPerPage, onPageChange, totalPages }) => {

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
    <div className="container">
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
      {/* <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} /> */}
    </div>
  )
}

export default ArtistCountTable
