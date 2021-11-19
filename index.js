//CONST

const express = require('express')
const bodyParser = require('body-parser')


const app = express()
const MongoClient = require('mongodb').MongoClient
const mongodb = require("mongodb");


app.use(bodyParser.urlencoded({ extended: true }))

//GESTIONNAIRE DE TEMPLATE JS
app.set('view engine', 'ejs')

app.use(bodyParser.json())


//LANCEMENT DU SERVEUR SUR LE PORT : 3000
app.listen(3000, function() {
    console.log('listening on 3000')
})


//PERMET DE POINTER VERS PUBLIC
app.use(express.static('public'))


//CONNEXION CLIENT MONGODB
MongoClient.connect("mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false", { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('DB')
        const quotesCollection = db.collection('MyCollection')

        //AFFICHAGE LISTE
        app.get('/', (req, res) => {
                db.collection('MyCollection').find().toArray()
                    .then(results => {
                        console.log(results)
                        res.render('index.ejs', { quotesCollection: results })
                    })
                    .catch(error => console.error(error))
                    //res.sendFile(__dirname + '/index.html')

            })
            //AJOUT
        app.post('/quotes', (req, res) => {
            quotesCollection.insertOne(req.body)
                .then(result => {
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })

        //SUPPRESSION
        app.delete('/quotes', (req, res) => {
            console.log("ID: " + req.body._id);
            let delete_id = req.body._id

            quotesCollection.deleteOne({
                    _id: new mongodb.ObjectId(delete_id.toString())
                })
                .then(result => {
                    res.json(`Deleted quote`)

                })
                .catch(error => console.error(error))
        })

    })
    .catch(error => console.error(error))