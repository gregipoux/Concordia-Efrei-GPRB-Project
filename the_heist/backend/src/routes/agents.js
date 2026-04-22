import { Router } from 'express'
import { prisma } from '../lib/prisma.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.use(requireAuth)

router.get('/', async (req, res, next) => {
  try {
    const agents = await prisma.agent.findMany({
      select: {
        id: true,
        alias: true,
        status: true,
        role: true,
      },
      orderBy: { alias: 'asc' },
    })

    res.json({ agents })
  } catch (err) {
    next(err)
  }
})

export default router
