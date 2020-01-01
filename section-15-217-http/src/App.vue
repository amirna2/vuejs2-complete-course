<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Http</h1>
                <div class="form-group">
                    <label>Username</label>
                    <input class="form-control" type="text" v-model="user.username">
                </div>
                <div class="form-group">
                    <label>E-mail</label>
                    <input class="form-control" type="text" v-model="user.email">
                </div>
                <button class="btn btn-primary" @click="submit">Submit Data</button>
                <hr>

                <input class="form-control" type="text" v-model="node">
                <br><br>
                <button class="btn btn-primary" @click="getData">Get Data</button>
                <br><br>
                <ul class="list-group">
                    <li class="list-group-item" v-for="u in users" v-bind:key="u">{{u.username}} - {{u.email}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user: {
                    username: '',
                    email: ''
                },
                users: [],
                resource: {},
                node: 'data'
            };
        },
        methods: {
            submit() {
                /*
                this.$http.post('data.json', this.user)
                    .then(response => {
                        console.log(response);
                        
                    },error => {
                        console.log(error);
                        
                    });
                */
               // this.resource.save({}, this.user);
               this.resource.saveData(this.user);
            },
            getData() {
                /*
                    this.$http.get('data.json')
                    .then( response => {
                        return response.json();                
                    })
                    .then(data => {
                        const result = [];
                        for (let k in data) {
                            result.push(data[k]);
                        }
                        this.users = result;
                    });
                */
               this.resource.getDataFrom({node: this.node})
                .then( response => {
                        return response.json();                
                    })
                    .then(data => {
                        const result = [];
                        for (let k in data) {
                            result.push(data[k]);
                        }
                        this.users = result;
                    });
            }
        },
        created() {
            const customActions = {
                saveData: {method: 'POST', url: 'alternative.json'},
                getDataFrom: {method: 'GET' }
            }
            this.resource = this.$resource('{node}.json',{}, customActions);
        }
    }
</script>

<style>
</style>
