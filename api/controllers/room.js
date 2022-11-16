import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

//create a room
export const createRoom = async (req, res, next) => {

    //get the hotel id that room belongs to
    const hotelId = req.params.hotelid;
    //create a new room
    const newRoom = new Room(req.body)

    try {
        const savedRoom = await newRoom.save()
        try {
            //add room id to appointed hotel
            await Hotel.findByIdAndUpdate(hotelId, {
                $push:{ rooms: savedRoom._id }
            })
        } catch (err) {
            next(err)
        }
        res.status(200).json(savedRoom)
    } catch (err) {
        next(err)
    }
}

//update a room
export const updateRoom = async (req, res, next) => {
    try {
      const updatedRoom = await Room.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedRoom);
    } catch (err) {
      next(err);
    }
};

// delete a room
export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    try {
        //find the room by room id
        await Room.findByIdAndDelete(req.params.id);
        try {
            //find the hotel that need to remove a room
            await Hotel.findByIdAndUpdate(hotelId, {
                $pull: { rooms: req.params.id },
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json("Room has been deleted.");
    } catch (err) {
        next(err);
    }
};


//get a room
export const getRoom = async (req, res, next) => {
    try {
      const room = await Room.findById(req.params.id);
      res.status(200).json(room);
    } catch (err) {
      next(err);
    }
};

//get all rooms
export const getRooms = async (req, res, next) => {
    try {
      const rooms = await Room.find();
      res.status(200).json(rooms);
    } catch (err) {
      next(err);
    }
};