import multer from 'multer';

const storage = multer.diskStorage({
  // set the directory where the uploaded files will be stored
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  // set the name of the uploaded file
  filename: (req, file, cb) => {
    const fileName = file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

export default upload;
