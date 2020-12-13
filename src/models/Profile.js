import mongoose from 'mongoose';

export const Profile = mongoose.model('Profile', { 
    firstName: String,
    middleName: String,
    lastName: String,
    description: String,
    dateBirth: Date,
    email: String,
    phone: String,
    hobbies: [String],
    cvUrl: String,
    socialMediaUrls: [String],
});