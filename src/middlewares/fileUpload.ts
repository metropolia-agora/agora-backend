import multer from 'multer';
import { v4 as uuid4 } from 'uuid';
import { BadRequestException } from '../exceptions';

// File types
export const FileTypes = {
  audio: 'audio',
  image: 'image',
  video: 'video',
};

// Express middleware to handle the parsing of `multipart/form-data` requests,
// including the handling of fileUpload uploads and request body parsing.
export const fileUpload = (allowedFileTypes: string[]) => multer({
  // Set file storage options
  storage: multer.diskStorage({
    // Set the destination of the uploaded files to `uploads/`
    destination: 'uploads/',
    // Set the filename of the file to random generated filename + extension
    filename: (req, file, callback) => {
      const extension = file.originalname.split('.').pop();
      callback(null, uuid4() + '.' + extension);
    },
  }),
  // Limit the maximum fileUpload size to 10 MB
  limits: { fileSize: 10485760 },
  // Filter out files that are not allowed
  fileFilter(req, file, callback) {
    const fileCategory = file.mimetype.split('/')[0];
    const isAllowed = allowedFileTypes.includes(fileCategory);
    if (!isAllowed) return callback(new BadRequestException('The file type is not allowed.'));
    callback(null, true);
  },
});
