const { model } = require('mongoose')
const car = require('../../Entity/cars');

 const deletecarById = (id, result) => {

    car.findByIdAndDelete(id, function (err, results) {
    if(err) {
        console.log(err);
        result(err, null);
    } else {
        result(null, results);
    }
})     
}
      

module.exports = { deletecarById } ;






