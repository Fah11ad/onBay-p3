const express = require("express");
const router = express.Router();
const Vi = require("../model/Villas")

//create villa
router.post("/create", (req, res) => {
  let vi = new Vi();
  vi.name = req.body.name
  vi.owner = req.body.owner
  vi.city = req.body.city
  vi.price = req.body.price
  vi.image = req.body.image
  vi.facilities = req.body.facilities
  vi.area = req.body.body
  vi.description = req.body.description
  vi.guests = req.body.guests
  vi.x = req.body.x
  vi.y = req.body.y
  vi.image = req.body.image

  vi
    .save()
    .then(() => { res.json("Successfully added new villa") })
    .catch(err => { res.json(err) })
})

//get owner's villas
router.get("/owner/:id", (req, res) => {
  Vi.find({ owner: req.params.id })
    .then(m => {res.json(m)})
    .catch(err => {res.json(err)})
})

//put villa's rate
router.put("/rate/:id", (req, res) => {
  console.log(req.body)
  Vi.findByIdAndUpdate(req.params.id, { $push: { ratings: req.body } }, (err, updatedModel) => {
    if (err) {
      console.log(err)
    }
  })
    .then(() => { res.json("successfully updated") })
    .catch(err => { res.json(err) })
})

//get villa's ratings
router.get("/rates/:id", (req, res) => {
  Vi.findById(req.params.id, function (err, user) { })
    .then((item) => { res.json(item.ratings) })
    .catch(err=>res.json(err))
})

//put villa's review
router.put("/review/:id", (req, res) => {
  console.log("inside add review backend")
  console.log(req.body)
  
  Vi.findByIdAndUpdate(req.params.id, { $push: { reviews: req.body } }, (err, updatedModel) => {
    console.log("added review")
    if (err) {
      console.log(err)
    }
  })
    .then(() => { res.json("successfully added review") })
    .catch(err => { res.json(err) })
})

//get villa's reviews
router.get("/review/:id", (req, res) => {
  Vi.findById(req.params.id, function (err, user) { })
    .then((item) => { res.json(item.reviews) })
})

//edit villa
router.put("/:id", (req, res) => {
  let villaUpdate = {
    name: req.body.name,
    price: req.body.price,
    facilities: req.body.facilities,
    description: req.body.description
  }
  Vi.findByIdAndUpdate(req.params.id, villaUpdate, (err, updatedModel) => {
    console.log("updated")
  })
    .then(() => { res.json("successfully updates") })
    .catch(err => { res.json(err) })
})

//delete villa
router.delete('/:id', (req, res) => {
  Vi.findByIdAndRemove(req.params.id, (err, data) => {
    console.log("deleted")
  })
    .then(() => { res.json("successfully deleted") })
    .catch(err => { res.json("error") })
})

//get all villas
router.get("/", (req, res) => {
  Vi.find()
    .then((m) => { res.json(m) })
    .catch((err) => {
      res.json({ error: err });
    });
})

module.exports = router;
