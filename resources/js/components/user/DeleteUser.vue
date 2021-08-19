<template>
    <v-btn color="primary" @click="onClickDeleteButton">
        Delete
    </v-btn>
</template>

<script>
export default {
    name: 'DeleteUser',
    data () {
        return {
        }
    },
    props: ["userID"],
    methods: {
        onClickDeleteButton() {
            axios.delete('/api/userDelete' + this.userID)
                .then(() => {
                    this.$router.push('/users');
                });
            console.log(this.userID);
        },
    }
}
</script>
