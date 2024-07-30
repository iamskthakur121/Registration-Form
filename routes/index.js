const { mongodbManager,Router }=require('mimi.js');
const routes = Router();
const mongodb = new mongodbManager();
const User = mongodb.createCollection('user', {
    
        // "fname": String ,
        // "lname": String,
        // "mobile": Number,
        // "email": String,
        // "address": {
        //   "street": String,
        //   "city": String,
        //   "country": String,
        //   "state": String
        // },
        // "id": String,
        firstName: {
          type: String,
          required: [true, "First name is required"],
          validate: {
            validator: isAlphaWithSpaces,
            message: "First name can only contain alphabetic characters",
          },
        },
        lastName: {
          type: String,
          required: [true, "Last name is required"],
          validate: {
            validator: isAlphaWithSpaces,
            message: "Last name can only contain alphabetic characters and spaces",
          },
        },
        mobileNo: {
          type: String,
          required: [true, "Mobile number is required"],
          validate: {
            validator: isValidMobileNo,
            message:
              "Mobile number must be 10 digits, not start with 0, and not be all zeros",
          },
        },
        emailId: {
          type: String,
          required: [true, "Email is required"],
          match: [/\S+@\S+\.\S+/, "Email format is invalid"],
        },
        address: {
          street: {
            type: String,
            required: [true, "Street is required"],
            validate: {
              validator: isValidStreet,
              message:
                "Street must contain at least one alphabetic character or special character and can include numbers, spaces, commas, periods, and hyphens",
            },
          },
          city: {
            type: String,
            required: [true, "City is required"],
            validate: {
              validator: isAlphaWithSpaces,
              message: "City can only contain alphabetic characters and spaces",
            },
          },
          state: {
            type: String,
            required: [true, "State is required"],
            validate: {
              validator: isAlphaWithSpaces,
              message: "State can only contain alphabetic characters and spaces",
            },
          },
          country: {
            type: String,
            required: [true, "Country is required"],
            validate: {
              validator: isAlphaWithSpaces,
              message: "Country can only contain alphabetic characters and spaces",
            },
          },
        },
        loginId: {
          type: String,
          required: [true, "Login ID is required"],
          match: [
            /^[a-zA-Z0-9]{8}$/ && /[a-zA-Z]/,
            "Login ID must be exactly 8 alphanumeric characters",
          ],
        },
        "password": String
      
  });

  routes.get('/hello', (req, res) => {
    res.send('Hello, mimi🐹!');
  });

  routes.post('/create', (req, res) => {
    User.create(req.body).then((result) => {
      console.log(result);
        res.json(result);
        
    }).catch((err) => {
        res.json(err);
        
    });
  });
  routes.get('/read/:id', (req, res) => {
    User.findOne({id:req.params.id}).then((result) => {
        res.json(result);
        
    }).catch((err) => {
        res.json(err);
        
    });
  });
  routes.get('/getall', (req, res) => {
    User.find().then((result) => {
        res.json(result);
        
    }).catch((err) => {
        res.json(err);
        
    });
  });

  
  module.exports=routes
  