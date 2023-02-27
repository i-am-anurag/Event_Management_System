const Event = require("../models/event");

const cron = require('node-cron');

cron.schedule('* * * * *', async () => {
    console.log("Crone job is running");
    const eventRecords = await Event.find();

    eventRecords.forEach(record=>{
        const evenTime = record.startTime.getTime();
        const currenTime = new Date().getTime();
        const calcdiffrence = Math.floor((evenTime- currenTime) / 60000);
        console.log("Calc Time difference is:",calcdiffrence);
        if(calcdiffrence===60)
        {
            console.log("Reminder is send to user");
        }
    })
}
);