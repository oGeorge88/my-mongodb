import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable inside .env');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGO_URI, opts).then(mongoose => {
      console.log("DB Connected");
      return mongoose;
    }).catch(err => {
      console.error("Database connection failed:", err);
      throw err;  // This ensures the error is not silently ignored
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connect;
