import Api from './Api'

export default {
  getUsers () {
    return Api().get('user')
  },
  createUser (user) {
    return Api().post('user', user)
  },
  getUser (id) {
    return Api().get(`user/${id}`)
  },
  updateUser (id, user) {
    return Api().put(`user/${id}`, user)
  },
  deleteUser (id, user) {
    return Api().put(`user/${id}`, user)
  }
}
