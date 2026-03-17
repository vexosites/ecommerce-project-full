import multer from "multer";

// storage em memória (RAM)
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB (opcional)
  }
});

export default upload;
