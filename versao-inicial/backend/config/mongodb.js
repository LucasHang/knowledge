const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/knowledge_stats', {useNewUrlParser:true})
    .catch(e =>{
        const msg = "Error: Não foi possível conectar com monboDB"
        console.log('\x1b[41m%s\x1b[37', msg, '\x1b[0m')
    })