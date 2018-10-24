<template>
    <div>
        <el-dialog title="用户设置" :visible.sync="ifShowSetting" :before-close="close">
            <el-input placeholder="姓名"></el-input>
            <el-input placeholder="输入新的密码" type="password"></el-input>
            <el-input placeholder="重复输入"></el-input>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Setting",
        props: {
            ifShowSetting: false,
            UserInfo: {
                name: ''
            }
        },
        methods: {
            close() {
                this.$emit("closeSetting");
            }
        }
    }
</script>

<style scoped>

</style>