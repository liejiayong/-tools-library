const fs = require('fs')
const path = require('path')
const root = 'E:/tanwan-file/tanwan-static-page专题-2020'

function fileRename(root) {
    let files = fs.readdirSync(root)
    files.forEach(file => {
        var stat = fs.lstatSync(path.join(root, file))
        if (stat.isDirectory() && file.match(/^\d/g)) {
            // let date = file.replace(/^(\d*)\w*/g, '$1')
            // let word = file.replace(/^\d*(\w*)/g, '$1')
            let date = file.match(/^(\d*)/g)[0]
            let word = file.match(/[^\d]+/g)[0]
            word = word.replace(/^\-?(\w*)/g, '$1')
            const rename = `${word}-${date}`
            const pathToFile = path.join(root, file)
            const newPathToFile = path.join(root, rename)
            console.log(rename, pathToFile, newPathToFile)
            fs.rename(pathToFile, newPathToFile, (err) => {
                if (err) throw err;
                console.log('重命名完成');
            })

        }
    })
}
// fileRename(root)

function fsNameTrim(root) {
    let files = fs.readdirSync(root)
    files.forEach(file => {
        var stat = fs.lstatSync(path.join(root, file))
        if (stat.isDirectory()) {
            const rename = file.trim()
            const pathToFile = path.join(root, file)
            const newPathToFile = path.join(root, rename)
            // console.log(rename, pathToFile, newPathToFile)
            fs.rename(pathToFile, newPathToFile, (err) => {
                if (err) throw err;
                console.log(`${newPathToFile} --> 重命名完成`);
            })
        }
    })
}
fsNameTrim(root)
