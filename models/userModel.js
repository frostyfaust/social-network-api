const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username:{
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email:{
            type:String,
            required: true,
            unique: true,
            match:[/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,`Enter a valid email address please.`]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thoughtModel'
            }
        ],
        friends:[
            {
                type: Schema.Types.ObjectId,
                ref:'userModel'
            }
        ]
    },
    {
        toJSON: {
            virtuals:true,
        },
        id: false,
    }
);

userSchema
.virtual('friendCount').get(function(){
    return this.friends.length;
});

const User= model('userModel',userSchema);

module.exports = User;