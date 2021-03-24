const fetch = require('node-fetch');

const getCount = async id => {
    const res = await fetch(`http://localhost:5000/counter/${id}`)
    const count = await res.json();
    return count;
}

module.exports = { getCount };