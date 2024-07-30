import multer, { StorageEngine } from 'multer'
import path from 'path'
import { Request, Response, NextFunction } from 'express'

// Cấu hình lưu trữ tập tin
const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, 'uploads/') // Đường dẫn thư mục lưu trữ tập tin
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const ext = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix + ext) // Tạo tên tập tin duy nhất
  }
})

const fileFilter = (req: Request, file: Express.Multer.File, callback: (error: Error | null) => void) => {
  const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/webp', 'image/tiff']
  const allowedVideoTypes = [
    'video/mp4',
    'video/x-msvideo',
    'video/quicktime',
    'video/x-matroska',
    'video/x-ms-wmv',
    'video/x-flv',
    'video/webm',
    'video/mpeg'
  ]
  const allowedDocumentTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'text/plain',
    'text/markdown',
    'application/rtf',
    'application/vnd.oasis.opendocument.text',
    'application/vnd.oasis.opendocument.spreadsheet',
    'application/vnd.oasis.opendocument.presentation'
  ]

  const allowedTypes = [...allowedImageTypes, ...allowedVideoTypes, ...allowedDocumentTypes]

  if (allowedTypes.includes(file.mimetype)) {
    callback(null)
  } else {
    callback(new Error('Invalid file type. Allowed types are: images, videos, documents.'))
  }
}

// Tạo middleware multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter
})

// Middleware xử lý lỗi tập tin
export function fileUploadMiddleware(req: Request, res: Response, next: NextFunction) {
  upload.single('file')(req, res, (err: any) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        // Lỗi từ multer
        res.status(400).json({
          status: 'error',
          message: err.message
        })
      } else {
        // Lỗi khác
        res.status(400).json({
          status: 'error',
          message: err.message
        })
      }
    } else {
      next()
    }
  })
}

// Middleware xử lý tải lên nhiều tập tin
export function filesUploadMiddleware(req: Request, res: Response, next: NextFunction) {
  upload.array('files', 5)(req, res, (err: any) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        // Lỗi từ multer
        res.status(400).json({
          status: 'error',
          message: err.message
        })
      } else {
        // Lỗi khác
        res.status(400).json({
          status: 'error',
          message: err.message
        })
      }
    } else {
      next()
    }
  })
}
