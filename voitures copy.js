const mongoose = require('mongoose');

const schemaV  = mongoose.Schema({
    image : String,
    image2 : String,
    image3 : String,
    categorie :String,
    marque : String,
    modele : String,
    annee : String,
    kilometrage : String,
    puissanceFiscale : String,
    description : String, 
    prix : Number 
    

    
})

module.exports = mongoose.model('voiture', schemaV)