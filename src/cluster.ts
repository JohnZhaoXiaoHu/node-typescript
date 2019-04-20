import cluster from 'cluster';
import express from 'express';
import os from 'os';
import { Client } from 'pg';
import { PORT } from './config';
import Postgres from './db/Postgres';
import { Worker } from './Worker';

class Cluster {
  private pid: number;
  private app: express.Application;
  private pgClient: Client;

  constructor() {
    this.pid = process.pid;
    this.app = new Worker().app;
    this.pgClient = new Postgres().client;

    this.pgClient.connect((err) => {
      if (err) {
          return console.error('failed connection to Postgres', err.stack);
      }
      console.log('successful connected to Postgres');
      this.startCluster();
    });
  }

  private startCluster(): void {
    if (cluster.isMaster) {
      const cpucount: number = os.cpus().length;
      console.log( `server started at http://localhost:${ PORT }`);
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
      const server = this.app.listen( PORT, () => {
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
