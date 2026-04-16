import mongoose from 'mongoose';

interface ConnectionOptions {
  mongoUrl:string;
  dbName:string;
}

export class MongoDatabase {

  static async connection(options:ConnectionOptions) {
    const {mongoUrl,dbName} = options;
    try {
      await mongoose.connect(mongoUrl, {
        dbName
      });
      console.log('Connected to MongoDB:', dbName);
      return true;
    } catch (error) {
      console.log(' Error connecting to MongoDB:', error);
      throw error;
    }
  }

  static async disconnect() {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
  
}
