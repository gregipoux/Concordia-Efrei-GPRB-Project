import { Router } from 'express'
import { body, param, query, validationResult } from 'express-validator'
import { prisma } from '../lib/prisma.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

const MISSION_STATUSES = ['THE_PLAN', 'IN_PROGRESS', 'THE_LOOT']
const MISSION_PRIORITIES = ['CRITICAL', 'HIGH', 'LOW']

function hasValidationErrors(req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ error: 'invalid_input' })
    return true
  }
  return false
}

router.use(requireAuth)

router.get(
  '/',
  [
    query('status')
      .optional()
      .isString()
      .trim()
      .isIn(MISSION_STATUSES),
  ],
  async (req, res, next) => {
    try {
      if (hasValidationErrors(req, res)) {
        return
      }

      const where = {}
      if (req.query.status) {
        where.status = req.query.status
      }

      const missions = await prisma.mission.findMany({
        where,
        include: {
          assignee: {
            select: {
              id: true,
              alias: true,
            },
          },
        },
        orderBy: { date: 'desc' },
      })

      res.json({ missions })
    } catch (err) {
      next(err)
    }
  }
)

router.post(
  '/',
  [
    body('title').isString().trim().notEmpty().isLength({ max: 255 }),
    body('priority').isString().trim().isIn(MISSION_PRIORITIES),
    body('status')
      .optional()
      .isString()
      .trim()
      .isIn(MISSION_STATUSES),
    body('assigneeId')
      .optional({ nullable: true })
      .isInt({ min: 1 }),
  ],
  async (req, res, next) => {
    try {
      if (hasValidationErrors(req, res)) {
        return
      }

      const mission = await prisma.mission.create({
        data: {
          title: req.body.title.trim(),
          priority: req.body.priority,
          status: req.body.status,
          assigneeId: req.body.assigneeId ?? null,
        },
        include: {
          assignee: {
            select: {
              id: true,
              alias: true,
            },
          },
        },
      })

      res.status(201).json({ mission })
    } catch (err) {
      next(err)
    }
  }
)

router.put(
  '/:id',
  [
    param('id').isInt({ min: 1 }),
    body('title').optional().isString().trim().notEmpty().isLength({ max: 255 }),
    body('priority')
      .optional()
      .isString()
      .trim()
      .isIn(MISSION_PRIORITIES),
    body('status')
      .optional()
      .isString()
      .trim()
      .isIn(MISSION_STATUSES),
    body('assigneeId')
      .optional({ nullable: true })
      .isInt({ min: 1 }),
  ],
  async (req, res, next) => {
    try {
      if (hasValidationErrors(req, res)) {
        return
      }

      const id = Number(req.params.id)
      const data = {}

      if (req.body.title !== undefined) {
        data.title = req.body.title.trim()
      }
      if (req.body.priority !== undefined) {
        data.priority = req.body.priority
      }
      if (req.body.status !== undefined) {
        data.status = req.body.status
      }
      if (req.body.assigneeId !== undefined) {
        data.assigneeId = req.body.assigneeId ?? null
      }

      const mission = await prisma.mission.update({
        where: { id },
        data,
        include: {
          assignee: {
            select: {
              id: true,
              alias: true,
            },
          },
        },
      })

      res.json({ mission })
    } catch (err) {
      if (err.code === 'P2025') {
        res.status(404).json({ error: 'not_found' })
        return
      }
      next(err)
    }
  }
)

router.delete(
  '/:id',
  [param('id').isInt({ min: 1 })],
  async (req, res, next) => {
    try {
      if (hasValidationErrors(req, res)) {
        return
      }

      await prisma.mission.delete({
        where: { id: Number(req.params.id) },
      })

      res.status(204).send()
    } catch (err) {
      if (err.code === 'P2025') {
        res.status(404).json({ error: 'not_found' })
        return
      }
      next(err)
    }
  }
)

export default router
