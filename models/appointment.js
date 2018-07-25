const mongoose = require('mongoose');
// const moment = require('moment');
const Twilio = require('twilio');
const config = require('../config');
let moment = require("moment-timezone");
// import * as moment from "moment-timezone";
let now = moment();
console.log(now);


const accountSid = "ACde3438dfd2ca578a6e66d36c709550db";
const authToken =  "2b4eff9839d75c4a21fd509e34a83ebe";
var twilioPhoneNumber = '+16672135463'

var twilio = require('twilio');

var client = new twilio(accountSid, authToken);

client.messages.create({
    body: 'Hello from Node',
    to: '+4105071359',  // Text this number
    from: '+16672135463' // From a valid Twilio number
})
    .then((message) => console.log(message.sid));



const appointmentSchema = new mongoose.Schema({
  appointmentName: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    required : true
  },
  timeZone: {
    type : String,
    default : "America/Denver"
  },
  appointmentNumber: {
    type: String,
    required:true
  },
  notification: {
    type: Number,
    required: true
  },
  notificationLabel: {
    type: String,
    required: true
  },
  coordinates : {
    type : Object
  },
  address : {
    type : String
  }
}); 

appointmentSchema.methods.requiresNotification = function(date) {
  return Math.round(moment.duration(moment(this.time).utc()
                          .diff(moment(date).utc())
                          ).asMinutes()) === this.notification;
};

appointmentSchema.statics.sendNotifications = function(cb) {
  const searchDate = new Date();
  console.log('searchDate : ' + searchDate);
  Appointment
    .find()
    .then(function(appointments) {
      appointments = appointments.filter(function(appointment){
        return appointment.requiresNotification(searchDate);
      });
      if (appointments.length > 0) {
        console.log("I FOUND AN APPOINTMENT!!!");
        console.log(appointments);
        sendNotifications(appointments);
      } else {
        console.log("duration");
        console.log(Math.round(moment.duration(moment(this.time).utc()
                          .diff(moment(searchDate).utc())
                          ).asMinutes()));
      }
    });

    function sendNotifications(appointments) {

      // const client = new Twilio(config.twilioAccountSid, config.twilioAuthToken);
        const client = new Twilio(twilioAccountSid, twilioAuthToken);

        appointments.forEach(function(appointment) {
        const message = {
          to: `+1${appointment.appointmentNumber}`,
          from: '+16672135463',
          body: `Hi! Just a quick reminder that ${appointment.appointmentName} is coming up in ${appointment.notificationLabel}!`,
        };

        client.messages.create(message, function(err, res){
          if(err) {
            console.log("usercontroller line 83", err);
          } else {
            let phoneNumber = appointment.appointmentNumber;
            console.log(`Reminder sent to ${phoneNumber}`);
          }
        });
      });
      if(cb) {
        cb.call();
      }
    }
};

appointmentSchema.statics.updateNotifications = () => {
  console.log("I am finding an expired appointment");
  Appointment
    //find the appts that are in the past
    .updateMany( { "time" : { $lte : new Date() }, "notification" : { $gt : 0 } }, { $set : { "notification" : 0} } )
    .then(dbAppt => console.log(dbAppt))
    .catch(err => console.log(err));
} 

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
