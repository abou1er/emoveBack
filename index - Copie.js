require('dotenv').config()
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

const express = require('express');
let app = express(); // création de l'objet représentant notre application express

// server listening 
app.listen(port, () => {
    console.log('Server running on port', port);
});



const mongoose = require('mongoose');

const Vehicules = require('./vehicules');
const Commandes = require('./commandes');

// let port = 7878;
// app.listen(port, () => {            // ecoute du serveur sur le port 7878
//     console.log('le serveur fonctionne sur le port 7878')
// })

mongoose.connect(
    process.env.DB_URL
    , err => {
        if (err) throw 'erreur est : ', err;
        console.log('connected to MongoDB')
    });

//---------------------------------------------------------------------------------------------- 
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
//---------------------------------------------------------------------------------------------- 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));





// --------------METHODES Vehicules------------------------------------------

//*****************GET All**********************************
app.get('/', async (req, res) => {
    const vehicules = await Vehicules.find()              // On récupère tous les véhicules
    await res.json(vehicules)
})

// test pagination
// app.get('/', async (req, res) => {
//     const { page = 1, limit = 6 } = req.query;
//     try {
//         const vehicules = await Vehicules.find()
//             .limit(limit * 1)
//             .skip((page - 1) * limit)
//             .exec();
//         const count = await Vehicules.countDocuments();

//         res.json({
//             vehicules,
//             totalPages: Math.ceil(count / limit),
//             currentPage: page
//         });
//     }
//     catch (err) {
//         console.error(err.message);
//     }
// })


// On récupère tous les véhicules
// await res.json(vehicules)

//*************FIN GET All**********************************


// test

//filtre mocategorie + prix
app.get('/byCat/moto/by/price', async (req, res) => {                     // la syntaxe '/...' désigne un query (une requête) // on crée un chemin qu'on lui indique
    let min = req.query.min;
    let max = req.query.max;
    let cat = req.query.categorie                            // On trie par Prix tous les véhicules
    const vehicules = await Vehicules.find({              // dans Postman: http://localhost:7878/byPrice?min=30000&max=40000
        prix: { $gte: min, $lte: max },
        categorie: cat,

    })
    res.json(vehicules)                               // j'envoie la réponse qui figure dans Postman en réponse à cette recherche: http://localhost:7878/byCat?categorie=moto
})

// categorie+prix+permis
app.get('/byCat/category/by/price/permis', async (req, res) => {                     // la syntaxe '/...' désigne un query (une requête) // on crée un chemin qu'on lui indique
    let min = req.query.min;
    let max = req.query.max;
    let cat = req.query.categorie 
    let permis = req.query.permis                            // On trie par Prix tous les véhicules
    const vehicules = await Vehicules.find({              // dans Postman: http://localhost:7878/byCat/category/by/price/permis?min=2000&max=10000&categorie=moto&permis=sans permis
        prix: { $gte: min, $lte: max },
        categorie: cat,
        permis : permis,

    })
    res.json(vehicules)                               // j'envoie la réponse qui figure dans Postman en réponse à cette recherche: http://localhost:7878/byCat/category/by/price/permis?min=2000&max=10000&categorie=moto&permis=sans permis
})
// fin categorie+prix+permis




// ************GET by Price******************
app.get('/byPrice', async (req, res) => {
    let min = req.query.min;
    let max = req.query.max;
    // On trie par Prix tous les véhicules
    const vehicules = await Vehicules.find({              // dans Postman: http://localhost:7878/byPrice?min=30000&max=40000
        prix: { $gte: min, $lte: max },


    })
    res.json(vehicules)
})
// ************FIN GET by Price******************


//***********************GET par MOT CLE******************

app.get('/byKeyWord/kw', async (req, res) => {                   // /byKeyWord = défintion du nom de la route pour accéder à la recherche définie après
    const param = req.query.Key                             // const param = arbitraire; "Key" = const qu'on récupèrera par la requête grace au query (dans Postman)
    // const searchByKeyWord = constante arbitraire pour stocker le résultat de la recherche
    const vehiculesbyKeyWord = await Vehicules.find({          // fonction de recherche (toute prête) find by (par critère)
        $or: [                                              // $or = indique un tableau de catégories dans lesquelles chercher
            { 'categorie': new RegExp(param, 'i') },        // RegExp() = fonction (toute prête) pour rechercher une chaîne de cractères sans respect de la casse
            { 'marque': new RegExp(param, 'i') },
            { 'modele': new RegExp(param, 'i') },           // Attention! Ne recherche QUE les String (pas les Number!!!)
            { 'annee': new RegExp(param, 'i') },
            { 'autonomie': new RegExp(param, 'i') },        // Dans Postman: http://localhost:7878/byKeyWord?Key=cooper
            { 'permis': new RegExp(param, 'i') },
            { 'kilometrage': new RegExp(param, 'i') },
            { 'description': new RegExp(param, 'i') },
            { 'equivalent': new RegExp(param, 'i') },
        ]
    })
    res.json(vehiculesbyKeyWord)                               // exprimer le résultat en json
})
//********************FIN GET par MOT CLE******************

// test test
//**************GET par Categorie ou par Genre
app.get('/byCat/cat/cat/permis', async (req, res) => {                     // la syntaxe '/...' désigne un query (une requête) // on crée un chemin qu'on lui indique
    const permisBodyReq = req.query.permis                  // const catBodyReq = une constante que je définis et récupère dans ma requête grâce au query
    const vehiculesByCatpermis = await Vehicules.find({           // je fais une recherche find by (+ critère) dans mon objet Vehicules
        permis: permisBodyReq,
    })
    res.json(vehiculesByCatpermis)                                // j'envoie la réponse qui figure dans Postman en réponse à cette recherche: http://localhost:7878/byCat?categorie=moto
})                                                          // !!! Attention : SENSIBLE à la casse !!!
//********************FIN GET par Categorie******************




//**************GET par Categorie ou par Genre
app.get('/byCat/cat/cat', async (req, res) => {                     // la syntaxe '/...' désigne un query (une requête) // on crée un chemin qu'on lui indique
    const catBodyReq = req.query.categorie                  // const catBodyReq = une constante que je définis et récupère dans ma requête grâce au query
    const vehiculesByCat = await Vehicules.find({           // je fais une recherche find by (+ critère) dans mon objet Vehicules
        categorie: catBodyReq,
    })
    res.json(vehiculesByCat)                                // j'envoie la réponse qui figure dans Postman en réponse à cette recherche: http://localhost:7878/byCat?categorie=moto
})                                                          // !!! Attention : SENSIBLE à la casse !!!
//********************FIN GET par Categorie******************


//*******************POST************************
app.post('/', async (req, res) => {
    const image = req.body.image;
    const image2 = req.body.image2;
    const image3 = req.body.image3;
    const categorie = req.body.categorie;
    const marque = req.body.marque;
    const modele = req.body.modele;
    const annee = req.body.annee;
    const autonomie = req.body.autonomie;
    const permis = req.body.permis;
    const kilometrage = req.body.kilometrage;
    // const puissanceFiscale = req.body.puissanceFiscale;
    const puissance = req.body.puissance;
    const description = req.body.description;
    const equivalent = req.body.equivalent;
    const prix = req.body.prix;

    const vehicules = new Vehicules({
        image: image,
        image2: image2,
        image3: image3,
        categorie: categorie,
        marque: marque,
        modele: modele,
        annee: annee,
        autonomie: autonomie,
        permis: permis,
        kilometrage: kilometrage,
        // puissanceFiscale : puissanceFiscale,
        puissance: puissance,
        description: description,
        equivalent: equivalent,
        prix: prix,
    })

    await vehicules.save()
    res.json(vehicules)
    return
})
//***********************FIN POST********************


//***************PATCH****************
app.patch('/:id', async (req, res) => {
    const id = req.params.id
    const vehicules = await Vehicules.findOne({ _id: id })

    const image = req.body.image;
    const image2 = req.body.image2;
    const image3 = req.body.image3;
    const categorie = req.body.categorie;
    const marque = req.body.marque;
    const modele = req.body.modele;
    const annee = req.body.annee;
    const autonomie = req.body.autonomie;
    const permis = req.body.permis;
    const kilometrage = req.body.kilometrage;
    // const puissanceFiscale = req.body.puissanceFiscale;
    const puissance = req.body.puissance;
    const description = req.body.description;
    const equivalent = req.body.equivalent;
    const prix = req.body.prix;

    if (image) { vehicules.image = image }
    if (image2) { vehicules.image2 = image2 }
    if (image3) { vehicules.image3 = image3 }
    if (categorie) { vehicules.categorie = categorie }
    if (marque) { vehicules.marque = marque }
    if (modele) { vehicules.modele = modele }
    if (annee) { vehicules.annee = annee }
    if (autonomie) { vehicules.autonomie = autonomie }
    if (permis) { vehicules.permis = permis }
    if (kilometrage) { vehicules.kilometrage = kilometrage }
    // if (puissanceFiscale) { vehicules.puissanceFiscale = puissanceFiscale   }
    if (puissance) { vehicules.puissance = puissance }
    if (description) { vehicules.description = description }
    if (equivalent) { vehicules.equivalent = equivalent }
    if (prix) { vehicules.prix = prix }

    await vehicules.save()
    res.json(vehicules)
})
//***************FIN PATCH****************


//****************GET by Id*****************
app.get('/get/id/id/:id', async (req, res) => {
    // app.get('/:id', async (req, res) => {             //peut être rajouté à la route /voitures/:id
    const id = req.params.id
    const vehicules = await Vehicules.findOne({ _id: id })
    res.json(vehicules)
})
//****************GET by Id*****************


//*************delete*************
app.delete('/:id', async (req, res) => {
    const id = req.params.id
    const vehicules = await Vehicules.deleteOne({ _id: id })
    res.json(vehicules)
})
//*************FIN delete*************







// --------------FIN METHODEs Vehicules------------------------------------------
//-----------------------------------------------------------------------------




// --------------METHODES VOITURES------------------------------------------
//*************post*************
// app.post('/voitures', async (req, res) => {
//     const image = req.body.image;
//     const image2 = req.body.image2;
//     const image3 = req.body.image3;
//     const categorie = req.body.categorie;
//     const marque = req.body.marque;
//     const modele = req.body.modele;
//     const annee = req.body.annee;
//     const kilometrage = req.body.kilometrage;
//     const puissance = req.body.puissance;
//     const description = req.body.description;
//     const prix = req.body.prix;

//     const voitures = new Voitures({
//         image: image,
//         image2: image2,
//         image3: image3,
//         categorie: categorie,
//         marque: marque,
//         modele: modele,
//         annee: annee,
//         kilometrage: kilometrage,
//         puissance: puissance,
//         description: description,
//         prix: prix,
//     })

//     await voitures.save()
//     res.json(voitures)
//     return
// })
//*************FIN post*************

//*/*/*/*/*/*/*/get all*/*/*/*/*/*/*/
// app.get('/voitures', async (req, res) => {
//     const voitures = await Voitures.find()              // On récupère toutes les voitures
//     await res.json(voitures)
// })
//*/*/*/*/*/*/*/FIN get all*/*/*/*/*/*/*/



// ************get by Price******************
// app.get('/voitures/byPrice', async (req, res) => {
//     let min = req.query.min;
//     let max = req.query.max;
//     const voitures = await Voitures.find({
//         prix:  { $gte: min, $lte: max }
//     })
//     res.json(voitures)
// })
// ************FIN get by Price******************


//*/*/*/*/*/*/*/get by id*/*/*/*/*/*/*/
// app.get('/voitures/:id', async (req, res) => {
//     // app.get('/:id', async (req, res) => {             //peut être rajouté la route /voitures/:id
//     const id = req.params.id
//     const voitures = await Voitures.findOne({ _id: id })
//     res.json(voitures)
// })
//*/*/*/*/*/*/*/FIN get by id*/*/*/*/*/*/*/


//*************delete*************
// app.delete('/voitures/:id', async (req, res) => {
//     const id = req.params.id
//     const voitures = await Voitures.deleteOne({ _id: id })
//     res.json(voitures)
// })
//*************FIN delete*************


//***************patch****************
// app.patch('/voitures/:id', async (req, res) => {
//     const id = req.params.id
//     const voitures = await Voitures.findOne({ _id: id })

//     const image = req.body.image;
//     const image2 = req.body.image2;
//     const image3 = req.body.image3;
//     const categorie = req.body.categorie;
//     const marque = req.body.marque;
//     const modele = req.body.modele;
//     const annee = req.body.annee;
//     const kilometrage = req.body.kilometrage;
//     const puissance = req.body.puissance;
//     const description = req.body.description;
//     const prix = req.body.prix;

//     if (image) {
//         voitures.image = image
//     }
//     if (image2) {
//         voitures.image2 = image2
//     }
//     if (image3) {
//         voitures.image3 = image3
//     }
//     if (categorie) {
//         voitures.categorie = categorie
//     }
//     if (marque) {
//         voitures.marque = marque
//     }
//     if (modele) {
//         voitures.modele = modele
//     }
//     if (annee) {
//         voitures.annee = annee
//     }
//     if (kilometrage) {
//         voitures.kilometrage = kilometrage
//     }
//     if (puissance) {
//         voitures.puissance = puissance
//     }
//     if (description) {
//         voitures.description = description
//     }
//     if (prix) {
//         voitures.prix = prix
//     }

//     await voitures.save()
//     res.json(voitures)
// })
//***************FIN patch****************

// --------------FIN METHODE VOITURES------------------------------------------
//-----------------------------------------------------------------------------




// --------------METHODE MOTOS------------------------------------------
//*************post*************
// app.post('/motos', async (req, res) => {
//     const image = req.body.image;
//     const image2 = req.body.image2;
//     const image3 = req.body.image3;
//     const categorie = req.body.categorie;
//     const marque = req.body.marque;
//     const modele = req.body.modele;
//     const permis = req.body.permis;
//     const autonomie = req.body.autonomie;
//     const puissance = req.body.puissance;
//     const description = req.body.description;
//     const equivalent = req.body.equivalent;
//     const prix = req.body.prix;

//     const motos = new Motos({
//         image: image,
//         image2: image2,
//         image3: image3,
//         categorie: categorie,
//         marque: marque,
//         modele: modele,
//         permis: permis,
//         autonomie: autonomie,
//         puissance: puissance,
//         description: description,
//         equivalent: equivalent,
//         prix: prix,
//     })


//     await motos.save()
//     res.json(motos)
//     return
// })
//*************fin post*************


//*/*/*/*/*/*/*/get all*/*/*/*/*/*/*/
// app.get('/motos', async (req, res) => {
//     const motos = await Motos.find() // On récupère toutes les motos
//     await res.json(motos)
// })
//*/*/*/*/*/*/*/fin get all*/*/*/*/*/*/*/


//*/*/*/*/*/*/*/get by id*/*/*/*/*/*/*/
// app.get('/motos/:id', async (req, res) => {
//     const id = req.params.id
//     const motos = await Motos.findOne({ _id: id })
//     res.json(motos)
// })
//*/*/*/*/*/*/*/fin get by id*/*/*/*/*/*/*/


// ************get by Price******************
// app.get('/motos/byPrice', async (req,res) =>{
//     let min = req.query.min;
//     let max = req.query.max;
//     const motosbyPrice = await Motos.find({
//         prix:  { $gte: min, $lte: max }
//     })
//     res.json(motosbyPrice)
// })
// ************FIN get by Price******************


//*************delete*************
// app.delete('/motos/:id', async (req, res) => {
//     const id = req.params.id
//     const motos = await Motos.deleteOne({ _id: id })
//     res.json(motos)
// })
//*************FIN delete*************


//***************patch****************
// app.patch('/motos/:id', async (req, res) => {
//     const id = req.params.id
//     const motos = await Motos.findOne({ _id: id })

//     const image = req.body.image;
//     const image2 = req.body.image2;
//     const image3 = req.body.image3;
//     const categorie = req.body.categorie;
//     const marque = req.body.marque;
//     const modele = req.body.modele;
//     const permis = req.body.permis;
//     const autonomie = req.body.autonomie;
//     const puissance = req.body.puissance;
//     const description = req.body.description;
//     const prix = req.body.prix;

//     if (image) {
//         motos.image = image
//     }
//     if (image2) {
//         motos.image2 = image2
//     }
//     if (image3) {
//         motos.image3 = image3
//     }
//     if (categorie) {
//         motos.categorie = categorie
//     }
//     if (marque) {
//         motos.marque = marque
//     }
//     if (modele) {
//         motos.modele = modele
//     }
//     if (permis) {
//         motos.permis = permis
//     }
//     if (autonomie) {
//         motos.autonomie = autonomie
//     }
//     if (puissance) {
//         motos.puissance = puissance
//     }
//     if (description) {
//         motos.description = description
//     }
//     if (prix) {
//         motos.prix = prix
//     }

//     await motos.save()
//     res.json(motos)
// })
//***************FIN patch****************

// --------------FIN METHODE MOTOS------------------------------------------
//--------------------------------------------------------------------------




// --------------METHODE TROTTINETTE------------------------------------------
//*************post*************
// app.post('/trottinettes', async (req, res) => {
//     const image = req.body.image;
//     const image2 = req.body.image2;
//     const image3 = req.body.image3;
//     const categorie = req.body.categorie;
//     const marque = req.body.marque;
//     const modele = req.body.modele;
//     const autonomie = req.body.autonomie;
//     const puissance = req.body.puissance;
//     const description = req.body.description;
//     const prix = req.body.prix;

//     const trottinettes = new Trottinettes({
//         image: image,
//         image2: image2,
//         image3: image3,
//         categorie: categorie,
//         marque: marque,
//         modele: modele,
//         autonomie: autonomie,
//         puissance: puissance,
//         description: description,
//         prix: prix,
//     })


//     await trottinettes.save()
//     res.json(trottinettes)
//     return
// })
//*************fin post*************


//*/*/*/*/*/*/*/get all*/*/*/*/*/*/*/
// app.get('/trottinettes', async (req, res) => {
//     const trottinettes = await Trottinettes.find() // On récupère toutes les trottinettes
//     await res.json(trottinettes)
// })
//*/*/*/*/*/*/*/fin get all */*/*/*/*/*/*/


//*/*/*/*/*/*/*/get by id*/*/*/*/*/*/*/
// app.get('/trottinettes/:id', async (req, res) => {
//     const id = req.params.id
//     const trottinettes = await Trottinettes.findOne({ _id: id })
//     res.json(trottinettes)
// })
//*/*/*/*/*/*/*/fin get by id*/*/*/*/*/*/*/


// ************get by Price******************
// app.get('/trottinettes/byPrice', async (req,res) =>{
//     let min = req.query.min;
//     let max = req.query.max;
//     const trottinettesbyPrice = await Trottinettes.find({
//         prix:  { $gte: min, $lte: max }
//     })
//     res.json(trottinettesbyPrice)
// })
// ************FIN get by Price******************


//*************delete*************
// app.delete('/trottinettes/:id', async (req, res) => {
//     const id = req.params.id
//     const trottinettes = await Trottinettes.deleteOne({ _id: id })
//     res.json(trottinettes)
// })
//*************FIN delete*************


//***************patch****************
// app.patch('/trottinettes/:id', async (req, res) => {
//     const id = req.params.id
//     const trottinettes = await Trottinettes.findOne({ _id: id })

//     const image = req.body.image;
//     const image2 = req.body.image2;
//     const image3 = req.body.image3;
//     const categorie = req.body.categorie;
//     const marque = req.body.marque;
//     const modele = req.body.modele;
//     const autonomie = req.body.autonomie;
//     const puissance = req.body.puissance;
//     const description = req.body.description;
//     const prix = req.body.prix;

//     if (image) {
//         trottinettes.image = image
//     }
//     if (image2) {
//         trottinettes.image2 = image2
//     }
//     if (image3) {
//         trottinettes.image3 = image3
//     }
//     if (categorie) {
//         trottinettes.categorie = categorie
//     }
//     if (marque) {
//         trottinettes.marque = marque
//     }
//     if (modele) {
//         trottinettes.modele = modele
//     }
//     if (autonomie) {
//         trottinettes.autonomie = autonomie
//     }
//     if (puissance) {
//         trottinettes.puissance = puissance
//     }
//     if (description) {
//         trottinettes.description = description
//     }
//     if (prix) {
//         trottinettes.prix = prix
//     }

//     await trottinettes.save()
//     res.json(trottinettes)
// })
//***************FIN patch****************


//---------------FIN METHODE TROTTINETTE------------------------------------------
//--------------------------------------------------------------------------------