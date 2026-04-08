import express from 'express';
import path from 'path';

interface Options {
  port: number;
  publicPath: string;
}

export class Server {
  private readonly port : number;
  private readonly publicPath : string;
  private app = express();
  
  constructor(options: Options) {
    const { port, publicPath = 'public' } = options;
    this.port = port;
    this.publicPath = publicPath;
  }

  async start() {

    //Middleware
   
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