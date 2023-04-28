import mongoose from "mongoose";

const bookingModel = mongoose.Schema({
    id: {
        type: Int16Array,
        required: ['true', "Please add an id"]
    },

})

export const bookingModel = mongoose.model('booking',bookingModel)