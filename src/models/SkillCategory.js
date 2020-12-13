import mongoose from 'mongoose';

export const SkillCategory = mongoose.model('SkillCategory', { 
    name: String,
    description: String,
});