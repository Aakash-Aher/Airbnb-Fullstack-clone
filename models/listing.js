const mongoose = require("mongoose");
const Schema= mongoose.Schema;

const listingSchema=new Schema({
    title: {
        type:String,
        required:true,
    },
    description:String,
     image: {
    filename: {
      type: String,
      default: "listingimage"
    },
    url: {
      type: String,
      default: "https://images.pexels.com/photos/38238/maldives-ile-beach-sun-38238.jpeg"
    }
  },
    price:Number,
    location:String,
    country:String,

});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;