import Server from 'socket.io';

export default function startServer(store) {
  const io = new Server().attach(8090);

  // TODO : optimize this (e.g. just sending the relevant subset, sending diffs instead of snapshots...)
  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  );

  io.on('connection', socket => {
    socket.emit('state', store.getState().toJS());
    socket.on('action', store.dispatch.bind(store));
  });
}
