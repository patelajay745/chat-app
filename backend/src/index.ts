import 'dotenv/config'
import connectDB from "@/db"
import app from './app';
import { env } from '@/validators/env';
import http from 'http'

const PORT = env.PORT ?? 8000

const httpServer = http.createServer(app)

connectDB().then(() => httpServer.listen(PORT, () => {
    console.log(`server running on ${env.BASEURL}:${PORT}`)
}))

