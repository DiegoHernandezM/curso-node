import { Server } from './presentation/server';
import { envs } from './config/plugins/envs.plugin';
import { LogModel } from './data/mongo/models/log.model';
import { MongoDatabase } from './data/mongo';

(() => {
  main();
})();

async function main() {
  
  Server.start();
  //console.log('process.env', envs.PORT, envs.MAILER_EMAIL, envs.MAILER_PASSWORD, envs.MAILER_SECRET_KEY);

  // Crear un registro
  /**
   * 
  const newLog = await LogModel.create({
    level: 'LOW',
    message: 'Este es un mensaje de log en Mongo',
    origin: 'App.ts',
  });
   await newLog.save();
   console.log(newLog);
   */

  //const logs = await LogModel.find();
  //console.log(logs);
 

 
}