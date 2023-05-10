const api_logs = require('../models/LogsAPI');


const createLog = async (req, decodedData) => {
    try{
        const logs = await api_logs.findOne({user: decodedData.id});
        if(!logs || logs.length < 1){
            await api_logs.create({user: decodedData.id, api:{reqMethod: req.method,reqUrl: req.originalUrl}})
        }else{
            logs.api.push({reqMethod: req.method,reqUrl: req.originalUrl})
            logs.save();
        }
        return true;
    }catch(e){
        return false;
    }
}

module.exports = createLog;