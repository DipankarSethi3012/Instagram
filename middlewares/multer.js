<<<<<<< HEAD
import multer from "multer";
const upload = multer({
    storage:multer.memoryStorage(),
});
export default upload;
//multer is a built in node js module that is used fo handling the form data which typically includes encoding used for form submissions that includes files
//storage: this options allows us to specify a path where the uploaded should be stored , by default it stores file on the disk but we have wriiten memory Stroge

//multer.memoryStorage() -> THis method keeps an instance of the storage engine that keeps the file data in memory as the "BUFFER" object.. when files are uploaded they are stored in ram insteadof storing in disk memory

// This is useful in scenarios where we want to process files immediately without saving them, such as when you need to pass the file data to another service or manipulate it before saving.
=======
import multer from "multer";
const upload = multer({
    storage : multer.memoryStorage(),
});

export default upload;
>>>>>>> f325c1c19df733c1bddd4d05abe628dcbeb50b14
