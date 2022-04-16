import * as fs from 'fs';
import * as path from 'path';

let template: string = `<p align="center"><img src="stock\\Logo\\PNG\\Complete Logo\\Complete logo White .png" width="50%"/></p><h1><p align="center"> Pattarai - Brand </P></h1>Pattarai is a community of industrious engineers working to transform your ideas into functioning projects ! </br></br> \n<!--#images_here-->`

let fileArray: Array<string | null> = []
let omittedExtensions: Array<string> = ['.ai', '.eps', '.blend']
let MarkdownContent: string = ''

const readFiles = (folder: string): void => {
    fs.readdirSync(folder).forEach((file: string): void => {
        if (fs.statSync(path.join(folder, file)).isDirectory()) {
            readFiles(path.join(folder, file))
        }
        else {
            if (omittedExtensions.includes(path.extname(file))) return
            else {
                fileArray.push(path.join(folder, file))
            }
        }
    })
}


readFiles('./stock')

fileArray.forEach((file) => {
    if (file) {
        MarkdownContent += `<a href="${file}"><p align="center"><img src="${file}" width="50%"/></p></a>\n`
    }
})

fs.writeFileSync('./README.md', template.replace('<!--#images_here-->', MarkdownContent))