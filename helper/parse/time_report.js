const Setting = require('../../models/setting')
const { itemAlreadyExists } = require('../utils')

module.exports =async (start,end)=> {
    /**
     * Parse status when add  Report 
     * @param {int} start - time start
     * @param {int} end - time end
     */
      //set time to UTC parse in UTC+7(vietnam);
      const hour  =  await (new Date().getUTCHours()+7)*3600;
      const minute = await new Date().getMinutes()*60;
      const second  = await new Date().getMilliseconds();
      const now = hour + minute + second;
      if(now >= start  && now <= end ){
          return true;
      }
      return false;
    }