<template xmlns:el-col="http://www.w3.org/1999/html">
    <div class="Role-page" style="width: 90%">
        <el-row :gutter="8">
            <el-col :span="8">
                <el-card>
                    <div slot="header">
                        <span>角色</span>
                    </div>
                    <el-radio-group>
                        <el-radio v-for="(item,index) in roledata" border>
                        </el-radio>
                    </el-radio-group>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card>
                    <div slot="header">
                        <span>菜单</span>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card>
                    <div slot="header">
                        <span>权限</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {roleinfo} from '@src/api/Role'

    export default {
        name: "Role",
        data() {
            return {
                roledata: []
            }
        },
        created() {
            roleinfo.then(response => {
                this.roledata = response.data
            }).catch(error => {
                console.log(error)
            })
        }
    }
</script>

<style scoped>

</style>