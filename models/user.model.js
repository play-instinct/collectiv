const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = mongoose.Schema({
	name: { type: String },
	icon_url: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	website: { type: String },
	password: { type: String, required: true },
	role: {
		type: String,
		enum: ['artist', 'curator', 'user'],
		default: 'user',
	},
	collectives: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Collectiv' }]
	works: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Work' }]
}, {
	timestamps: true,
});

//password generation/saving

UserSchema.pre('save', function userPreSave(next) {
    const user = this;
    if (this.isModified('password') || this.isNew) {
        return bcrypt.hash(user.password, 10)
            .then((hash) => {
                user.password = hash;
                return next();
            })
            .catch(err => next(err));
    }
    return next();
});

UserSchema.plugin(uniqueValidator);

UserSchema.methods.comparePassword = function userComparePassword(password) {
    return bcrypt.compare(password, this.password);
};
userSchema.statics.hashPassword = function(password) {
    return bcrypt.hash(password, 10);
};

module.exports = mongoose.model('User', UserSchema);
module.exports = {User};

