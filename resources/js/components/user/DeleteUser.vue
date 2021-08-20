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
            console.log("Try to delete user");
            axios.delete('/api/userDelete/' + this.userID)
                // .then(() => {
                //     this.$emit('delete');
                //     console.log(this.userID);
                // });
        },
    }
}
</script>
