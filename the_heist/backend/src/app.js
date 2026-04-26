import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import authRoutes from './routes/auth.js'
import missionsRoutes from './routes/missions.js'
import vehiclesRoutes from './routes/vehicles.js'
import intelRoutes from './routes/intel.js'
import agentsRoutes from './routes/agents.js'

export function createApp() {
  const app = express()

  app.use(helmet())
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN?.split(',').map((s) => s.trim()) || true,
      credentials: true,
    })
  )
  app.use(express.json({ limit: '100kb' }))

  app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'the-heist-api' })
  })

  app.use('/api/auth', authRoutes)
  app.use('/api/missions', missionsRoutes)
  app.use('/api/vehicles', vehiclesRoutes)
  app.use('/api/intel', intelRoutes)
  app.use('/api/agents', agentsRoutes)

  app.use((req, res) => {
    res.status(404).json({ error: 'not_found' })
  })

  app.use((err, req, res, _next) => {
    console.error('[error]', err)
    const status = err.status || 500
    res.status(status).json({ error: err.publicMessage || 'internal_error' })
  })

  return app
}

export const app = createApp()
