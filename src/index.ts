import express from 'express'
import { logErrorToFile, logInfoToFile } from './v1/utils/logger'

const app = express()
try {
  console.log('V1 connection successful')
  logInfoToFile('V1 connection successful')
} catch (error) {
  logErrorToFile((error as Error).toString())
}

export default app
