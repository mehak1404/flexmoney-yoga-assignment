import express from 'express';
import * as controller from './batch.controller.js'


const router = express.Router();

router.post(
    '/batch/add',
    controller.addBatch,
  );
  
router.get(
    '/batch:user_id',
    controller.getBatchByUserId
);
router.put(
    '/batch/update/:id',
    controller.updateBatch
)
router.delete(
    '/batch/delete/:id',
    controller.deleteBatch
)
router.put(
    'batch/change/:id',
    controller.changeBatchOfUser
)

export default router;