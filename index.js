const express = require('express');
let app = express(); // création de l'objet représentant notre application express
let port = 7878;
const mongoose = require('mongoose');
const Voitures = require('./voitures');
const Motos = require('./motos');
const Trottinettes = require('./trottinettes');

app.get('/', function (req, res) { // création de la route sous le verbe get
    res.send('Hello world  ! ') // envoi de hello world à l'utilisateur
})


app.listen(port, () => { // ecoute du serveur sur le port 7878
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
    res.setHeader('Access-Control-Allow-Origin', '*');  //r.sH('....', '*' étoile permet la connexion de tous les serveurs)
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
app.use(express.urlencoded({ extended: false }));


// --------------METHODES VOITURES------------------------------------------
//*************post*************
app.post('/voitures', async (req, res) => {
    const image = req.body.image;
    const image2 = req.body.image2;
    const image3 = req.body.image3;
    const categorie = req.body.categorie;
    const marque = req.body.marque;
    const modele = req.body.modele;
    const annee = req.body.annee;
    const kilometrage = req.body.kilometrage;
    const puissance = req.body.puissance;
    const description = req.body.description;
    const prix = req.body.prix;

    const voitures = new Voitures({
        image: image,
        image2: image2,
        image3: image3,
        categorie: categorie,
        marque: marque,
        modele: modele,
        annee: annee,
        kilometrage: kilometrage,
        puissance: puissance,
        description: description,
        prix: prix,
    })


    await voitures.save()
    res.json(voitures)
    return
})
//*************FIN post*************


//*/*/*/*/*/*/*/get all*/*/*/*/*/*/*/
app.get('/voitures', async (req, res) => {
    const voitures = await Voitures.find()              // On récupère toutes les voitures
    await res.json(voitures)
})
//*/*/*/*/*/*/*/FIN get all*/*/*/*/*/*/*/


//*/*/*/*/*/*/*/get by id*/*/*/*/*/*/*/
app.get('/voitures/:id', async (req, res) => {
    // app.get('/:id', async (req, res) => {             //peut être rajouté la route /voitures/:id
    const id = req.params.id
    const voitures = await Voitures.findOne({ _id: id })
    res.json(voitures)
})
//*/*/*/*/*/*/*/FIN get by id*/*/*/*/*/*/*/


// ************get by Prix******************
app.get('/voitures/byPrix', async (req,res) =>{
    let min = req.query.min;                           
    let max = req.query.max;
    const voituresByPrix = await Voitures.find({
        prix:  { $gte: min, $lte: max }
    })
    res.json(voituresByPrix) 
})
// ************FIN get by Prix******************



//*************delete*************
app.delete('/voitures/:id', async (req, res) => {
    const id = req.params.id
    const voitures = await Voitures.deleteOne({ _id: id })
    res.json(voitures)
})
//*************FIN delete*************


//***************patch****************
app.patch('/voitures/:id', async (req, res) => {
    const id = req.params.id
    const voitures = await Voitures.findOne({ _id: id })

    const image = req.body.image;
    const image2 = req.body.image2;
    const image3 = req.body.image3;
    const categorie = req.body.categorie;
    const marque = req.body.marque;
    const modele = req.body.modele;
    const annee = req.body.annee;
    const kilometrage = req.body.kilometrage;
    const puissance = req.body.puissance;
    const description = req.body.description;
    const prix = req.body.prix;

    if (image) {
        voitures.image = image
    }
    if (image2) {
        voitures.image2 = image2
    }
    if (image3) {
        voitures.image3 = image3
    }
    if (categorie) {
        voitures.categorie = categorie
    }
    if (marque) {
        voitures.marque = marque
    }
    if (modele) {
        voitures.modele = modele
    }
    if (annee) {
        voitures.annee = annee
    }
    if (kilometrage) {
        voitures.kilometrage = kilometrage
    }
    if (puissance) {
        voitures.puissance = puissance
    }
    if (description) {
        voitures.description = description
    }
    if (prix) {
        voitures.prix = prix
    }

    await voitures.save()
    res.json(voitures)
})
//***************FIN patch****************

// --------------FIN METHODE VOITURES------------------------------------------
//-----------------------------------------------------------------------------




// --------------METHODE MOTOS------------------------------------------
//*************post*************
app.post('/motos', async (req, res) => {
    const image = req.body.image;
    const image2 = req.body.image2;
    const image3 = req.body.image3;
    const categorie = req.body.categorie;
    const marque = req.body.marque;
    const modele = req.body.modele;
    const permis = req.body.permis;
    const autonomie = req.body.autonomie;
    const puissance = req.body.puissance;
    const description = req.body.description;
    const equivalent = req.body.equivalent;
    const prix = req.body.prix;

    const motos = new Motos({
        image: image,
        image2: image2,
        image3: image3,
        categorie: categorie,
        marque: marque,
        modele: modele,
        permis: permis,
        autonomie: autonomie,
        puissance: puissance,
        description: description,
        equivalent: equivalent,
        prix: prix,
    })


    await motos.save()
    res.json(motos)
    return
})
//*************fin post*************


//*/*/*/*/*/*/*/get all*/*/*/*/*/*/*/
app.get('/motos', async (req, res) => {
    const motos = await Motos.find() // On récupère toutes les motos
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


// ************get by Prix******************
app.get('/motos/byPrix', async (req,res) =>{
    let min = req.query.min;                           
    let max = req.query.max;
    const motosByPrix = await Motos.find({
        prix:  { $gte: min, $lte: max }
    })
    res.json(motosByPrix) 
})
// ************FIN get by Prix******************


//*************delete*************
app.delete('/motos/:id', async (req, res) => {
    const id = req.params.id
    const motos = await Motos.deleteOne({ _id: id })
    res.json(motos)
})
//*************FIN delete*************


//***************patch****************
app.patch('/motos/:id', async (req, res) => {
    const id = req.params.id
    const motos = await Motos.findOne({ _id: id })

    const image = req.body.image;
    const image2 = req.body.image2;
    const image3 = req.body.image3;
    const categorie = req.body.categorie;
    const marque = req.body.marque;
    const modele = req.body.modele;
    const permis = req.body.permis;
    const autonomie = req.body.autonomie;
    const puissance = req.body.puissance;
    const description = req.body.description;
    const prix = req.body.prix;

    if (image) {
        motos.image = image
    }
    if (image2) {
        motos.image2 = image2
    }
    if (image3) {
        motos.image3 = image3
    }
    if (categorie) {
        motos.categorie = categorie
    }
    if (marque) {
        motos.marque = marque
    }
    if (modele) {
        motos.modele = modele
    }
    if (permis) {
        motos.permis = permis
    }
    if (autonomie) {
        motos.autonomie = autonomie
    }
    if (puissance) {
        motos.puissance = puissance
    }
    if (description) {
        motos.description = description
    }
    if (prix) {
        motos.prix = prix
    }

    await motos.save()
    res.json(motos)
})
//***************FIN patch****************

// --------------FIN METHODE MOTOS------------------------------------------
//--------------------------------------------------------------------------




// --------------METHODE TROTTINETTE------------------------------------------
//*************post*************
app.post('/trottinettes', async (req, res) => {
    const image = req.body.image;
    const image2 = req.body.image2;
    const image3 = req.body.image3;
    const categorie = req.body.categorie;
    const marque = req.body.marque;
    const modele = req.body.modele;
    const autonomie = req.body.autonomie;
    const puissance = req.body.puissance;
    const description = req.body.description;
    const prix = req.body.prix;

    const trottinettes = new Trottinettes({
        image: image,
        image2: image2,
        image3: image3,
        categorie: categorie,
        marque: marque,
        modele: modele,
        autonomie: autonomie,
        puissance: puissance,
        description: description,
        prix: prix,
    })


    await trottinettes.save()
    res.json(trottinettes)
    return
})
//*************fin post*************


//*/*/*/*/*/*/*/get all*/*/*/*/*/*/*/
app.get('/trottinettes', async (req, res) => {
    const trottinettes = await Trottinettes.find() // On récupère toutes les trottinettes
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


// ************get by Prix******************
app.get('/trottinettes/byPrix', async (req,res) =>{
    let min = req.query.min;                           
    let max = req.query.max;
    const trottinettesByPrix = await Trottinettes.find({
        prix:  { $gte: min, $lte: max }
    })
    res.json(trottinettesByPrix) 
})
// ************FIN get by Prix******************


//*************delete*************
app.delete('/trottinettes/:id', async (req, res) => {
    const id = req.params.id
    const trottinettes = await Trottinettes.deleteOne({ _id: id })
    res.json(trottinettes)
})
//*************FIN delete*************


//***************patch****************
app.patch('/trottinettes/:id', async (req, res) => {
    const id = req.params.id
    const trottinettes = await Trottinettes.findOne({ _id: id })

    const image = req.body.image;
    const image2 = req.body.image2;
    const image3 = req.body.image3;
    const categorie = req.body.categorie;
    const marque = req.body.marque;
    const modele = req.body.modele;
    const autonomie = req.body.autonomie;
    const puissance = req.body.puissance;
    const description = req.body.description;
    const prix = req.body.prix;

    if (image) {
        trottinettes.image = image
    }
    if (image2) {
        trottinettes.image2 = image2
    }
    if (image3) {
        trottinettes.image3 = image3
    }
    if (categorie) {
        trottinettes.categorie = categorie
    }
    if (marque) {
        trottinettes.marque = marque
    }
    if (modele) {
        trottinettes.modele = modele
    }
    if (autonomie) {
        trottinettes.autonomie = autonomie
    }
    if (puissance) {
        trottinettes.puissance = puissance
    }
    if (description) {
        trottinettes.description = description
    }
    if (prix) {
        trottinettes.prix = prix
    }

    await trottinettes.save()
    res.json(trottinettes)
})
//***************FIN patch****************


//---------------FIN METHODE TROTTINETTE------------------------------------------
//--------------------------------------------------------------------------------