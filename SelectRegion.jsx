import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const SelectRegion = () => {
    // const regions = ['North America', 'Europe', 'Asia', 'South America', 'Africa', 'Australia'];
    const regions = [
  { name: 'United States', code: 'US' },
  { name: 'Canada', code: 'CA' },
  { name: 'United Kingdom', code: 'GB' },
  { name: 'Germany', code: 'DE' },
  { name: 'France', code: 'FR' },
  { name: 'India', code: 'IN' },
  { name: 'Japan', code: 'JP' },
  { name: 'South Korea', code: 'KR' },
  { name: 'Brazil', code: 'BR' },
  { name: 'Mexico', code: 'MX' },
  { name: 'Australia', code: 'AU' },
  { name: 'Russia', code: 'RU' },
  { name: 'South Africa', code: 'ZA' },
  { name: 'Saudi Arabia', code: 'SA' },
];
    const [selectedRegion, setSelectedRegion] = useState(null);
    // let regionSent=null;
  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    // regionSent=selectedRegion.code;
  };
  
  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4 mt-20">
      <h1 className="text-xl font-semibold">Select a Region</h1>
      <div className="grid grid-cols-2 gap-4">
        {regions.map((region) => (
          <button
            key={region}
            onClick={() => handleRegionClick(region)}
            className={`py-2 px-4 rounded-xl shadow ${
              selectedRegion === region ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
            } hover:bg-gray-300`}
          >
            {region.name}
          </button>
        ))}
      </div>
      {selectedRegion && (
        <div className="mt-4 text-lg text-gray-700">
          Selected Region: <span className="font-bold">{selectedRegion.name} </span>
        </div>
      )}
      <Link to='/trending' state={{region:selectedRegion}}><button className='w-[30%] h-[10%] ml-[35%] py-2 px-4 rounded-xl shadow bg-blue-300 text-gray-800'>Go</button></Link>
    </div>
  )
}

export default SelectRegion
