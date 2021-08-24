<template>
  <v-app style="width: 100%">
      <v-app-bar app clipped-left style="background-color: #39b704;">
          <v-col cols="2" class="ml-0 pl-0">
          </v-col>
          <v-col cols="10">
              <v-tabs background-color="#39b704" right dark>
                  <v-tab @click="logout"> <v-icon>mdi-logout</v-icon> Logout </v-tab>
              </v-tabs>
          </v-col>
      </v-app-bar>
      <v-col cols="12" style="padding-top: 0">
          <v-card cols="12" color="cream">
              <v-card color="cream" flat>
                  <v-card-text>
                      <h2> Users List</h2>
                      <hr /><br />

                      <div>
                          <v-btn
                              depressed
                              small
                              color="primary"
                              @click="goToCreatePage"
                          >
                              Add User
                          </v-btn>
                      </div>

                      <br /><br />
                      <div>
                          <v-row class="row header">
                              <v-col class="card-title text-bold" cols="2">Username</v-col>
                              <v-col class="card-title text-bold" cols="3">Email</v-col>
                              <v-col class="card-title text-bold" cols="2">Created At</v-col>
                              <v-col class="card-title  text-bold" cols="2">Modified At</v-col>
                              <v-col class="card-title  text-bold" cols="3">Action</v-col>
                          </v-row>
                          <div class="table-hover">
                              <div v-if="users.length == 0">
                                  There is no data.
                              </div>
                              <v-row v-else v-for="user in users" :key="user.id" class="row vertical-middle">
                                  <v-col  cols="2">{{ user.name }}</v-col>
                                  <v-col cols="3">{{ user.email }}</v-col>
                                  <v-col cols="2">{{ dateFormat(user.created_at) }}</v-col>
                                  <v-col  cols="2">{{ dateFormat(user.updated_at) }}</v-col>
                                  <v-col cols="3">
                                      <v-btn
                                          depressed
                                          small
                                          color="primary"
                                          @click="goToEditPage(user.id)"
                                      >
                                          <v-icon left>mdi-pencil</v-icon>
                                          Edit
                                      </v-btn>
                                      <v-btn
                                          depressed
                                          small
                                          color="error"
                                          @click="destroy(user)"
                                      >
                                          <v-icon left>mdi-delete</v-icon>
                                          Delete
                                      </v-btn>
                                  </v-col>
                              </v-row>
                          </div>
                      </div>
                  </v-card-text>
              </v-card>
          </v-card>
      </v-col>
  </v-app>
</template>

<script>
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
export default {
  name: 'UsersList',

  data () {
    return {
      users: [],
    }
  },
    created() {
        this.getUsersList();
    },
  methods: {
    async getUsersList () {
        await axios.get('/api/users').then((res) => {
            this.users = res.data;

        });
    },
      logout() {
          this.$store.dispatch('logout');
          this.$router.push('/');
      },
      dateFormat(date) {
          return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
      },
      async destroy(user) {
          const res = await Swal.fire({
              title: 'Confirmation',
              text: `Are you sure want to delete this user: ${user.id}: ${user.name}？`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Delete',
              cancelButtonText: 'Cancel',
          });

          if (!res.isConfirmed) return;

          const deleted = await axios.delete('/api/users/' + user.id);
          if (deleted) {
              await Swal.fire({
                  title: 'Information',
                  text: `You have been delete the user successfully`,
                  icon: 'success',
              });

              await this.getUsersList();
          } else {
              await Swal.fire('Error', 'Have an error.  Please try again later', 'error');
          }

      },

      goToEditPage(id) {
          this.$router.push('/users/edit/' + id);
      },

      goToCreatePage() {
          this.$router.push('/users/create/');
      }
  },

}

</script>
<style>
  .text-bold {
    font-weight: bold;
  }
</style>

