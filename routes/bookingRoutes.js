const express = require("express");
const router = express.Router();
const Booking = require("../model/Booking")

//create new booking
router.post("/create", (req, res) => {
  let book = new Booking();
  book.customer = req.body.customer
  book.villa = req.body.villa
  book.startAt = req.body.startAt
  book.endAt = req.body.endAt

  book.save()
    .then(() => { console.log("added to booking") })
    .catch(err => { res.json("error") })
})

//get customers bookings
router.get("/:id", (req, res) => {
  Booking.find({ customer: req.params.id })
    .then(m => { res.json(m) })
    .catch(err => res.json(err))
})

//get all bookings
router.get("/", (req, res) => {
  Booking.find()
    .then((m) => { res.json(m) })
    .catch((err) => { res.json(err) })
})

module.exports = router;