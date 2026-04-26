import { Router } from 'express'
import bcrypt from 'bcrypt'
import { body, validationResult } from 'express-validator'
import { prisma } from '../lib/prisma.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

const AGENT_ROLES = ['GODFATHER', 'AGENT']

const AGENT_PUBLIC_SELECT = {
  id: true,
  alias: true,
  role: true,
  specialization: true,
  roleInHeist: true,
  status: true,
  isOnline: true,
  heistCount: true,
  missionsCount: true,
  recruitmentDate: true,
}

function hasValidationErrors(req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ error: 'invalid_input' })
    return true
  }
  return false
}

router.use(requireAuth)

router.get('/', async (req, res, next) => {
  try {
    const agents = await prisma.agent.findMany({
      select: AGENT_PUBLIC_SELECT,
      orderBy: { alias: 'asc' },
    })
    res.json({ agents })
  } catch (err) {
    next(err)
  }
})

router.post(
  '/',
  [
    body('alias').isString().trim().notEmpty().isLength({ min: 3, max: 64 }),
    body('password').optional().isString().isLength({ min: 8, max: 128 }),
    body('role').optional().isString().trim().isIn(AGENT_ROLES),
    body('specialization')
      .optional({ nullable: true })
      .isString()
      .trim()
      .isLength({ max: 128 }),
    body('roleInHeist')
      .optional({ nullable: true })
      .isString()
      .trim()
      .isLength({ max: 128 }),
  ],
  async (req, res, next) => {
    try {
      if (hasValidationErrors(req, res)) {
        return
      }

      const passwordHash = await bcrypt.hash(req.body.password || 'heist2026', 10)

      const agent = await prisma.agent.create({
        data: {
          alias: req.body.alias.trim(),
          password: passwordHash,
          role: req.body.role || 'AGENT',
          specialization: req.body.specialization?.trim() || null,
          roleInHeist: req.body.roleInHeist?.trim() || null,
        },
        select: AGENT_PUBLIC_SELECT,
      })

      res.status(201).json({ agent })
    } catch (err) {
      if (err.code === 'P2002') {
        return res.status(409).json({ error: 'alias_taken' })
      }
      next(err)
    }
  }
)

export default router
