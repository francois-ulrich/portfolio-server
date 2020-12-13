import mongoose from 'mongoose';

export const Project = mongoose.model('Project', { 
    name: String,
    description: String,
    thumbnailUrl: String,
    imagesUrl: String,
    videoUrl: String,
    skillsIds: [Number],
    githubRepo: String,
    url: String,
});