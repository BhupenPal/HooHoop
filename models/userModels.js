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
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNum:{
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    district:{
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Users", UserSchema);