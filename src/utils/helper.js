const Event = require('../models/event');

const codeGenerator = async()=>{
    let randomCode = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    for(let count = 0; count < 6;count+=1){
        randomCode += characters.charAt(Math.floor(Math.random() * 26));
    }

    const eventCode = await Event.findOne({eventCode:randomCode});
    if(eventCode) {
        codeGenerator();
    }
    return randomCode;
}

module.exports = {
    codeGenerator,
}