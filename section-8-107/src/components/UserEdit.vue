<template>
    <div class="component">
        <h3>You may edit the User here</h3>
        <p>Edit me!</p>
        <button @click="editAge">Edit Age</button>
        <p>User Age: {{userAge}}</p>
    </div>
</template>

<script>
import {eventBus} from '../main';
    export default {
        props: ['userAge'],
        methods: {
            editAge() {
                this.userAge = 30;
                eventBus.sendAgeUpdated(this.userAge);
            }
        }
    }
</script>

<style scoped>
    div {
        background-color: lightgreen;
    }
</style>
