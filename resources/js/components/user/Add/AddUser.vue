<template>
    <v-btn color="primary" @click="onClickAddButton()">
        Add User
    </v-btn>
</template>

<script>
export default {
    name: "AddUser",
    data() {
        return {};
    },
    methods: {
        onClickAddButton() {
            this.$router.push("/add");
        }
    }
};
</script>
