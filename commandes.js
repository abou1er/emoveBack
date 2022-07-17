const mongoose = require('mongoose');

const schema = mongoose.Schema({
    image : String,
    image2 : String,
    image3 : String,
    categorie :String,
    marque : String,
    modele : String,
    annee : String,
    autonomie : String,
    permis :String,
    kilometrage : String,
    // puissanceFiscale : Number,
    puissance : Number,
    description : String, 
    equivalent : String,
    prix : Number,
    sex: String,
    nom: String,
    prenom: String,
    age: String,
    adresseMail: String,
    adresse: String,
    ville: String,
    codePostal: Number,
})

module.exports = mongoose.model('commandes', schema)