module.exports = async(date)=>{
   //get date UTC string
    var dateutc = date.toUTCString();
   // get hour UTC     
    var hour_utc  = new Date().getUTCHours();
   // get time UTC
    var time_utc = Date.parse(dateutc);
   //  var time_utc = 1597535685000;
   // get hour NOW 
    var hour_now = 7 * 60 * 60;
    // return time report
    const time_report = time_utc/1000 + hour_now;
    console.log(time_utc/1000);
   //  console.log('utc'+hour_utc);
    console.log(hour_now);
    console.log(time_report *1000);
    console.log(new Date(time_report * 1000));
    
    //return a new Promise
     return (new Date(time_report * 1000)); 
    
}