import { useState } from 'react';
import { useEffect } from "react";

const card = ({setValue, setSearchText, searchText}) => {

    const [sliderVal, setSliderVal] = useState(50);
      
    const handleChange = (event) => {

        // setValue is the amount of comics to display from 0 to 20 by 5s
        // setSliderVal is the slider value from 0 to 100 by 25s
        if (event.target.value === '0') {
            setValue(0);
        } else if (event.target.value === '25') {
            setValue(5);
        } else if (event.target.value === '50') {
            setValue(10);
        } else if (event.target.value === '75') {
            setValue(15);
        } else { // 100
            setValue(20);
        }

        
        setSearchText("");
        setSliderVal(event.target.value);
    };

    // Search text

    const handleChangeTyping = (event) => {
      setSearchText(event.target.value);
    };

    return(
        <div id="card" className='section'>
        <input
            type="range"
            min="0"
            max="100"
            step="25"
            value={sliderVal}
            onChange={handleChange}
        />
      <output>{sliderVal}%</output>

      <input
        id="textSearch"
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={handleChangeTyping}
      />
      {/* <button id="btnSearch">Search</button> */}

        </div>
    )
}

export default card;