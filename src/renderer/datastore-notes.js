import Datastore from 'nedb';
import path from 'path';

// eslint-disable-next-line
import { remote } from 'electron';

const dbNotes = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/notes.db'),
});

function loadNoteDB(filename) {
  return new Datastore({
    autoload: true,
    filename: path.join(filename),
  })
}

export default dbNotes;
export {loadNoteDB};