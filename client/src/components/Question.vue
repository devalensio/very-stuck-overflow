<template lang="html">
  <div class="container">
    <div class="row">
      <div class="jumbotron jumbotron-fluid col-md-8 offset-md-2">
        <div class="container">
          <button type="button" name="button" class="btn btn-danger" style="float: right" @click="downVote">
            Unlike
          </button>
          <button type="button" name="button" class="btn btn-outline-dark" style="float: right">{{vote}}</button>
          <button type="button" name="button" class="btn btn-success" style="float: right" @click="upVote">
            Like
          </button>
          <h1 class="display-4">{{question.title}}</h1>
          <div class="">
          </div>
          <p class="lead">{{question.content}}</p>
        </div>
        <blockquote class="blockquote mb-0">
          <footer class="blockquote-footer">Asked by: <cite title="Source Title">{{question.userId.name}}</cite></footer>
        </blockquote>
        <div class="container">
          <div class="form-group">
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model='answer' placeholder="your answer here.."></textarea>
          </div>
          <button type="button" class="btn btn-outline-success" @click="addAnswer(question._id)">Submit</button>
        </div>
      </div>
      <div class="jumbotron jumbotron-fluid col-md-6 offset-md-3">
        <h5>Answers:</h5>
        <div class="container">
          <div class="card" v-for="(data, id) in answers" v-bind:key="data._id" style="margin-bottom: 17px;">
            <div class="card-body">
              {{data.content}}
            </div>
            <blockquote class="blockquote mb-0">
              <footer class="blockquote-footer">Answered by: <cite title="Source Title">{{data.userId.name}}</cite></footer>
            </blockquote>
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
      token: localStorage.getItem('token'),
      id: this.$route.params,
      question: [],
      answer: [],
      answers: [],
      vote: ''
    }
  },
  created: function () {
    this.getQuestion()
    this.showAnswer()
    this.showVote()
  },
  methods: {
    getQuestion: function () {
      console.log(this.name)
      axios({
        method: 'get',
        url: `http://localhost:3000/api/question/${this.id.id}`
      }).then(({ data }) => {
        // console.log(data)
        this.question = data.data
      })
    },
    addAnswer: function () {
      const idquest = this.question._id
      axios({
        method: 'post',
        url: 'http://localhost:3000/api/answer',
        data: {
          userId: this.token,
          questionId: idquest,
          content: this.answer
        }
      }).then(data => {
        this.showAnswer()
      })
    },
    showAnswer: function () {
      axios({
        method: 'get',
        url: 'http://localhost:3000/api/answer',
        headers: {
          questionId: this.id.id
        }
      }).then(({ data }) => {
        console.log(data)
        this.answers = data.data
      })
    },
    upVote: function () {
      axios({
        method: 'post',
        url: 'http://localhost:3000/api/votequestion',
        headers: {
          token: this.token
        },
        data: {
          questionId: this.id.id
        }
      }).then(({ data }) => {
        console.log(data)
        this.showVote()
      })
    },
    showVote: function () {
      axios({
        method: 'get',
        url: 'http://localhost:3000/api/votequestions',
        headers: {
          questionId: this.id.id
        }
      }).then(({ data }) => {
        console.log(data)
        this.vote = data.data.vote
      })
    },
    downVote: function () {
      axios({
        method: 'get',
        url: 'http://localhost:3000/api/votequestiondown',
        headers: {
          token: this.token,
          questionId: this.id.id
        }
      }).then(({ data }) => {
        this.showVote()
      })
    }
  }
}
</script>

<style lang="css">
</style>
