export const fileNamer = (
  req: Express.Request,
  file: Express.Multer.File,
  // eslint-disable-next-line @typescript-eslint/ban-types
  cb: Function,
) => {
  const fileName = file.originalname.split(' ').join('-');
  const fileExtension = fileName.split('.').pop();
  const fileNamer = `${Date.now()}.${fileExtension}`;
  cb(null, fileNamer);
};
