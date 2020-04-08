const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 8080
const userController = require('./server-side/controllers/user-controller')
const listRouter = require('./server-side/routes/router')
const cookieParser = require('cookie-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.use(cookieParser())
app.use(listRouter)

app.get('/update-task/:id', (req, res) =>{
    const id = req.params
    res.render('update-task.ejs', { taskId: id })
})



app.listen(port, () => {
  console.log(`Now listening on port ${port}`)
})
