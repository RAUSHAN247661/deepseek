import mongoose from 'mongoose';
import { exportTraceState } from 'next/dist/trace';

let cached = global.mongoose || {conn: null , promise : null};

export default async function dbConnect() {
    if(cached.conn) {
        return cached.conn;
    }
    if(!cached.promise) {
        cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then(mongoose => {
        return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        console.error('Failed to connect to MongoDB:', e);
    }
    return cached.conn;
}