import { useEffect, useState } from 'react'
import axios from "axios";

const useFetch = (url) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchData = async ()=>{
            //start loading
            setLoading(true)
            try {
                //fetch data using axios
                const res = await axios.get(url)
                //if no error then setData
                setData(res.data)
            } catch (error) {
                setError(error)
            }
            //cancel loading
            setLoading(false)
        }

        fetchData()
    },[url])

    const reFetch = async ()=>{
        //start loading
        setLoading(true)
        try {
            //fetch data using axios
            const res = await axios.get(url)
            //if no error then setData
            setData(res.data)
        } catch (error) {
            setError(error)
        }
        //cancel loading
        setLoading(false)
    }

    return {data, loading, error, reFetch}
}

export default useFetch;

