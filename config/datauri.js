import DataUriParser from "datauri/parser.js"
//DataUriPaser is a module from datauri library , which provides functionality to create 
import path from "path" //node js built in module for handling file and manpluating directiry paths

const parser = new DataUriParser();

const getDataUri = (file) => { //file contains orignalname
    const extName = path.extname(file.originalname).toString(); //fetchs the extension of our original name
    return parser.format(extName, file.buffer).content; 
//     parser.format is used to generate a Data URI. It takes two arguments:
// extName: The file extension, which is used to determine the MIME type of the file.
// file.buffer: The binary data of the file.
// parser.format returns an object with a content property that contains the Data URI as a string.
}

export default getDataUri;