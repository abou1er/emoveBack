const mongoose = require('mongoose');

const schemaT  = mongoose.Schema({
    image : String,
    image2 : String,
    image3 : String,
    categorie :String,
    marque : String,
    modele : String,
    autonomie : String,
    puissance : String,
    description : String, 
    prix : Number 
    

    
})

module.exports = mongoose.model('trottinette', schemaT)