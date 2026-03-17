const express= require("express");
const app = express();
const mongoose = require("mongoose");
const path= require("path");
const Listing= require("./models/listing.js");
const methodOverride=require("method-override");
const ejsMate= require("ejs-mate");
const wrapAsync = require("./utils/wrapasync.js");
const ExpressError= require("./utils/ExpressError.js");

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


app.get("/", (req,res) =>{
res.send("welcome");
});

app.get("/listings",wrapAsync(async (req,res) =>{
 const allListings= await Listing.find({});
 res.render("listings/index",{allListings});


}));

app.get("/listings/new", (req,res) =>{
  res.render("listings/new");
});

app.get("/listings/:id", wrapAsync(async(req,res) =>{
 let{id}=req.params;
const listing= await Listing.findById(id);
res.render("listings/show",{listing});

}));

app.post("/listings", wrapAsync(
  async (req, res,next) => {
      const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");  
}));
 
app.get("/listings/:id/edit",wrapAsync( async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit", { listing });
}));

app.put("/listings/:id",wrapAsync( async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
 res.redirect(`/listings/${id}`);
}));

app.delete("/listings/:id",wrapAsync( async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);

  res.redirect("/listings");
}));


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

app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});



app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).send(message);
});


