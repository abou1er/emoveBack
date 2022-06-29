const express = require('express');
let app = express(); // création de l'objet représentant notre application express
let port = 7878;
const mongoose = require('mongoose');
const Voitures = require('./voitures');
const Motos = require('./motos');
const Trottinettes = require('./trottinettes');

app.get('/', function(req, res) { // création de la route sous le verbe get
    res.send('Hello world  ! ') // envoi de hello world a l'utilisateur
})


app.listen(port, () =>  { // ecoute du serveur sur le port 7878
    console.log('le serveur fonctionne')
})

mongoose.connect(
    'mongodb+srv://abou:1234@cluster0.vn3vc.mongodb.net/emove?retryWrites=true&w=majority'
    , err => {
        if (err) throw 'erreur est : ', err;
        console.log('connected to MongoDB')
    });

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');  //r.sH('....', '*' étoile permet la connexion de tous les serveur)
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');  //<----Bonne pratique

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.use(express.json());
app.use(express.urlencoded({extended: false}));


// --------------METHODE VOITURES------------------------------------------
        //*************post*************
app.post('/voitures', async (req, res) => {
    const image = req.body.image;
    const image2 = req.body.image2;
    const image3 = req.body.image3;
    const categorie = req.body.categorie;
    const marque = req.body.marque ;
    const modele = req.body.modele;
    const annee = req.body.annee;
    const kilometrage = req.body.kilometrage;
    const puissance = req.body.puissance;
    const description = req.body.description ;
    const prix = req.body.prix ;

    const voitures = new Voitures({
        image : image,
        image2 : image2,
        image3 : image3,
        categorie : categorie,
        marque : marque,
        modele : modele,
        annee : annee,
        kilometrage : kilometrage,
        puissance : puissance,
        description : description,
        prix : prix,
    })


    await voitures.save()
    res.json(voitures)
    return
})
    //*************post*************


        //*/*/*/*/*/*/*/get all*/*/*/*/*/*/*/
        app.get('/voitures', async (req, res) => {
            const voitures = await Voitures.find() // On récupère tout les voitures
            await res.json(voitures)
        })
        //*/*/*/*/*/*/*/fin get*/*/*/*/*/*/*/

        //*/*/*/*/*/*/*/get by id*/*/*/*/*/*/*/
    app.get('/voitures/:id', async (req, res) => { 
       // app.get('/:id', async (req, res) => {             //peut etre rajouter la route /voitures/:id
            const id = req.params.id
            const voitures = await Voitures.findOne({ _id: id })
            res.json(voitures)
        })


// --------------FIN METHODE VOITURES------------------------------------------



// --------------METHODE MOTOS------------------------------------------
        //*************post*************
        app.post('/motos', async (req, res) => {
            const image = req.body.image;
            const image2 = req.body.image2;
            const image3 = req.body.image3;
            const categorie = req.body.categorie;
            const marque = req.body.marque ;
            const modele = req.body.modele;
            const permis = req.body.permis;
            const autonomie = req.body.autonomie;
            const puissance = req.body.puissance;
            const description = req.body.description ;
            const equivalent = req.body.equivalent ;
            const prix = req.body.prix ;
        
            const motos = new Motos({
                image : image,
                image2 : image2,
                image3 : image3,
                categorie : categorie,
                marque : marque,
                modele : modele,
                permis : permis,
                autonomie : autonomie,
                puissance : puissance,
                description : description,
                equivalent : equivalent,
                prix : prix,
            })
        
        
            await motos.save()
            res.json(motos)
            return
        })
        //*************fin post*************

        //*/*/*/*/*/*/*/get all*/*/*/*/*/*/*/
        app.get('/motos', async (req, res) => {
            const motos = await Motos.find() // On récupère tout les motos
            await res.json(motos)
        })
        //*/*/*/*/*/*/*/fin get all*/*/*/*/*/*/*/


            //*/*/*/*/*/*/*/get by id*/*/*/*/*/*/*/
            app.get('/motos/:id', async (req, res) => {     
            const id = req.params.id
            const motos = await Motos.findOne({ _id: id })
            res.json(motos)
        })
        //*/*/*/*/*/*/*/fin get by id*/*/*/*/*/*/*/


// --------------FIN METHODE MOTOS------------------------------------------





// --------------METHODE TROTTINETTE------------------------------------------
        //*************post*************
        app.post('/trottinettes', async (req, res) => {
            const image = req.body.image;
            const image2 = req.body.image2;
            const image3 = req.body.image3;
            const categorie = req.body.categorie;
            const marque = req.body.marque ;
            const modele = req.body.modele;
            const autonomie = req.body.autonomie;
            const puissance = req.body.puissance;
            const description = req.body.description; 
            const prix = req.body.prix ;
        
            const trottinettes = new Trottinettes({
                image : image,
                image2 : image2,
                image3 : image3,
                categorie : categorie,
                marque : marque,
                modele : modele,
                autonomie : autonomie,
                puissance : puissance,
                description : description,
                prix : prix,
            })
        
        
            await trottinettes.save()
            res.json(trottinettes)
            return
        })
        //*************fin post*************

        //*/*/*/*/*/*/*/get all*/*/*/*/*/*/*/
        app.get('/trottinettes', async (req, res) => {
            const trottinettes = await Trottinettes.find() // On récupère tout les trottinettes
            await res.json(trottinettes)
        })
        //*/*/*/*/*/*/*/fin get all */*/*/*/*/*/*/

            //*/*/*/*/*/*/*/get by id*/*/*/*/*/*/*/
            app.get('/trottinettes/:id', async (req, res) => { 
            const id = req.params.id
            const trottinettes = await Trottinettes.findOne({ _id: id })
            res.json(trottinettes)
        })
        //*/*/*/*/*/*/*/fin get by id*/*/*/*/*/*/*/


// --------------FIN METHODE TROTTINETTE------------------------------------------