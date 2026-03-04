const express= require("express");
const app = express();
const mongoose = require("mongoose");
const path= require("path");
const Listing= require("./models/listing.js");

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));


app.get("/", (req,res) =>{
res.send("hhh");
});

app.get("/listings",async (req,res) =>{
 const allListings= await Listing.find({});
 res.render("listings/index",{allListings});


});

app.get("/listings/:id",async(req,res) =>{
 let{id}=req.params;
const listing= await Listing.findById(id);
res.render("listings/show",{listing});

});

//app.get("/testListing",async (req,res) =>{
 //let sampleListing= new Listing({
   //title:"my new villa",
   //description:"by the beach",
   //price:1200,
   //location:"new goa ,Goa",
   //country:"India",

 //});
 //await sampleListing.save();
 //console.log("sample is saved");
 //res.send("successful;")
//});

app.listen(8080, () => {
console.log("sever is listening");
});
