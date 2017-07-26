/* eslint-disable babel/new-cap */
import os from 'os';
import HappyPack from 'happypack';

export default function HappyPackPlugin({ name, loaders }) {
  const compilerThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length,
  });
  return new HappyPack({
    id: name,
    verbose: false,
    threadPool: compilerThreadPool,
    loaders,
  });
}
