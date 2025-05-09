import { Router } from 'express';

// helpers
import { verifyAccessToken } from '../helpers/jwt';

// routes
import auth from './auth';
import product from './product';
import order from './order';
import preferences from "./preferences"

const router = Router();

router.get('/', (req, res) => {
  res.end('hey');
});

router.use('/auth', auth);
router.use('/product', product);
router.use('/order', verifyAccessToken, order);
router.use('/preferences', verifyAccessToken, preferences);

export default router;
