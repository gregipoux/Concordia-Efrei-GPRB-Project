export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.agent || !roles.includes(req.agent.role)) {
      return res.status(403).json({ error: 'forbidden' })
    }
    next()
  }
}
