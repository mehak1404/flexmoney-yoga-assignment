import models from '../../models/index.js'


const Payment =  models.payment;

export const addPayment = async( req, res)=>{
    try{
        const {amount, user_id, month} = req.body;
        let status = "pending";
        if(amount === 500) status  = "completed"
        const makePayment = {
            month,
            user_id,
            status,
        }
        const result = await Payment.create(makePayment);
        return res.status(200).json(result.dataValues.status);
    }catch(err){
        res.status(402).json(err);
    }
};

export const getPaymentDetailsByUserId = async(req, res)=>{
    try{
        const {user_id} = req.params;
        const result = await Payment.findAll({where:{user_id}});
        return res.json(result);
    }
    catch(err){
        res.status(402).json(err);
    }
}
export const updatePayment = async(req, res)=>{
    try{
        const id = req.params;
        const data = req.body;
        const result = await Payment.update(data, {where:{id}});
        return res.json(result);

    }
    catch(err){
        res.status(402).json(err);
    }
}
export const deletePayment = async (req, res)=>{
    try{
        const id  = req.params;
        const result = await Payment.destroy({where:{id}});
        return res.json(result);

    }
    catch(err){
        res.status(402).json(err);
    }
}