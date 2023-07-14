const dayjs = require('dayjs')

const formattedDate = (oldDate) =>{
    const old = oldDate;
    let newDate =dayjs(old).format('MMM D, YYYY h:mm A')
    return newDate;
}

module.exports = formattedDate