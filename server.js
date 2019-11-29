const express = require("express")
const app = express()
const mongoose = require("mongoose")
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
const PORT = process.env.PORT || 4000;

// const PORT ;

app.use(cors())

var allowedOrigins = ["http://localhost:4000", "http://localhost:3001"];

app.use(
  cors({
    origin: function(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var message =
          "The CORS policy for this application does not allow access from origin " +
          origin;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    }
  })
);


// const conn = mongoose.createConnection(process.env.DEV_DB)
// let gfs

mongoose.connect(
  process.env.DEV_DB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    // gfs = Grid(conn.db, mongoose.mongo)
    // gfs.collection('uploads')
    console.log("connected to mongoDB");
  }
);

// Create storage engine
// const storage = new GridFsStorage({
//   url: process.env.DEV_DB,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err)
//         }
//         const filename = file.originalname
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'uploads',
//         }
//         resolve(fileInfo)
//       })
//     })
//   },
// })

// const upload = multer({ storage })

// app.post('/uploadimage', upload.single('img'), (req, res, err) => {
//   if (err) throw err
//   res.status(201).send()
//   console.log("in post")
// })


// app.get('/uploadimage/:filename', (req, res) => {
//   gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//     // Check if file
//     if (!file || file.length === 0) {
//       return res.status(404).json({
//         err: 'No file exists',
//       })
//     }

//     // Check if image
//     if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
//       // Read output to browser
//       const readstream = gfs.createReadStream(file.filename)
//       readstream.pipe(res)
//     } else {
//       res.status(404).json({
//         err: 'Not an image',
//       })
//     }
//   })
// })

//serves all our static files from the build directory.
app.use(express.static(path.join(__dirname, "build")));

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/user",userRoutes)
app.use("/villa",villaRoutes)
app.use("/booking",bookingRoutes)


// After all routes
// This code essentially serves the index.html file on any unknown routes.
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, function() {
  console.log(`PORT : ${PORT}`);
});