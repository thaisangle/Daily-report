const parsetimereport = require("../parse/time_report");
const Report = require("../../models/report");
/**
 * param user_id : truyền vào user id 
 */
module.exports ={
   async check_report(user_id){ 
        const date = new Date().setHours(0,0,0,0).valueOf();
        const date_search = await parsetimereport(new Date(date))
        const date_next = await parsetimereport(new Date(date))
        date_next.setDate(date_search.getDate()+1);

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