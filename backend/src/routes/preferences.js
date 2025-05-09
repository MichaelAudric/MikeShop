import express from 'express';
const router = express.Router();

import Preferences from '../controllers/preferences';

router.post("/", Preferences.Create);
router.get("/", Preferences.Get);
router.put("/", Preferences.Update);

export default router;

