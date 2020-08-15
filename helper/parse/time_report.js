module.exports = async (date) => {

   var dateutc = date.toUTCString();
   debugger;
   // get hour UTC     
   var hour_utc = new Date().getUTCHours() * 60 * 60;
   // get time UTC
   var time_utc = Date.parse(dateutc);
   // get hour NOW 
   var hour_now = new Date().getHours() * 60 * 60;
   // return time report
   const time_report = time_utc / 1000 - hour_utc + hour_now;
   // console.log(time_report *1000);

   //return a new Promise
   return (new Date(time_report * 1000));

}