import React from "react"
import searchIcon from "../assets/search.png"
import filterIcon from "../assets/Vector.png"
import arrowDwon from "../assets/arrow-down.png"

const Searchbox = () => {
    return (
        <div className="search_box">
            <div className="input_box">
                <span><img src={searchIcon} alt="" /></span>
                <input type="text" placeholder="Search Project" />
            </div>
            <div className="filter_box">
                <p><span><img src={filterIcon} alt="" /></span>Filter <span><img src={arrowDwon} alt="" /></span></p>
            </div>
        </div>
    )
};

export default Searchbox;
