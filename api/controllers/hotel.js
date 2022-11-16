import Hotel from "../models/Hotel.js"

//create hotel
export const createHotel = async (req,res,next) => {
    const newHotel = new Hotel(req.body)

    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (err) {
        next(err)
    }

}

//UPDATE hotel
export const updateHotel = async (req,res,next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id,{ $set:req.body},{new :true})
        res.status(200).json(updatedHotel)
    } catch (err) {
        next(err)
    }
}

//delete hotel
export const deleteHotel = async (req,res,next) => {
    try {
        await newHotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been deleted.")
    } catch (err) {
        next(err)
    }
}

//get a hotel by id
export const getHotel = async (req,res,next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel)
    } catch (err) {
        next(err)
    }
}

//get all hotels
export const getHotels = async (req,res,next) => {
    const { min, max, ...others} = req.query
    try {
        const hotels = await Hotel.find({...others,cheapestPrice:{$gt:min || 1,$lt:max || 999}}).limit(req.query.limit);
        res.status(200).json(hotels)
    } catch (err) {
        next(err)
    }
}

//get hotel by count city
export const countByCity = async (req,res,next) => {
    const cities = req.query.cities.split(",")
    try {
    // cunt the number of hotel by city
        const list = await Promise.all(cities.map(city=>{
        // return Hotel.find({city : city}).length
        return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}

//get hotel by count type
export const countByType = async (req,res,next) => {

    try {
    // cunt the number of hotel by type
       //only have 5 types
        const hotelCount = await Hotel.countDocuments({type:"hotel"})
        const apartmentCount =await Hotel.countDocuments({type:"apartment"})
        const resortCount = await Hotel.countDocuments({type:"resort"})
        const villaCount = await Hotel.countDocuments({type:"villa"})
        const cabinCount =await Hotel.countDocuments({type:"cabin"})
        res.status(200).json([
            {type:"hotel",count:hotelCount},
            {type:"apartment",count:apartmentCount},
            {type:"resorts",count:resortCount},
            {type:"villas",count:villaCount},
            {type:"cabins",count:cabinCount}
        ])
    } catch (err) {
        next(err)
    }
}