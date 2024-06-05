const mongoose = require('mongoose');

const subscribeSchema= new mongoose.Schema(
    {
        subscribeId:{
            type:Number,
            unique:true,
        },
        email:{
            type : String,
            required:true
        },
        submitDate: {
            type: String
        }
    },
    { collection: 'subscribe' }
);

subscribeSchema.pre('save', async function (next) {
    if (!this.subscribeId) {
      this.subscribeId = await generateNextSubscribeId();
    }
    next();
  });


  subscribeSchema.pre('save', async function (next) {
    if (!this.submitDate) {
        const currentDate = new Date();
      this.submitDate = currentDate.toLocaleString();
    }
    next();
  });
  
  async function generateNextSubscribeId() {
    
    const maxSubscribe = await subscribe.findOne({}, {}, { sort: { 'subscribeId': -1 } });
    let nextSubscribeId = 1;
  
    if (maxSubscribe) {
     
      nextSubscribeId = maxSubscribe.subscribeId + 1;
    }
  
    return nextSubscribeId;
  }


const subscribe = mongoose.model('subscribe', subscribeSchema);
module.exports = subscribe;