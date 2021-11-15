import multer from 'multer';

export const FileType = {
  audio: 'audio',
  image: 'image',
  video: 'video',
};

// Express middleware to handle the parsing of `multipart/form-data` requests,
// including the handling of file uploads and request body parsing.
export const upload = (allowedFileTypes: string[]) => multer({
  // Set the destination of the uploaded files to `uploads/`
  dest: 'uploads/',
  // Limit the maximum file size to 10MB
  limits: {
    fileSize: 10485760,
  },
  // Filter out files that are not audio, image, or video
  fileFilter(req, file, callback) {
    const fileCategory = file.mimetype.split('/')[0];
    const isSupported = allowedFileTypes.includes(fileCategory);
    callback(null, isSupported);
  },
});
