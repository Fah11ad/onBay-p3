const express = require("express");
const router = express.Router();
const Vi = require("../model/Villas")
const Booking = require("../model/Booking")

router.post("/create", (req, res) => {
  let vi = new Vi();
  console.log(req.body)
  vi.name = req.body.name;
  vi.owner = req.body.owner;
  vi.city = req.body.city;
  //   vi.price = req.body.price
  ;
  vi.description = req.body.description;
  vi.guests = req.body.guests;
  //   vi.x=req.body.x;
  //   vi.y=req.body.y;

  console.log(req.body.name);

  vi
    .save()
  // .then((m)=>{console.log(m)})

  // .then((m) => {
  //   res.json({ m });
  // })
  // .catch((e) => {
  //   res.json({ e });
  // });
}
);

router.get("/create", (req, res) => {
  // res.render("villa/createVilla")
});

router.get("/search", (req, res) => {
  //find the villas in this city with this number of guests
  //then find the villas that aren't in the time period 
  //{region: "NA",sector:"Some Sector"}
  console.log("in search")
  // console.log(req.query.city)
  // console.log(req.query.startAt)
  // console.log(req.query.endAt)
  // console.log(req.query.guests)

  let results = null

  let counter = -1

  Vi.find({ city: req.query.city, guests: req.query.guests })
    .then(item => {
      // res.json(item)
      console.log("villa obj")
      // console.log(item)
      item.map(xxx=>{
        // console.log("villas")
        // console.log(xxx._id)
      //   db.inventory.find( {
      //     $and : [
      //         { $or : [ { price : 0.99 }, { price : 1.99 } ] },
      //         { $or : [ { sale : true }, { qty : { $lt : 20 } } ] }
      //     ]
      // } )
          
      //villa:xxx._id
        Booking.find({ $and : [{vill:xxx._id} ]})
        .then(bitem =>{
          // console.log("in bitem")
            counter++
        })
        
      })

      setTimeout(()=>{res.json(counter)},1000)

      // Booking.find({villa:"5ddb9475996d343498b2222a"}).
        // then(bitem => {
          // console.log("hiiii")
          // console.log(bitem)
          // console.log(bitem.map(x => {
            // console.log("x.villa "+x.villa)
          // }))
          //  console.log("after the find of booking") 
        // })
    })
})

router.put("/rate/:id", (req, res) => {
  console.log(req.body)
  Vi.findByIdAndUpdate(req.params.id, { $push: { ratings: req.body } }, (err, updatedModel) => {
    console.log("added rating")
    if (err) {
      console.log(err)
    }
  })
})

router.get("/rates/:id", (req, res) => {
  Vi.findById(req.params.id, function (err, user) { })
    .then((item) => { res.json(item.ratings) })
})


router.put("/review/:id", (req, res) => {
  console.log(req.body)
  Vi.findByIdAndUpdate(req.params.id, { $push: { reviews: req.body } }, (err, updatedModel) => {
    console.log("added review")
    if (err) {
      console.log(err)
    }
  })
})

router.get("/review/:id", (req, res) => {
  Vi.findById(req.params.id, function (err, user) { })
    .then((item) => { res.json(item.reviews) })
})

router.put("/:id", (req, res) => {
  Vi.findByIdAndUpdate(req.params.id, req.body, (err, updatedModel) => {
    console.log("updated")
  })

})


router.delete('/:id', (req, res) => {
  Vi.findByIdAndRemove(req.params.id, (err, data) => {
    console.log("deleted")
    //redirect back to fruits index
  });
});

router.get("/", (req, res) => {
  Vi.find()
    //   .where('pricePerNight').gt(100)
    .then((v) => {
      // console.log(v)
      res.json(v)
      // res.render("villa/viewVillas", { v });
    })
    .catch((err) => {
      res.json({ error: err });
    });
});


module.exports = router;
