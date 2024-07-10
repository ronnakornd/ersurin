import React, {useEffect, useState} from 'react';
import YearSelector from '../components/YearSelector';
import MonthSelector from '../components/MonthSelector';
const Home = () => {
    const [selectedMonth, setSelectedMonth] = useState();
    const [selectedYear, setSelectedYear] = useState();
    return (
        <div className="w-full flex justify-start items-center">
            <div className="flex justify-center items-center gap-2 p-5">
             <h1>เลือกเดือน</h1>
             <MonthSelector onChange={setSelectedMonth}/>
             <YearSelector onChange={setSelectedYear}/>
            </div>
            <div className='flex gap-2' >
                <button className='btn btn-error'>แก้ไขวันหยุด</button>
                <button className='btn btn-primary'>
                    save
                </button>
            </div>
        </div>
    );
};

export default Home;