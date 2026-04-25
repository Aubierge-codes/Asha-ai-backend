const Message= require('../models/message.model');
const askOpenAI= require('../services/openai.service');


exports.sendMessage= async(req, res, next)=>{
    try {
        const {message} = req.body;
        if(!message){
            return res.status(400).json({error:'Message is required'});

        }


        let aiReply;

        try{aiReply= await askOpenAI(message);
        } catch{
         aiReply="Thanks for your message 💜! I'm still learning and will give better answers very soon."
}
    

     const savedMessage= await Message.create({

        userMessage: message,
        botReply: aiReply,
     });

     res.status(200).json({
        success:true,
        data: savedMessage
     });
    } catch (error) {
        next(error);
    }
};


