<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">User Manager</h1>
    <b-alert :show="loading" variant="warning">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped table-hover" hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.user_id }}</td>
              <td>{{ user.user_fname }}</td>
              <td>{{ user.user_lname }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="populateUserToEdit(user)">Edit</a> - 
                <a href="#" @click.prevent="deleteUser(user.user_id)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card :title="(model.user_id ? 'Edit user ID #' + model.user_id : 'New user')">
          <form @submit.prevent="saveUser">
            <b-form-group label="First Name">
              <b-form-input type="text" v-model="model.user_fname"></b-form-input>
            </b-form-group>
            <b-form-group label="Last Name">
              <b-form-input type="text" v-model="model.user_lname"></b-form-input>
            </b-form-group>
            <div>
              <b-btn type="submit" variant="success">Save user</b-btn>
              <b-btn v-if="model.user_id ? true : false" variant="default" @click.prevent="clear()">Cancel</b-btn>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>

</template>

<script>
import userService from '../services/userService'

export default {
  data () {
    return {
      loading: false,
      users: [],
      model: {},
      displayModel: {},
      updateModel: {},
      deleteModel: {}
    }
  },
  async created () {
    this.refreshUsers()
  },
  methods: {
    async refreshUsers () {
      this.loading = true
      this.users = (await userService.getUsers()).data.allUser
      this.loading = false
    },
    async populateUserToEdit (user) {
      this.model = Object.assign({}, user)
    },
    async saveUser () {
      if (this.model.user_id) {
        this.updateModel = {
          user_fname: this.model.user_fname,
          user_lname: this.model.user_lname
        }
        await userService.updateUser(this.model.user_id, this.updateModel)
      } else {
        await userService.createUser(this.model)
      }
      this.model = {} // reset form
      await this.refreshUsers()
    },
    async deleteUser (id) {
      if (confirm('Are you sure you want to delete this user?')) {
        this.deleteModel = {
          user_isdel: 1
        }
        // if we are editing a user we deleted, remove it from the form
        await userService.deleteUser(id, this.deleteModel)
        await this.refreshUsers()
      }
    },
    async clear () {
      this.model = {}
    }
  }
}
</script>
