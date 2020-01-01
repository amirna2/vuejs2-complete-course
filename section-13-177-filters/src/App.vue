<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Filters & Mixins</h1>
                <p>{{ text | toUpperCase | toLowerCase }}</p>
                <hr>
                <button @click="fruits.push('Berries')">Add New Fruit</button>
                <input v-model="filterText">
                <ul>
                    <li v-for="fruit in filteredFruits" v-bind:key="fruit.id">{{ fruit }}</li>
                </ul>
                <hr>
                <app-list></app-list>
            </div>
        </div>
    </div>
</template>

<script>
    
    import List from './List.vue';
    import {fruitMixin} from './fruitMixin'

    export default {    
        data() {
            return {
                text: 'Hello filters!',
            }
        },
        
        mixins: [fruitMixin],

        filters: {
            toUpperCase(value) {
                return value.toUpperCase();
            }
        },
        components: {
            appList: List
        }

    }
</script>

<style>

</style>
