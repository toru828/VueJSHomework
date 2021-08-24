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
                        <h2> {{title}}</h2>
                        <hr />
                        <br /> <br />
                        <div>
                            <v-row v-if="errors.length" style="color: darkred; margin: 20px 0px; text-align: left">
                                <b>Please correct the following error(s):</b>
                                <br />
                                <div>
                                    <div v-for="(error, index) in errors" :key="index">{{ error }}</div>
                                </div>
                            </v-row>
                                <v-text-field
                                    v-model="user.name"
                                    label="Username"
                                    outlined
                                    dense
                                />

                            <v-text-field
                                v-model="user.email"
                                label="Email"
                                outlined
                                dense
                            />

                            <v-text-field
                                label="Password *"
                                type="password"
                                v-model="user.password"
                                outlined
                                dense
                            />

                            <v-btn color="primary" @click="submitForm">
                            Save
                            </v-btn>

                        </div>
                    </v-card-text>
                </v-card>
            </v-card>
        </v-col>
    </v-app>
</template>

<script>
import Swal from 'sweetalert2';
export default {
    name: 'UserCreateEdit',

    data () {
        return {
            user: {
                name: '',
                email: '',
                password: ''
            },
            title: '',
            errors: []
        }
    },
    created() {
        if(this.$route.params.id != undefined) {
            this.title = 'Update User';
             axios.get('/api/users/' + this.$route.params.id).then((res) => {
                this.user = res.data;
            });
        } else {
            this.title = 'Create User';
        }
    },
    methods: {

        logout() {
            this.$store.dispatch('logout');
            this.$router.push('/');
        },

        submitForm () {
            // Validate form
            this.errors = [];

            if (!this.user.name) {
                this.errors.push('Name required.');
            }
            if (!this.user.email) {
                this.errors.push('Emails required.');
            } else if (!this.validEmail(this.user.email)) {
                this.errors.push('Valid email required.');
            }

            if (!this.user.password && this.$route.params.id == undefined) {
                this.errors.push('Password required.');
            }

            if (!this.errors.length) {
                this.save();
                return true;
            }

            return false;
        },

        async save() {
            if(this.$route.params.id != undefined) {
                await axios.put('/api/users/' + this.user.id, this.user).then(async (res) => {
                    await Swal.fire({
                        title: 'Information',
                        text: `You have been updated the user successfully`,
                        icon: 'success',
                    });
                    await this.$router.push('/users');
                });
            } else {
                await axios.post('/api/users', this.user).then(async (res) => {
                    await Swal.fire({
                        title: 'Information',
                        text: `You have been created new user successfully`,
                        icon: 'success',
                    });
                    await this.$router.push('/users');
                });
            }
        },

        validEmail: function (email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }

    },

}

</script>
<style>
.text-bold {
    font-weight: bold;
}
</style>
