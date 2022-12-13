import express from 'express';
import * as controller from './payment.controller.js'


const router = express.Router();

router.post(
    '/payment/add',
    controller.addPayment,
  );
  
router.get(
    '/payment:user_id',
    controller.getPaymentDetailsByUserId
);
router.put(
    '/payment/update/:id',
    controller.updatePayment
)
router.delete(
    '/payment/delete/:id',
    controller.deletePayment
)

export default router;