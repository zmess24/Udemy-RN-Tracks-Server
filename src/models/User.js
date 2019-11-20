const 
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

userSchema.methods.comparePassword = function(candidatePassword) {
    const user = this;
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
            if (err) return reject(err);
            if (!isMatch) return reject(false);

            resolve(true);
        })
    });
};

userSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next();
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next();

            user.password = hash;
            next();
        });
    })
});

mongoose.model('User', userSchema);