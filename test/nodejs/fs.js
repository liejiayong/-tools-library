console.log('enter fs.js\n')

const fs = require('fs')
const { join } = require('path')
function getFs2Path(basePath, mockPath) {
    let jsonFile = []

    const findFs = ffs => {
        const dir = fs.readdirSync(ffs)
        dir.forEach(path => {
            const fPath = join(basePath, path)
            const fstat = fs.statSync(fPath)
            console.log('fpath', fPath, fstat, fstat.isDirectory(), fstat.isFile())
            if (fstat.isDirectory()) findFs(path)
            if (fstat.isFile()) jsonFile.push(path)
        })
    }
    findFs(basePath)
    jsonFile = jsonFile.map(path => {
        return `${mockPath}${path}`
    })

    return jsonFile
}
var fileList = getFs2Path('../svg', './controller/')
console.log('file list:', fileList)
