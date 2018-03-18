<template src="./NoteCard.html">
</template>

<script>
import BTooltip from '../../../../../node_modules/buefy/src/components/tooltip/Tooltip.vue';
import Editor from '../../editor/Editor.vue'
import UpdateNoteModal from '../../modals/update-note-modal/UpdateNoteModal.vue'

export default {
  name: 'cn-note-card',
  components: {
    BTooltip,
    Editor,
    "cn-update-note-modal": UpdateNoteModal,
  },
  props: {
    note: Object,
  },
  mounted() {},
  data() {
    return {
      updateNoteModalActive: false,
    };
  },
  computed: {
    displayNoteName() {
      return this.note.name.split('-')[0];
    },
  },
  methods: {
    updateNote() {
      this.$store.dispatch('updateNote', this.note);
    },
    deleteNote() {
      this.$dialog.confirm({
        title: 'Delete note',
        message: `Are you sure you want to delete this ${
          'note'
        } ?`,
        confirmText: 'Delete',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.$store.dispatch('deleteNote', this.note);
        },
      });
    },
    onCopyClipboardSuccess() {
      this.$toast.open({
        message: 'Copied',
        position: 'is-bottom',
      });
    },
    open(link) {
      this.$electron.shell.openExternal(link);
    },
  },
};
</script>

<style src="./NoteCard.scss" lang="scss" scoped>

</style>
