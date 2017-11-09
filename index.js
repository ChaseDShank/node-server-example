// SERVER ENTRY POINT
console.log("Is this thing on?")
console.log(1 + 1)
// There is no document, window
// DO I KNOW HOW TO WRITE A WEB SERVER?????
// Express
var express = require('express')
var server = express()

server.use(express.static(__dirname + '/public'))
server.get('*', function (req, res, next) {
    // custom logger
    console.log('SOMEONE IS TALKING TO ME')
    next()
})
// server.get('/home', function(req, res, next){
//     res.send('<h1>You are home</h1>')
// })
var cats = ['tom', 'garfield', 'felix']

server.get('/api/cats', function (req, res, next) {
    res.send(cats)
})

server.get('/api/cats/:i', function (req, res, next) {
    var cat = cats[req.params.i]
    if (cat) {
        res.send(cat)
    } else {
        res.status(400).send({ error: 'Yo bad id for a cat man' })
    }
})

// var dogs = ['fido', 'lassie', 'kujo', 'pluto', 'hercules']
// server.get('/api/dogs', function (req, res, next) {
//     res.send(dogs)
// })

// server.get('/api/dogs/:i', function (req, res, next) {
//     var dog = dogs[req.params.i]
//     if (dog) {
//         res.send(dog)
//     } else {
//         res.status(400).send({ error: 'Yo bad id for a dog man' })
//     }
// })

var fakeDb = {
    birds: ['tweety', 'big bird', 'larry bird', 'foghorn leghorn', 'Road Runner'],
    dogs: ['fido', 'lassie', 'kujo', 'pluto', 'hercules']
}

server.get('/api/:resource/findbyname/:name', function (req, res, next) {
    var resource = fakeDb[req.params.resource]
    for (var i = 0; i < resource.length; i++) {
        var entity = resource[i];
        if (entity.includes(req.params.name)) {
            return res.send(entity)
        }

    }
    res.status(400).send({ error: 'Bad request and you should feel bad' })
})


server.get('/api/:resource/:id?', function (req, res, next) {
    if (fakeDb[req.params.resource] && !req.params.id) {
        res.send(fakeDb[req.params.resource])
    } else if (fakeDb[req.params.resource] && req.params.id) {
        if (fakeDb[req.params.resource][req.params.id]) {
            res.send(fakeDb[req.params.resource][req.params.id])
        } else {
            res.status(400).send({ error: 'Bad request for ' + req.params.resource })
        }
    } else {
        res.status(400).send({ error: 'Bad request for we dont have any' + req.params.resource })
    }
})
server.delete('/api/:resource/:id?', function(){})

server.listen(8080, function () {
    console.log('The server is running')
})