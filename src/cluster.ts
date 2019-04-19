import cluster from 'cluster';
import express from 'express';
import os from 'os';
import { Worker } from './Worker';

class Cluster {
  private PORT: number;
  private pid: number;
  private app: express.Application;

  constructor() {
    this.PORT = 3000;
    this.pid = process.pid;
    this.app = new Worker().app;

    this.configCluster();
  }

  private configCluster(): void {
    if (cluster.isMaster) {
      const cpucount: number = os.cpus().length;
      console.log( `server started at http://localhost:${ this.PORT }`);
      console.log(`CPUs: ${cpucount}`);
      console.log(`Master started, Pid ${this.pid} \n`);

      for (let i = 0; i < cpucount - 1; i += 1 ) {
        cluster.fork();
      }

      cluster.on('exit', (inputWorker, code) => {
        console.log(`Worker died! Pid: ${inputWorker.process.pid}, Code: ${code}`);
        if (code === 1) {
          cluster.fork();
        }
      });
    }

    if (cluster.isWorker) {
      const server = this.app.listen( this.PORT, () => {
        console.log(`Worker started, Pid ${this.pid}`);
      });

      process.on('SIGINT', () => {
        console.log('signal is SIGINT');
        server.close(() => {
          process.exit(0);
        });
      });
      process.on('SIGTERM', () => {
        console.log('signal is SIGTERM');
        server.close(() => {
          process.exit(0);
        });
      });
      process.on('SIGUSR2', () => {
        console.log('signal is SIGUSR2');
        server.close(() => {
          process.exit(1);
        });
      });
    }
  }
}
export default new Cluster();
