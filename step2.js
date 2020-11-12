const fs = require('fs')
const axios = require('axios')
const process = require('process')

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.log('Error: ', err)
            process.exit(1)
        }
        console.log(data)
    })
}

async function webCat(url) {
    try {
        let resp = await axios.get(url)
        console.log(resp.data)
    } catch (err) {
        console.log(`Error fetching ${url}: ${err}`)
    }
}

let path = process.argv[2]
if (path.slice(0,4) === 'http') {
    webCat(path)
} else {
    cat(path)
}