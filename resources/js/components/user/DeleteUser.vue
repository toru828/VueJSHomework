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
    methods: {
            onClickDeleteButton() {
                axios.delete('/api/userDelete', {id: 1})
                    .then(() => {
                        this.$router.push('/users');
                    });
                console.log("aaa");
        },
    }
}
</script>
