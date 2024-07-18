import React, { useState, useEffect } from "react";


// Function to generate dates for a given month and year
const generateDates = (month, year) => {
  const dates = [];
  const date = new Date(year, month - 1, 1); // JavaScript months are 0-based

  while (date.getMonth() === month - 1) {
    dates.push({
      day: new Date(date),
      holiday: date.getDay() === 0 || date.getDay() === 6 ? true : false,
      morning: null,
      evening: null,
      extra: null,
      night: null,
    });
    date.setDate(date.getDate() + 1);
  }

  return dates;
};

// Array to map weekdays to Thai names
const weekdaysInThai = [
  "อาทิตย์", // Sunday
  "จันทร์", // Monday
  "อังคาร", // Tuesday
  "พุธ", // Wednesday
  "พฤหัสบดี", // Thursday
  "ศุกร์", // Friday
  "เสาร์", // Saturday
];

const dayColor = [
  "bg-red-300", // Sunday
  "bg-yellow-300", // Monday
  "bg-pink-300", // Tuesday
  "bg-green-300", // Wednesday
  "bg-orange-300", // Thursday
  "bg-blue-300", // Friday
  "bg-purple-300", // Saturday
];

const DateTable = ({ month, year, editHoliday, selectedMember, members, onChange, value }) => {
  const [dates, setDates] = useState(generateDates(month, year));
  const toggleHoliday = (index) => {
    if (editHoliday) {
      dates[index].holiday = !dates[index].holiday;
      setDates([...dates]);
    }
  };
  const selectShift = (index, shift) => {
    if(!selectedMember) return;
    let currentDates = dates;
    if (currentDates[index][shift] == selectedMember) {
      currentDates[index][shift] = null;
      setDates([...currentDates]);
      return;
    }
    currentDates[index][shift] = selectedMember;
    onChange([...currentDates]);
    setDates([...currentDates]);
  };

  useEffect(() => {
    if (value != null) {
      setDates(value);
    }else{
      setDates(generateDates(month, year));
      onChange(generateDates(month, year));
    }
  }, [month, year,value, members]);

  return (
    <div className="container p-5">
      <h2 className="text-2xl font-bold mb-4">
        ตารางเวรนอกเวลา {month}/{year}
      </h2>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2 border-black text-left w-2/12">
              วันที่
            </th>
            <th className="border border-black border-l-0">วันหยุด</th>
            <th className="border px-4 py-2 border-black border-l-0 ">
              8.00-16.00
            </th>
            <th className="border px-4 py-2 border-black border-l-0 ">
              16.00-24.00
            </th>
            <th className="border px-4 py-2 border-black border-l-0 ">
              18.00-22.00
            </th>
            <th className="border px-4 py-2 border-black border-l-0 ">
              24.00-8.00
            </th>
          </tr>
        </thead>
        <tbody>
          {dates.map((date, index) => (
            <tr key={index}>
              <td
                className={`border px-3 py-2 border-black  ${
                  dayColor[date.day.getDay()]
                }`}
              >
                {weekdaysInThai[date.day.getDay()]}{" "}
                {date.day.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                })}
              </td>
              <td
                className={`border border-black border-l-0 hover:bg-slate-600 ${
                  date.holiday ? "bg-red-400" : ""
                }`}
                onClick={() => toggleHoliday(index)}
              ></td>
              <td
                className={`border px-4 py-2 border-black border-l-0   ${date.holiday ? "" : "bg-slate-400"}`}
                onClick={() => selectShift(index, "morning")}
                style={{ backgroundColor: date.morning ? members.find(member => member.id == date.morning.value)?.color : "" }}
              >
                {date.morning ? members.find(member => member.id == date.morning.value)?.name : ""}
              </td>
              <td
                className={`border px-4 py-2 border-black border-l-0`}
                style={{ backgroundColor: date.evening ? members.find(member => member.id == date.evening.value)?.color : "" }}
                onClick={() => selectShift(index, "evening")}
              >
                {date.evening ? members.find(member => member.id == date.evening.value)?.name : ""}
              </td>
              <td
                className={`border px-4 py-2 border-black border-l-0  ${date.holiday ? "bg-slate-400" : ""}`}
                onClick={() => selectShift(index, "extra")}
                style={{ backgroundColor: date.extra ?  members.find(member => member.id == date.extra.value)?.color: "" }}
              >
                {date.extra ? members.find(member => member.id == date.extra.value)?.name: ""}
              </td>
              <td
                className="border px-4 py-2 border-black border-l-0"
                onClick={() => selectShift(index, "night")}
                style={{ backgroundColor: date.night? members.find(member => member.id == date.night.value)?.color: "" }}
              >
                {date.night ? members.find(member => member.id == date.night.value)?.name : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DateTable;
