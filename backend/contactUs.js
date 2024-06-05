const mongoose = require('mongoose');




const ContactSchema = new mongoose.Schema({
  contactId: {
    type: Number,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  submitDate: {
    type: String,
    
  },
}, { collection: 'contactUs' });


ContactSchema.pre('save', async function (next) {
  if (!this.submitDate) {
      const currentDate = new Date();
    this.submitDate = currentDate.toLocaleString();
  }
  next();
});

ContactSchema.pre('save', async function (next) {
  if (!this.contactId) {
    this.contactId = await generateNextContactId();
  }
  next();
});

// Function to generate the next contactId
async function generateNextContactId() {
  // Find the maximum contactId from the database
  const maxContact = await contactUs.findOne({}, {}, { sort: { 'contactId': -1 } });
  let nextContactId = 1;

  if (maxContact) {
    // Increment the maximum contactId
    nextContactId = maxContact.contactId + 1;
  }

  return nextContactId;
}


const contactUs = mongoose.model('contactUs', ContactSchema);
module.exports = contactUs;