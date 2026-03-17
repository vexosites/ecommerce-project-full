import { v2 as cloudinary } from 'cloudinary';
    // Configuration
const Cloudinary = cloudinary.config({ 
       long_url_signature: process.env.cloudinary_url
    });

export default cloudinary;