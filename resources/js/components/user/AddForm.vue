<template>
    <v-row align="center" justify="center">
        <v-col cols="12" sm="8">
            <v-card class="elevation-12" color="cream">
                <v-toolbar color="primary" dark flat>
                    <v-toolbar-title prepend-icon="lock">Add form</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-form>
                        <ValidationProvider v-slot="{ errors }" name="Name" rules="required">
                            <v-text-field
                                    v-model="item.name"
                                    label="Name *"
                                    required
                                    autocomplete="off"
                                    prepend-icon="mdi-account"
                                    v-on:keyup.enter="onClickAddButton"
                                    :error-messages="errors"
                                    outlined
                                    class="pt-8"
                            ></v-text-field>
                        </ValidationProvider>

                        <ValidationProvider v-slot="{ errors }" name="Email" rules="required|email">
                            <v-text-field
                                    v-model="item.email"
                                    label="Email *"
                                    required
                                    autocomplete="off"
                                    prepend-icon="mdi-email"
                                    v-on:keyup.enter="onClickAddButton"
                                    :error-messages="errors"
                                    outlined
                                    class="pt-8"
                            ></v-text-field>
                            <span style="color: #ff5252; font-size: 12px; padding-left: 33px;">{{ errorEmail }}</span>
                        </ValidationProvider>

                        <ValidationProvider v-slot="{ errors }" name="Password" rules="required">
                            <v-text-field
                                    id="password"
                                    label="Password *"
                                    name="password"
                                    prepend-icon="mdi-lock"
                                    type="password"
                                    v-model="item.password"
                                    :error-messages="errors"
                                    v-on:keyup.enter="onClickAddButton"
                                    outlined
                                    required
                            />
                        </ValidationProvider>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn color="primary" :disabled="isAddBtnDisabled" @click="onClickAddButton" :loading="isBtnLoading">
                        Add User
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import {
        ValidationProvider,
        ValidationObserver
    } from 'vee-validate/dist/vee-validate.full';
    export default {
        name: 'AddForm',
        components: {
            ValidationProvider,
            ValidationObserver,
        },
        data () {
            return {
                item : {
                    name: '',
                    email: '',
                    password: '',
                },
                isOk:  false,
                isBtnLoading: false,
                errorEmail: '',
            }
        },
        computed: {
            isAddBtnDisabled() {
                if (!this.item.email || !this.item.password || !this.item.name) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        methods: {
            async onClickAddButton() {
                if (this.isAddBtnDisabled === true) {
                    return false;
                }
                this.isBtnLoading = true;
                const addParam =  {
                    name: this.tem.name,
                    email: this.item.email,
                    password: this.item.password,
                };
                axios.post('/api/userAdd/' + this.userID, addParam)
                    .then(() => {
                        this.$router.push('/users');
                    });
            }
        }
    }
</script>
