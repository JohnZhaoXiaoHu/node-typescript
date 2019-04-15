import cluster from 'cluster';
import os from 'os';
import app from './worker';

const PORT = 3000;
const pid = process.pid;

if (cluster.isMaster) {
  const cpucount = os.cpus().length;
  console.log( `server started at http://localhost:${ PORT }`);
  console.log(`CPUs: ${cpucount}`);
  console.log(`Master started, Pid ${pid} \n`);

  for (let i = 0; i < cpucount - 1; i += 1 ) {
    const worker = cluster.fork();
    /*
    worker.on('message', (msg) => {
      console.log(`message from worker ${worker.process.pid} : ${JSON.stringify(msg)}`);
    });
    */
  }

  cluster.on('exit', (inputWorker, code) => {
    console.log(`Worker died! Pid: ${inputWorker.process.pid}, Code: ${code}`);
    if (code === 1) {
      cluster.fork();
    }
  });

  setTimeout(() => {
    console.log('time out!!!');
  }, 10000);
}

if (cluster.isWorker) {
  const server = app.listen( PORT, () => {
    console.log(`Worker started, Pid ${pid}`);

    // process.send({ text: 'hello from worker pid: ', pid });
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
