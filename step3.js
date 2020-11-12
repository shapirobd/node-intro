const fs = require('fs')
const axios = require('axios')
const process = require('process')

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.log('Error: ', err)
            process.exit(1)
        }
        decideWriteOrPrint(data)
    })
}

async function webCat(url) {
    try {
        let resp = await axios.get(url)
        decideWriteOrPrint(resp.data)
    } catch (err) {
        console.log(`Error fetching ${url}: ${err}`)
    }
}

function write(data) {
    let outputFile = process.argv[3]
    fs.writeFile(outputFile, `${data}\n`, {encoding: 'utf8', flag: 'a'}, (err) => {
        if (err) {
            console.log('Error: ', err)
            process.exit(1)
        }
    })
}

function determinePaths() {
    if (process.argv[2] === '--out') {
        return createPathArray(4)
    } else {
        return createPathArray(2)
    }
}

function createPathArray(index) {
    let pathArr = []
    for (let i = index; i < process.argv.length; i++) {
        pathArr.push(process.argv[i])
    }
    return pathArr
}
    

function decideWriteOrPrint(data) {
    if (process.argv[2] === '--out') {
        write(data)
    } else {
        console.log(data)
    }
}

function decideWebCatOrCat(pathList) {
    for (let path of pathList) {
        if (path.slice(0,4) === 'http') {
            webCat(path)
        } else {
            cat(path)
        }
    }
}

let pathArr = determinePaths()
decideWebCatOrCat(pathArr)