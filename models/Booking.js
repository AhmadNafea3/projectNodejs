import mongoose from "mongoose";

const bookingScema =new mongoose.Schema({
userId:{type:mongoose.Schema.Types.ObjectId, ref:"User",required:true},
eventId:{type:mongoose.Schema.Types.ObjectId,ref:"Event",required:true},
seats:{type:Number,required:true,min:1},

status:{
    type:String,
    enum:["confirmed","canceled","waitlist"],
    default:"confirmed",
},

},
{timestamps:true}
);

const Booking =mongoose.model("Booking",bookingScema);
export default Booking;