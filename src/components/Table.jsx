import React from 'react';


export default function Table({ data }) {
  // Accept either a single record object or an array of records
  const records = Array.isArray(data) ? data : (data ? [data] : []);

  if (!records.length) return null;

  const headers = Object.keys(records[0]);

  return (
    <section className="table-wrapper">
      <table className="data-table" role="table">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{toHeader(h)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {records.map((rec, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((h) => (
                <td key={h} data-label={toHeader(h)}>
                  {rec[h] ?? ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}



// Convert snake_case or camelCase keys to human-friendly headers
function toHeader(str) {
  // Insert space before capital letters and replace underscores
  return (
    String(str)
      .replace(/_/g, ' ')
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      .replace(/^\w/, (c) => c.toUpperCase())
  );
}