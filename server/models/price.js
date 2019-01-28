const mongoose= require('mongoose');
const Schema=mongoose.Schema;


const priceSchema= new Schema({
    med: { 
        type: Schema.Types.ObjectId, 
        ref: 'Medicine'
    },
    cena: String
});

module.exports = mongoose.model('Price',priceSchema);
