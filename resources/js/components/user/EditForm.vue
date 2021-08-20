<template>
    <v-row align="center" justify="center">
        <v-col cols="12" sm="8">
            <v-card class="elevation-12" color="cream">
                <v-toolbar color="primary" dark flat>
                    <v-toolbar-title prepend-icon="lock">Edit form</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-form>
                        <ValidationProvider v-slot="{ errors }" name="Name" rules="required">
                            <v-text-field
                                    v-model="item.name"
                                    label="New Name *"
                                    required
                                    autocomplete="off"
                                    prepend-icon="mdi-account"
                                    v-on:keyup.enter="onClickEditButton"
                                    :error-messages="errors"
                                    outlined
                                    class="pt-8"
                            ></v-text-field>
                        </ValidationProvider>

                        <ValidationProvider v-slot="{ errors }" name="Email" rules="required|email">
                            <v-text-field
                                    v-model="item.email"
                                    label="New Email *"
                                    required
                                    autocomplete="off"
                                    prepend-icon="mdi-email"
                                    v-on:keyup.enter="onClickEditButton"
                                    :error-messages="errors"
                                    outlined
                                    class="pt-8"
                            ></v-text-field>
                            <span style="color: #ff5252; font-size: 12px; padding-left: 33px;">{{ errorEmail }}</span>
                        </ValidationProvider>

                        <ValidationProvider v-slot="{ errors }" name="Password" rules="required">
                            <v-text-field
                                    id="password"
                                    label="New Password *"
                                    name="password"
                                    prepend-icon="mdi-lock"
                                    type="password"
                                    v-model="item.password"
                                    :error-messages="errors"
                                    v-on:keyup.enter="onClickEditButton"
                                    outlined
                                    required
                            />
                        </ValidationProvider>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn color="primary" :disabled="isEditBtnDisabled" @click="onClickEditButton" :loading="isBtnLoading">
                        Edit
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
        name: 'EditForm',
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
            isEditBtnDisabled() {
                if (!this.item.email || !this.item.password || !this.item.name) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        methods: {
            async onClickEditButton() {
                if (this.isEditBtnDisabled === true) {
                    return false;
                }
                this.isBtnLoading = true;
                const editParam =  {
                    name: this.tem.name,
                    email: this.item.email,
                    password: this.item.password,
                };
                axios.put('/api/userEdit/' + this.userID, editParam)
                    .then(() => {
                        this.$router.push('/users');
                    });
            }
        }
    }
</script>
