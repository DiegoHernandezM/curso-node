import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';
import { MongoDatabase } from './data/index';
import { Server } from './presentation/server';


(async()=> {
  main();
})();

async function main() {

  await MongoDatabase.connection({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  server.start();
}