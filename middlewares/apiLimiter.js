import rateLimiter from 'express-rate-limit';

const apiLimiter = rateLimiter({
  windowMs: 1000 * 60 * 5,
  max: 5,
  message: { msg: 'IP rate limit exceeded,try again after 5 mins' },
});

export default apiLimiter;
