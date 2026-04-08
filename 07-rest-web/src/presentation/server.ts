import express, { Router } from 'express';
import path from 'path';

interface Options {
  port: number;
  publicPath: string;
  routes: Router;
}

export class Server {
  private readonly port : number;
  private readonly publicPath : string;
  private app = express();
  private routes: Router;
  
  constructor(options: Options) {
    const { port, routes, publicPath = 'public' } = options;
    this.port = port;
    this.publicPath = publicPath;
    this.routes = routes;
  }

  async start() {

    //Middleware
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    //Routes
    this.app.use(this.routes);
   
    //Public
    this.app.use(express.static(this.publicPath));

    this.app.get('/*path', (req, res) => {
      const indexPath = path.join(__dirname, `../../../07-rest-web/${this.publicPath}/index.html`);
      res.sendFile(indexPath);
    });


    this.app.listen(3000, () =>{
      console.log(`Server is running on port ${3000}`);
    });
  }
}