import { Router } from 'express'
import { body, param, query, validationResult } from 'express-validator'
import { prisma } from '../lib/prisma.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

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
    query('search')
      .optional()
      .isString()
      .trim()
      .isLength({ max: 255 }),
  ],
  async (req, res, next) => {
    try {
      if (hasValidationErrors(req, res)) {
        return
      }

      const search = req.query.search?.trim()
      const where = search
        ? {
            OR: [
              { title: { contains: search } },
              { description: { contains: search } },
            ],
          }
        : {}

      const intelFiles = await prisma.intelFile.findMany({
        where,
        include: {
          author: {
            select: {
              id: true,
              alias: true,
            },
          },
        },
        orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
      })

      res.json({ intelFiles })
    } catch (err) {
      next(err)
    }
  }
)

router.post(
  '/',
  [
    body('title').isString().trim().notEmpty().isLength({ max: 255 }),
    body('description').isString().trim().notEmpty(),
    body('tags').isString().trim().notEmpty(),
    body('authorId').isInt({ min: 1 }),
  ],
  async (req, res, next) => {
    try {
      if (hasValidationErrors(req, res)) {
        return
      }

      const intelFile = await prisma.intelFile.create({
        data: {
          title: req.body.title.trim(),
          description: req.body.description.trim(),
          tags: req.body.tags.trim(),
          authorId: Number(req.body.authorId),
        },
        include: {
          author: {
            select: {
              id: true,
              alias: true,
            },
          },
        },
      })

      res.status(201).json({ intelFile })
    } catch (err) {
      next(err)
    }
  }
)

router.put(
  '/:id',
  [param('id').isInt({ min: 1 })],
  async (req, res, next) => {
    try {
      if (hasValidationErrors(req, res)) {
        return
      }

      const id = Number(req.params.id)
      const current = await prisma.intelFile.findUnique({
        where: { id },
        select: { id: true, isPinned: true },
      })

      if (!current) {
        res.status(404).json({ error: 'not_found' })
        return
      }

      const intelFile = await prisma.intelFile.update({
        where: { id },
        data: { isPinned: !current.isPinned },
        include: {
          author: {
            select: {
              id: true,
              alias: true,
            },
          },
        },
      })

      res.json({ intelFile })
    } catch (err) {
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

      await prisma.intelFile.delete({
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
