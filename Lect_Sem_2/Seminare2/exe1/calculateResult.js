
const np = require("number-precision");

function calculateResultSum(purchases, disc) {
    let total = purchases.reduce((acc, purchase) => np.plus(acc, purchase), 0);

    total = np.times(total, disc); // применяем скидку
    return  total;
}
module.exports = {calculateResultSum};