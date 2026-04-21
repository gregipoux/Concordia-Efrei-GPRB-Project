import { Router } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import rateLimit from 'express-rate-limit'
import { body, validationResult } from 'express-validator'
import { prisma } from '../lib/prisma.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts, try again later.' },
})

router.post(
  '/login',
  loginLimiter,
  [
    body('alias').isString().trim().notEmpty().isLength({ max: 64 }),
    body('password').isString().notEmpty().isLength({ max: 128 }),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: 'invalid_input' })
      }

      const { alias, password } = req.body
      const agent = await prisma.agent.findUnique({ where: { alias } })

      const fakeHash = '$2b$10$CwTycUXWue0Thq9StjUM0uJ8vG3lX0rHn2v5qKq9xWp9pZp9pZp9p'
      const hash = agent ? agent.password : fakeHash
      const match = await bcrypt.compare(password, hash)

      if (!agent || !match) {
        return res.status(401).json({ error: 'invalid_credentials' })
      }

      const token = jwt.sign(
        { sub: agent.id, alias: agent.alias, role: agent.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '12h' }
      )

      return res.json({
        token,
        agent: {
          id: agent.id,
          alias: agent.alias,
          role: agent.role,
          specialization: agent.specialization,
          roleInHeist: agent.roleInHeist,
          status: agent.status,
        },
      })
    } catch (err) {
      next(err)
    }
  }
)

router.get('/me', requireAuth, (req, res) => {
  res.json({ agent: req.agent })
})

export default router
