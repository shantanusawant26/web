const mongoose = require('mongoose');

const applicationFormSchema = new mongoose.Schema({
  applicationId: { type: Number, unique: true },
  position: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  contactNumber: { type: String },
  alternateContactNumber: { type: String },
  dob: { type: Date },
  linkedin: { type: String },
  currentCompany: { type: String },
  totalExperience: { type: String },
  relevantExperience: { type: String },
  currentCTC: { type: String },
  expectedCTC: { type: String },
  noticePeriod: { type: String },
  resume: { type: String },
  submitDate: {type: String}
}, { collection: 'applicationForm' });

applicationFormSchema.pre('save', async function (next) {
  if (!this.submitDate) {
      const currentDate = new Date();
    this.submitDate = currentDate.toLocaleString();
  }
  next();
});


applicationFormSchema.pre('save', async function (next) {
  if (!this.applicationId) {
    this.applicationId = await generateNextApplicationId();
  }
  next();
});


async function generateNextApplicationId() {
  
  const maxApplication = await ApplicationForm.findOne({}, {}, { sort: { 'applicationId': -1 } });
  let nextApplicationId = 1;

  if (maxApplication) {
    
    nextApplicationId = maxApplication.applicationId + 1;
  }

  return nextApplicationId;
}



const ApplicationForm = mongoose.model('applicationForm', applicationFormSchema);

module.exports = ApplicationForm;
