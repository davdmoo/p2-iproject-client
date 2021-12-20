<template>
<div>
  <div class="container mt-5" style="min-height: 80vh;">
    <div class="row" style="justify-content: center;">
      <form @submit.prevent="addNote">
        <input class="bg-light rounded" type="text" style="min-height: 36px;" v-model="title" id="title" placeholder="Create a note">
        <button style="margin-left: 10px" class="btn btn-primary">Add</button>
      </form>
    </div><br>

    <div class="row mt-3">
      <div class="col-md-4">
        <div class="p-2 alert alert-primary">
          <h4 style="text-align: center; margin-top: 5px;">Fresh</h4>
            <draggable id="Fresh" class="list-group Fresh" :move="onMove" :list="fresh" group="notes">
              <div class="list-group-item Fresh" v-for="item in fresh" :key="item.id">{{ item.title }}</div>
            </draggable>
        </div>
      </div>

      <div class="col-md-4">
        <div class="p-2 alert alert-warning">
          <h4 style="text-align: center; margin-top: 5px;">In Progress</h4>
            <draggable id="inProgress" class="list-group inProgress" :list="inProgress" :move="onMove" group="notes">
              <div class="list-group-item inProgress" v-for="item in inProgress" :key="item.id">{{ item.title }}</div>
            </draggable>
        </div>
      </div>

      <div class="col-md-4">
        <div class="p-2 alert alert-success">
          <h4 style="text-align: center; margin-top: 5px;">Done</h4>
            <draggable id="Done" :move="onMove" class="list-group Done" :list="done" group="notes">
              <div class="list-group-item Done" v-for="item in done" :key="item.id">{{ item.title }}</div>
            </draggable>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'Home',
  data: function () {
    return {
      title: '',
      inProgress: [],
      done: [],
      fresh: []
    }
  },
  components: {
    draggable
  },
  methods: {
    addNote: function () {
      this.$store.dispatch('addNote', {
        title: this.title
      })
        .then(() => {
          this.$store.dispatch('getNotes')
          this.fresh.push(this.freshNotes)
        })
      this.title = ''
    },
    deleteNote: function (id) {
      this.$store.dispatch('deleteNote', id)
        .then(() => {
          this.$store.dispatch('getNotes')
          this.fresh = this.freshNotes
          this.done = this.doneNotes
          this.inProgress = this.inProgressNotes
        })
    },
    onMove: function (payload, payload2) {
      const noteId = payload.draggedContext.element.id
      const oldStatus = payload.draggedContext.element.status
      let newStatus
      if (!payload2.originalTarget) {
        newStatus = payload2.target.id || payload2.target.className.split(' ')[1]
      } else {
        newStatus = payload2.originalTarget.className.split(' ')[1] || payload2.originalTarget.id
      }

      if (oldStatus !== newStatus) {
        this.$store.dispatch('patchNote', {
          id: noteId,
          status: newStatus
        })
          .then(() => {
            this.$store.dispatch('getNotes')
          })
      }
    }
  },
  created: function () {
    this.$store.dispatch('getNotes')
      .then(() => {
        this.fresh = this.freshNotes
        this.done = this.doneNotes
        this.inProgress = this.inProgressNotes
      })
  },
  computed: {
    freshNotes: function () {
      return this.$store.state.fresh
    },
    inProgressNotes: function () {
      return this.$store.state.inProgress
    },
    doneNotes: function () {
      return this.$store.state.done
    }
  }
}
</script>

<style>
.list-group {
  min-height: 300px;
}
</style>
