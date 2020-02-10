const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/HooHoop", { 
    useNewUrlParser: !0, 
    useUnifiedTopology: !0 
});

mongoose.connection.on('connected', () => console.log('Mongoose is connected!!!!'));

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    userName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    phoneNum:{
        type: Number,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    district:{
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model("Users", UserSchema);