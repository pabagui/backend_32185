import { logger } from "../logger/pino.js";

export function notFound(req, res) {
    logger.info('Wrong route: ', req.path, 'Method: ', req.method)
    res.status(404).json({ Message: 'Page not found', 'Wrong route': req.path, Method: req.method })
  }