function fileToBase64(file) {
    new Promise((resolve, reject) => {
        try {
            var freader = new FileReader(file)
            freader.readAsDataURL(file)
            freader.onload = ev => {
                resolve(ev.target.result)
            }
            freader.onerror = () => {
                reject(new Error('FileReader read error!'))
            }
        } catch {

        }
    })
}

