const express = require("express");
const router = express.Router();
const Booking = require("../model/Booking")

router.post("/create", (req, res) => {
    let book = new Booking();
      // console.log(req.body)
      console.log("inside booking in bookingroute")
      
    book.customer = req.body.customer //      req.body.customer;
    book.villa = req.body.villa;
    book.startAt = req.body.startAt;
    book.endAt = req.body.endAt;  
  
    book.save()
    .then(()=>{console.log("added to booking")})
  }
  );

  // router.get("/:id",(req,res)=>{
  //   console.log("Boooooooooooooooooooookingggg")
  //   Booking.find({villa: req.params.id }).
  //   then(item=>{
      
  //   })
  // })

  router.get("/", (req, res) => {
    Booking.find()
    // .populate("customer")
    // .populate("villa")
  //   .where('pricePerNight').gt(100)
      .then((v) => {
          // console.log(v)
          res.json(v)
          // console.log(v)
          // res.render("villa/viewVillas", { v });
      })
      .catch((err) => {
        res.json({ error: err });
      });
  });

  module.exports = router;