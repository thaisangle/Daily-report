const parsetimereport = require("../parse/time_report");
const Report = require("../../models/report");
/**
 * param user_id : truyền vào user id 
 */
module.exports ={
   async check_report(user_id){ 
        const date = new Date().valueOf();
        const date1 =  await parsetimereport(new Date(date))
        const date2 = await parsetimereport(new Date(date))
        

        const date_search = date1.setUTCHours(0,0,0,0);
        date2.setUTCDate(date1.getUTCDate()+1);
        const date_next = date2.setUTCHours(0,0,0,0);
        
        

        console.log(new Date(date_search));
        console.log(new Date(date_next));

        const list_report = await Report.find({
            "userId":user_id,
            "createdAt":{"$gte" : new Date(date_search), 
                        "$lt" : new Date(date_next)}
            });
        // return list_report;
        if(list_report.length > 0 ){
            return true;
        }
        return false;
    }
}