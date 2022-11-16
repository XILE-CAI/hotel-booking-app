import React from 'react'
import "./searchItem.css"
import { Link }from "react-router-dom"

//3 section left img ,middle info , right price and rate
const SearchItem = ({item}) => {
  return (
    <div className="searchItem">
        {/* first section show img */}
        <img
            src={item.photos[0]}
            alt="img of hotel"
            className="siImg"
        />
        {/* second section to show info */}
        <div className="siDesc">
            <h1 className="siTitle">{item.name}</h1>
            <span className="siDistance">{item.distance}m from center</span>
            <span className="siTaxiOp">Free airport taxi</span>
            <span className="siSubtitle">
                Studio Apartment with Air conditioning
            </span>
            <span className="siFeatures">
                {item.desc}
            </span>
            <span className="siCancelOp">Free cancellation </span>
            <span className="siCancelOpSubtitle">
                You can cancel later, so lock in this great price today!
            </span>
        </div>
        {/* third section to show price and rate */}
        <div className="siDetails">
            {item.rating && <div className="siRating">
                <span>Excellent</span>
                <button>{item.rating}</button>
            </div>}
            <div className="siDetailTexts">
                <span className="siPrice">${item.cheapestPrice}</span>
                <span className="siTaxOp">Includes taxes and fees</span>
                <Link to={`/hotels/${item._id}`}>
                <   button className="siCheckButton">See availability</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default SearchItem