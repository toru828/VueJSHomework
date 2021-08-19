<template>
  <div>
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
            <h4> Users List</h4>
            <hr />
            <div>
              <div class="row header">
                <div class="col-3 card-title text-bold" cols="3">Username</div>
                <div class="col-3 card-title text-bold" cols="3">Email</div>
                <div class="col-3 card-title text-bold" cols="3">Created At</div>
                <div class="col-3 card-title  text-bold" cols="3">Modified At</div>
              </div>
              <div class="table-hover">
                <div v-if="users.length == 0">
                  There is no data.
                </div>
                <div v-else v-for="user in users" :key="user.id" class="row vertical-middle">
                  <div class="col-3" cols="3">{{ user.name }}</div>
                  <div class="col-3" cols="3">{{ user.email }}</div>
                  <div class="col-3" cols="3">{{ dateFormat(user.created_at) }}</div>
                  <div class="col-3" cols="3">{{ dateFormat(user.updated_at) }}</div>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-card>
    </v-col>
  </div>
</template>

<script>
  import dayjs from 'dayjs';
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
      }
    },

  }

</script>
<style>
  .text-bold {
    font-weight: bold;
  }
</style>
