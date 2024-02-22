const express = require('express')
const router = express.Router()
const fs = require('fs')
const formidable = require('formidable')

class Data {
  constructor() {
    this.file_name = 'data.dump'
    this.data = null
    // this.data = {
    //   schedule: {},
    //   director: [],
    // }
  }
  get() {
    if (this.data)
      return this.data
    var str = fs.readFileSync(this.file_name)
    // console.log(str, str.length, !!str)
    if (0 == str.length) {
      this.data = {}
      return this.data
    }
    this.data = JSON.parse(str)
    return this.data
  }

  save() {
    fs.writeFileSync(this.file_name, JSON.stringify(this.data))
  }

  reset() {
    fs.writeFileSync(this.file_name, JSON.stringify({}))
  }
}
var data = new Data()

router.get('/favicon.ico', function (req, res, next) {
  res.end()
})

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.post('/scheduleReq', function (req, res, next) {
  var rb = req.body
  var d = data.get()
  d.schedule = d.schedule || {}
  d.schedule[rb.director_name] = {
    table_data: rb.table_data,
    status: rb.status
  }
  // console.log(d)
  data.save()
  res.send({ success: 0 })
})

router.post('/getScheduleReq', function (req, res, next) {
  var director_name = req.body.director_name
  var d = data.get()
  var rb = d.schedule || {}
  rb = rb[director_name] || {}
  res.send({
    director_name: director_name,
    table_data: rb.table_data || [],
    status: rb.status || ''
  })
})

router.post('/upload_file', function (req, res, next) {
  const form = new formidable.IncomingForm({
    uploadDir: __dirname + '/../upload',
    filename: function () {
      return "upload.txt"
    },
    multiples: true,
    keepExtensions: true
  })

  form.parse(req, (err, fields, files) => {
    if (err != null) {
      console.log(err)
      return res.status(400).json({ message: err.message })
    }

    // console.log("-------- form", files)
    const [firstFileName] = Object.keys(files)

    res.json({ filename: firstFileName })
  })
})

router.post("/submitDirectorReq", (req, res, next) => {
  var table_data = req.body.table_data
  var d = data.get()
  d.director = table_data || []
  data.save()
  res.send({ success: 0 })
})

router.post('/getDirectorReq', (req, res, next) => {
  var d = data.get()
  res.send({
    table_data: d.director || [],
  })
})

module.exports = router
