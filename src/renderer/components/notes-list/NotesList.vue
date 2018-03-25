<template src="./NotesList.html">
</template>

<script>
import Vuex from 'vuex';
import os from 'os'
import fs from 'fs'
import {remote} from 'electron'
import db, {loadNoteDB} from '../../datastore-notes'

import NoteCard from './note-card/NoteCard';
import CreateNoteModal from '../modals/create-note-modal/CreateNoteModal'


export default {
  name: 'cn-notes-list',
  components: {
    'cn-note-card': NoteCard,
    'cn-create-note-modal': CreateNoteModal,
  },
  data() {
    return {
      searchField: '',
      createNoteModalActive: false,
      settingsModalActive: false,
      helpTokenModalActive: false,
    };
  },
  mounted() {},
  methods: {
    downloadNotes() {
      const options = {
        defaultPath: os.homedir(),
      }
      remote.dialog.showSaveDialog(options, (filename)=>{
        if(filename===undefined){
          return
        }
        fs.writeFileSync(filename, fs.readFileSync(db.filename))
      })
    },
    uploadNotes() {
      const options = {
        defaultPath: os.homedir(),
      }
      remote.dialog.showOpenDialog(options, (filenames)=>{
        if(filenames===undefined) {
          return
        }
        for(let i=0; i<filenames.length; i+=1){
          const file = filenames[i]
          const notesdb = loadNoteDB(file)
          notesdb.find({}, (err, notes)=>{
            if (!err) {
              this.$store.dispatch("addNotes", notes)
            }
          })
        }
      })
    },
  },
  computed: {
    ...Vuex.mapGetters([
      'notes',
      'noteById',
      'languageSelected',
      'isLoading',
      'settings',
    ]),
    notesFiltered() {
      const notesFiltered = this.notes.filter(item =>
        this.searchField
          .split(' ')
          .every(
            el =>
              item.name.toLowerCase().indexOf(el.toLowerCase()) > -1 ||
              item.description.toLowerCase().indexOf(el.toLowerCase()) > -1 ||
              Object.keys(item.files).some(
                key =>
                  key.toLowerCase().indexOf(el.toLowerCase()) > -1 ||
                  item.files[key].language
                    .toLowerCase()
                    .indexOf(el.toLowerCase()) > -1
              )
          )
      );

      if (this.languageSelected !== 'all') {
        const notesFilteredByLanguage = [];

        notesFiltered.forEach(note => {
          if (
            Object.keys(note.files).some(
              key => note.files[key].language === this.languageSelected
            )
          ) {
            notesFilteredByLanguage.push(note);
          }
        });

        return notesFilteredByLanguage;
      }

      return notesFiltered;
    },
  },
  beforeRouteEnter(route, redirect, next) {
    next(vm => {
      vm.$store.dispatch('loadNotes');
      // vm.$store.dispatch('loadSettings');
    });
  },
};
</script>

<style src="./NotesList.scss" lang="scss">

</style>
