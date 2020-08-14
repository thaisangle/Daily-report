const Setting = require('../../models/setting')
const { itemAlreadyExists } = require('../utils')

module.exports =async (start,end)=> {
    /**
     * Parse status when add  Report 
     * @param {int} start - time start
     * @param {int} end - time end
     */
      //set time to UTC parse in UTC+7(vietnam);
      const nows = new Date().getUTCHours();
      //  handle hour   
      const hours = nows + 7 >= 24? nows + 7 - 24:nows + 7;
    //   console.log(hours);
    //   console.log(start);
    //   console.log(end);
      const hour = await (hours)*3600;
      const minute = await new Date().getMinutes()*60;
      const second  = await new Date().getMilliseconds();
      const now = hour + minute + second;
      if(now >= start  && now <= end ){
          return true;
      }
      return false;
    }