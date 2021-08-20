<template>
    <v-btn color="primary" @click="onClickEditButton">
        Edit
    </v-btn>
</template>

<script>
export default {
    name: 'EditUser',
    data () {
        return {
        }
    },
    methods: {
        onClickEditButton() {
            console.log("Try to edit user");
            this.$router.push('/edit');
                // .then(() => {
                //     this.$emit('delete');
                //     console.log(this.userID);
                // });
        },
    }
}
</script>