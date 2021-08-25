<template>
    <v-btn color="primary" @click="onClickEditButton(userID)" small>
        Edit
    </v-btn>
</template>

<script>
export default {
    name: "EditUser",
    data() {
        return {};
    },
    props: ["userID"],
    methods: {
        onClickEditButton(id) {
            this.$router.push("/edit/" + id);
        }
    }
};
</script>
