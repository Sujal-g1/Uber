const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const captainSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            trim:true,
            minlength :[3, 'first name must be atleast  3 characters long']
        },
        lastname:{
            type:String,
            trim:true,
            default:'',

        }
    },

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        minlength :[5, 'email must be atleast of 5 characters long']
    },
    
    password:{
        type:String,
        required:true,
        select:false,
        minlength:[8,'Password must be at least 8 characters'],
    },  
    scoketId:{
        type:String,
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },

    vehicle:{
       color:{
        type:String,
        required:true,
        trim:true,
        minlength :[3, 'first name must be atleast  3 characters long']
       },
      plate:{
        type:String,
        required:true,
        trim:true,
        minlength :[4, 'first name must be atleast  4 characters long']
      },
      capacity:{
        type:Number,
        required:true,
        trim:true,
        minlength :[1, 'first name must be atleast  1 characters long']
      },
      vehicleType:{
        type:String,
        required:true,
        trim:true,
        enum:['car','motorcycle','auto'],
      }
    },

    location:{
        lat:{
            type:Number,
        },
        long:{
            type:Number,
         }

    }

}, { timestamps: true })

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id:this._id} , process.env.JWT_SECRET, { expiresIn:'24h' })
    return token
}

captainSchema.methods.comparePassword = async function(password){
   return await bcrypt.compare(password, this.password ) 
}

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10)
}

const captainModel =  mongoose.model('captain', captainSchema)

module.exports = captainModel