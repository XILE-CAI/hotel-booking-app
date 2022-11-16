import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import "./list.css"
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { format, min } from "date-fns"
import { DateRange } from "react-date-range"
import SearchItem from '../../components/searchItem/SearchItem'
import useFetch from '../../hooks/useFetch'

const List = () => {


  //accept state from header component
  const location = useLocation()
  const [destination, setDestination] = useState(location.state.destination)
  const [date, setDate] = useState(location.state.date)
  const [options, setOptions] = useState(location.state.options)
  //setup open date calender
  const [openDate,setOpenDate] = useState(false)
  const [min,setMin] = useState(undefined)
  const [max,setMax] = useState(undefined)

  const {data,loading ,error,reFetch} = useFetch(`http://localhost:8800/api/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`)
  
  const handleClick = () => {
    reFetch()
  }
  return (
    <div>
        <Navbar />
        <Header type="list" />
        <div className="listContainer">
          <div className="listWrapper">
              {/* left side search menu */}
              <div className="listSearch">
                <h1 className='lsTitle'>Search</h1>
                {/* show destination */}
                <div className="lsItem">
                  <label>Destination</label>
                  <input type="text" placeholder={destination} />
                </div>
                {/* show traveling date range */}
                <div className="lsItem">
                  <label>Check-in Date</label>
                  <span onClick={() => {setOpenDate(!openDate)}}>{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
                  {openDate && <DateRange
                    onChange={(item) => setDate([item.selection])}
                    ranges={date}
                    minDate={new Date()}
                  />}
                </div>
                {/* show how many people and room booking */}
                <div className="lsItem">
                  <label>Options</label>
                  <div className="lsOptions">
                    <div className="lsOptionItem">
                      <span className="lsOptionText">
                        Min price <small>per night</small>
                      </span>
                      <input onChange={e=>setMin(e.target.value)} type="number" className="lsOptionInput" />
                    </div>
                    <div className="lsOptionItem">
                      <span className="lsOptionText">
                        Max price <small>per night</small>
                      </span>
                      <input onChange={e=>setMax(e.target.value)} type="number" className="lsOptionInput" />
                    </div>
                    <div className="lsOptionItem">
                      <span className="lsOptionText">
                        Adult
                      </span>
                      <input type="number" min={1} className="lsOptionInput" placeholder={options.adult} />
                    </div>
                    <div className="lsOptionItem">
                      <span className="lsOptionText">
                        Children
                      </span>
                      <input type="number" min={0} className="lsOptionInput" placeholder={options.children}/>
                    </div>
                    <div className="lsOptionItem">
                      <span className="lsOptionText">
                        Room
                      </span>
                      <input type="number" min={1} className="lsOptionInput" placeholder={options.room}/>
                    </div>
                  </div>
                </div>
                <button onClick={handleClick}>Search</button>
              </div>

              {/* right side shows search results */}
              <div className="listResult">
                { loading ? "Loading please wait" :<>
                  {data.map(item => (
                    <SearchItem item={item} key={item._id}/>
                  ))}
                </>}
              </div>
          </div>
            
        </div>
    </div>
  )
}

export default List