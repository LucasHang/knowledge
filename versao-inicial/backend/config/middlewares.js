const bodyPaser = require('body-parser')
const cors = require('cors')

module.exports = app =>{
    app.use(bodyPaser.json())
    app.use(cors())
}