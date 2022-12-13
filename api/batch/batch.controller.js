import models from '../../models/index.js'


const Batch =  models.batch;
const User =  models.user;

export const addBatch = async( req, res)=>{
    try{
        const {batchName} = req.body;
        let status = "pending";
        if(amount === 500) status  = "completed"
        const makeBatch = {
            batchName
        }
        const result = await Payment.create(makePayment);
        return res.status(200).json(result.dataValues.status);
    }catch(err){
        res.status(402).json(err);
    }
};

export const getBatchByUserId = async(req, res)=>{
    try{
        const {user_id} = req.params;
        const user = await User.findAll({where:{id: user_id}});
        const id = user.dataValues.batch_id;
        const result = await Batch.findAll({where:{id},
            attributes : [
                'batchName',
                'createdAt',
                'updatedAt',
            ]
        }
        )
        return res.json(result);
    }
    catch(err){
        res.status(402).json(err);
    }
}
export const updateBatch = async(req, res)=>{
    try{
        const id = req.params;
        const data = req.body;
        const result = await Batch.update(data, {where:{id}});
        return res.json(result);

    }
    catch(err){
        res.status(402).json(err);
    }
}
export const deleteBatch = async (req, res)=>{
    try{
        const id  = req.params;
        const result = await Batch.destroy({where:{id}});
        return res.json(result);

    }
    catch(err){
        res.status(402).json(err);
    }
}
export const changeBatchOfUser = async(req, res)=>{

    try{
        const {id} = req.params;
        const {batch_id}= req.body;
        const result = await User.update(batch_id, {where:{id}});
        return res.json(result);
    }
    catch(err){
        res.status(402).json(err);
    }
}