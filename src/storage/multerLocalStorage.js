import multer from 'multer'

export const multerLocalStorage = multer.diskStorage({
  destination: 'public/uploads',
  filename: (req, file, cb) => {
    const filenameArray = file.originalname.split('.');

    const format = filenameArray.pop();

    const filename = filenameArray.join('-').replace(/ /gi, '-')

    cb(null, filename + '-' + Date.now() + '.' + format)
  }
})
