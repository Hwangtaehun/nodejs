import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

export const multerOption = {
  Storage: diskStorage({
    destination: join(__dirname, '..', 'uploads'),
    filename: (req, file, cb) => {
      cb(null, randomUUID() + extname(file.originalname));
    },
  }),
};
