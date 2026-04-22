import { Router } from 'express'
import { body, param, query, validationResult } from 'express-validator'
import { prisma } from '../lib/prisma.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

const VEHICLE_STATUSES = ['IN_GARAGE', 'IN_USE', 'DUMPED', 'SOLD']

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
      .isIn(VEHICLE_STATUSES),
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

      const vehicles = await prisma.vehicle.findMany({
        where,
        include: {
          driver: {
            select: {
              id: true,
              alias: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      })

      res.json({ vehicles })
    } catch (err) {
      next(err)
    }
  }
)

router.post(
  '/',
  [
    body('name').isString().trim().notEmpty().isLength({ max: 128 }),
    body('year').isString().trim().notEmpty().isLength({ max: 32 }),
    body('color').isString().trim().notEmpty().isLength({ max: 64 }),
    body('colorHex').isString().trim().notEmpty().isLength({ max: 16 }),
    body('plate').isString().trim().notEmpty().isLength({ max: 32 }),
    body('status')
      .optional()
      .isString()
      .trim()
      .isIn(VEHICLE_STATUSES),
    body('driverId')
      .optional({ nullable: true })
      .isInt({ min: 1 }),
    body('stashLocation')
      .optional({ nullable: true })
      .isString()
      .trim()
      .isLength({ max: 255 }),
  ],
  async (req, res, next) => {
    try {
      if (hasValidationErrors(req, res)) {
        return
      }

      const status = req.body.status
      const vehicle = await prisma.vehicle.create({
        data: {
          name: req.body.name.trim(),
          year: req.body.year.trim(),
          color: req.body.color.trim(),
          colorHex: req.body.colorHex.trim(),
          plate: req.body.plate.trim(),
          status,
          stashLocation: req.body.stashLocation?.trim() || null,
          driverId: status === 'DUMPED' ? null : (req.body.driverId ?? null),
        },
        include: {
          driver: {
            select: {
              id: true,
              alias: true,
            },
          },
        },
      })

      res.status(201).json({ vehicle })
    } catch (err) {
      next(err)
    }
  }
)

router.put(
  '/:id',
  [
    param('id').isInt({ min: 1 }),
    body('name').optional().isString().trim().notEmpty().isLength({ max: 128 }),
    body('year').optional().isString().trim().notEmpty().isLength({ max: 32 }),
    body('color').optional().isString().trim().notEmpty().isLength({ max: 64 }),
    body('colorHex').optional().isString().trim().notEmpty().isLength({ max: 16 }),
    body('plate').optional().isString().trim().notEmpty().isLength({ max: 32 }),
    body('status')
      .optional()
      .isString()
      .trim()
      .isIn(VEHICLE_STATUSES),
    body('driverId')
      .optional({ nullable: true })
      .isInt({ min: 1 }),
    body('stashLocation')
      .optional({ nullable: true })
      .isString()
      .trim()
      .isLength({ max: 255 }),
  ],
  async (req, res, next) => {
    try {
      if (hasValidationErrors(req, res)) {
        return
      }

      const id = Number(req.params.id)
      const data = {}

      if (req.body.name !== undefined) {
        data.name = req.body.name.trim()
      }
      if (req.body.year !== undefined) {
        data.year = req.body.year.trim()
      }
      if (req.body.color !== undefined) {
        data.color = req.body.color.trim()
      }
      if (req.body.colorHex !== undefined) {
        data.colorHex = req.body.colorHex.trim()
      }
      if (req.body.plate !== undefined) {
        data.plate = req.body.plate.trim()
      }
      if (req.body.status !== undefined) {
        data.status = req.body.status
      }
      if (req.body.stashLocation !== undefined) {
        data.stashLocation = req.body.stashLocation?.trim() || null
      }
      if (req.body.driverId !== undefined) {
        data.driverId = req.body.driverId ?? null
      }

      // Business rule: a dumped vehicle cannot have a driver.
      if (data.status === 'DUMPED') {
        data.driverId = null
      }

      const vehicle = await prisma.vehicle.update({
        where: { id },
        data,
        include: {
          driver: {
            select: {
              id: true,
              alias: true,
            },
          },
        },
      })

      res.json({ vehicle })
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

      await prisma.vehicle.delete({
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
