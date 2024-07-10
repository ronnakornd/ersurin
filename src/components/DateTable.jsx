import React from 'react';

// Function to generate dates for a given month and year
const generateDates = (month, year) => {
  const dates = [];
  const date = new Date(year, month - 1, 1); // JavaScript months are 0-based

  while (date.getMonth() === month - 1) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
};

// Array to map weekdays to Thai names
const weekdaysInThai = [
  'อาทิตย์', // Sunday
  'จันทร์',   // Monday
  'อังคาร',   // Tuesday
  'พุธ',     // Wednesday
  'พฤหัสบดี', // Thursday
  'ศุกร์',    // Friday
  'เสาร์'    // Saturday
];

const DateTable = ({ month, year }) => {
  const dates = generateDates(month, year);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Dates for {month}/{year}</h2>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Weekday (Thai)</th>
            <th className="border px-4 py-2">Column 3</th>
            <th className="border px-4 py-2">Column 4</th>
          </tr>
        </thead>
        <tbody>
          {dates.map((date, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{date.toDateString()}</td>
              <td className="border px-4 py-2">{weekdaysInThai[date.getDay()]}</td>
              <td className="border px-4 py-2">Data 3</td>
              <td className="border px-4 py-2">Data 4</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DateTable;
