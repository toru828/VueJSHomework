<template>
    <v-btn color="white" @click="onClickDeleteButton" small>
        Delete
    </v-btn>
</template>

<script>
export default {
    name: "DeleteUser",
    data() {
        return {};
    },
    props: ["userID"],
    methods: {
        onClickDeleteButton() {
            let check = window.confirm("Do you want to delete it?");
            if (check) {
                axios.delete("/api/users/" + this.userID).then(() => {
                    this.$router.go({ path: "/users", force: true });
                });
            }
        }
    }
};
</script>
