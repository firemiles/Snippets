import Datastore from 'nedb';
import path from 'path';

// eslint-disable-next-line
import { remote } from 'electron';

const dbNotes = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/notes.db'),
});

export default dbNotes;
