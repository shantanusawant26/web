const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    applicantId: { type: Number, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    standard: { type: String, required: true },
    subject: { type: [String], required: true },
    submitDate: {type: String}
});



classSchema.pre('save', async function (next) {
  if (!this.submitDate) {
      const currentDate = new Date();
    this.submitDate = currentDate.toLocaleString();
  }
  next();
});


classSchema.pre('save', async function (next) {
    if (!this.applicantId) {
      this.applicantId = await generateNextApplicantId();
    }
    next();
  });
  
  
  async function generateNextApplicantId() {
    
    const maxApplicantId= await Class.findOne({}, {}, { sort: { 'applicantId': -1 } });
    let nextApplicantId = 1;
  
    if (maxApplicantId) {
      nextApplicantId = maxApplicantId.applicantId + 1;
    }
  
    return nextApplicantId;
  }





const Class = mongoose.model('class', classSchema,'class');

module.exports = Class;