import DataUriParser from "datauri/parser.js"
//DataUriPaser is a module from datauri library , which provides functionality to create 
import path from "path" //node js built in module for handling file and manpluating directiry paths

const parser = new DataUriParser();

//this function is responsible for converting path into data uri
const getDataUri = (file) => { //file contains orignalname
    const extName = path.extname(file.originalname).toString(); 
    return parser.format(extName, file.buffer).content; 

    //file.originalname is the original name of file that contains extension
    //path.extname(file.originalname) -> extracts the extension name of the file from the original name
    //toString() -> converts the version into string format


    //parser.format() -> this method is ued to generate the data ur's it takes two parameters 
    //1st is extname which is the extension name of file thet we have extracted above
    //2nd is the file.buffer :- it's the raw data of the files meand binary content
    //.content -> the format method returns an object with a content property that contains the data-uri aas a string. this function returns it's content string
}

export default getDataUri;


//this code is used to convert a file into data uti-format
//data-uti-format is base -64 encoded string that represents binary data, typically used to embeded images and other media directly into web-pages