const fetch = require('node-fetch');

exports.fetchJson = fetchJson = (url, options) => new Promise(async (resolve, reject) => {
    fetch(url, options)
        .then(response => response.json())
        .then(json => {
//        console.log(json)
            resolve(json)
        })
        .catch((err) => {
            reject(err)
        })
})