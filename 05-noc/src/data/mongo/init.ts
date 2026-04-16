import mongoose from 'mongoose';


interface ConectionOptions {
  mongoUrl: string,
  dbName: string,
}


export class MongoDatabase {
  constructor() {}

  static async connect(options: ConectionOptions) {
    const { mongoUrl, dbName } = options;
    try {
      await mongoose.connect(mongoUrl, {
      dbName,
    });
    console.log('MongoDB connected');
    } catch (error) {
      console.log(error);
      throw error;
    }
   
  }
}
 