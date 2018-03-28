<template lang="html">
  <div class="container">
    <div class="row">
      <div class="jumbotron col-md-3" style="background-color: #ffffff">
        <h5>Hi, {{name}}</h5>
        <p>Ask anything you want :)</p>
        <hr class="my-4">
        <button type="button" class="btn btn-outline-danger btn-lg" data-toggle="modal" data-target="#exampleModalCenter">Add Question</button>
      </div>
      <div class="col-md-7">
        <div class="card" v-for="(data, id) in questions.slice().reverse()" v-bind:key="data._id">
          <div class="card-header">
            <router-link :to="{name: 'Detail', params: {id: data._id}}">
              {{data.title}}
            </router-link>
          </div>
          <div class="card-body">
            <p>{{data.content}}</p>
            <blockquote class="blockquote mb-0">
              <footer class="blockquote-footer">Asked by: <cite title="Source Title">{{data.userId.name}}</cite></footer>
            </blockquote>
          </div>
          <div class="card-footer text-muted">
            <router-link :to="{name: 'Detail', params: {id: data._id}}">
              <button type="button" class="btn btn-outline-success">Give Answer</button>
            </router-link>
          </div>
        </div>
      </div>
      <div>
      </div>
    </div>

    <!-- modal -->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">New Question</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Title:</label>
                <input type="text" class="form-control" id="recipient-name" v-model='title'>
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">Description:</label>
                <textarea class="form-control" id="message-text" v-model='content'></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="addQuestion" data-dismiss="modal">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      name: localStorage.getItem('name'),
      token: localStorage.getItem('token'),
      title: '',
      content: '',
      questions: []
    }
  },
  created: function () {
    this.showQuestion()
  },
  methods: {
    addQuestion: function () {
      console.log(this.token)
      axios({
        method: 'post',
        url: 'http://localhost:3000/api/question',
        headers: {
          token: this.token
        },
        data: {
          title: this.title,
          content: this.content
        }
      }).then(({ data }) => {
        console.log(data)
        this.showQuestion()
      })
    },
    showQuestion: function () {
      axios({
        method: 'get',
        url: 'http://localhost:3000/api/question'
      }).then(({ data }) => {
        console.log(data)
        this.questions = data.data
        console.log(this.questions)
      })
    }
  }
}
</script>

<style lang="css" scoped>
.card {
  margin-bottom: 17px;
}
</style>
