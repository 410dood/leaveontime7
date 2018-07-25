# Leave!

Leave! is an app that allows the user to signup and input their home address. The user should then create destinations and times they wish to reach those destinations. A text message will then be sent to the user 15 minutes prior to the time they should leave to reach their destination at the arrival time they specified. 
Leave! uses Google Maps and Google Distance Matrix APIs to ensure that the information is relevant and up-to-date. Twilio is used to send the text message to the phone number provided during sign up.

## Tech Requirements

* React
* CSS & Reactstrap
* Javascript
* Resources- users and locations
* Auth
* Third party APIs: Twilio, Google maps, Google distance matrix

## Wireframes

![Sign Up Page](public/assets/ScreenShot2018-05-29at2.30.01PM.png)
![Sign In Page](public//assetsScreenShot2018-05-29at2.29.41PM.png)
![Profile Page](public/assets/ScreenShot2018-05-29at2.29.20PM.png)
![Dashboard Page](public/assets/ScreenShot2018-05-29at2.28.04PM.png)


## To Download and Run Locally
Fork a copy of this repo, make sure to run npm install to install all dependencies then fork and clone the backend: [here](https://github.com/410dood/django-rest). Make sure to create a local database:
```
$ psql
> CREATE DATABASE leave;
> CREATE USER leaveuser WITH PASSWORD 'leave';
GRANT ALL PRIVILEGES ON DATABASE leave TO leaveuser;
> \q
```

