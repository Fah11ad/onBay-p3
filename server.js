const express = require("express")
const app = express()
const mongoose = require("mongoose")
const ejsLayouts = require("express-ejs-layouts")
const dotenv = require("dotenv/config")
const userRoutes = require("./routes/userRoute")
const villaRoutes = require("./routes/villasRoutes")
const bookingRoutes = require("./routes/bookingRoutes")
const cors = require('cors')
const path = require('path')
const multer  = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
var crypto = require('crypto')
const Grid = require('gridfs-stream')

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))

app.set("view engine", "ejs")
app.use(ejsLayouts)


const conn = mongoose.createConnection(process.env.DEV_DB)

let gfs

mongoose.connect(
  process.env.DEV_DB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('uploads')
    console.log("connected to mongoDB");
  }
);

// Create storage engine
const storage = new GridFsStorage({
  url: process.env.DEV_DB,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err)
        }
        const filename = file.originalname
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads',
        }
        resolve(fileInfo)
      })
    })
  },
})

const upload = multer({ storage })

app.post('/uploadimage', upload.single('img'), (req, res, err) => {
  if (err) throw err
  res.status(201).send()
  console.log("in post")
})


app.get('/uploadimage/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists',
      })
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename)
      readstream.pipe(res)
    } else {
      res.status(404).json({
        err: 'Not an image',
      })
    }
  })
})

app.use("/user",userRoutes)
app.use("/villa",villaRoutes)
app.use("/booking",bookingRoutes)

app.listen(4000, () => console.log("express running"));