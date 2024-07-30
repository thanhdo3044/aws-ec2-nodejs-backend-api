import * as fs from 'fs'
import * as path from 'path'

function logToFile(message: string, logType: 'error' | 'info', filePath: string) {
  const logDirectory = path.dirname(filePath)
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true })
  }
  const timestamp = new Date().toLocaleString();
  const logMessage = `[${timestamp}] [${logType.toUpperCase()}] ${message}\n`

  fs.appendFile(filePath, logMessage, (err) => {
    if (err) {
      console.error('Failed to write to log file:', err)
    }
  })
}
function logErrorToFile(error: string, filePath: string = '/logs/error.log') {
  logToFile(error, 'error', filePath)
}
function logInfoToFile(info: string, filePath: string = 'logs/info.log') {
  logToFile(info, 'info', filePath)
}

export { logErrorToFile, logInfoToFile }
