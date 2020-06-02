const { getRandom } = require('../utils/util')

const praiseFormat = num => {
  let praise = +num
  if (num === 0) {
    praise = getRandom(300, 499)
  } else if (num < 1000) {
    praise = getRandom(500, 999)
  } else {
    let toStr = praise + ''
    
  }
  return praise
}

module.exports = {
  praiseFormat
}
