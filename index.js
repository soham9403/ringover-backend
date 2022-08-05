import express from 'express'

import { createServer } from 'http'
import fileUpload from 'express-fileupload'
import dotenv from 'dotenv'
import cors from 'cors'

import indexroute from './routes/index.js'

dotenv.config()
const app = express()

const httpServer = createServer(app, {
  cors: '*'
})

// export const  connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//  database:'ringover_task'
// });

// connection.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.message);
//     return;
//   }

//   console.log('connected as id ' + connection.threadId);
// });

import path from 'path'
import { fileURLToPath } from 'url'
import multer from 'multer'
import { getRandomIntInclusive } from './helper/helperFunction.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
global.__basedir = __dirname
export const port = process.env.PORT || '8000'
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__basedir, 'public','uploads'))
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname +
        getRandomIntInclusive(111111,999999)+
        '-' +
        Date.now() +
        path.extname(file.originalname)
    )
  }
})
const upload = multer({ storage: storage }).single('image')
app.use(upload)

app.use(express.static('public'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(fileUpload())

app.use('/api/', indexroute)

httpServer.listen(port, () => {
  console.log('APP is running on port ' + port)
})
