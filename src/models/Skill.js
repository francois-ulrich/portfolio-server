import mongoose from 'mongoose';

export const Skill = mongoose.model('Skill', { 
    name: String,
    logoSvgUrl: String,
    description: String,
    categoryId: Number
});