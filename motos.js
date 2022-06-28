const mongoose = require('mongoose');

const schemaM  = mongoose.Schema({
    image : String,
    image2 : String,
    image3 : String,
    categorie :String,
    marque : String,
    modele : String,
    permis :String,
    autonomie : String,
    puissance : String,
    description : String, 
    equivalent : String,
    prix : Number 
    

    
})

module.exports = mongoose.model('moto', schemaM)