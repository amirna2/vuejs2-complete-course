<template>
    <div class="component">
        <h3>You may view the User Details here</h3>
        <p>Many Details</p>
        <p>User Name: {{ myName }}</p>
        <p>User Name Reversed: {{ switchName() }}</p>
        <p>User Age: {{userAge }}</p>
        
        <button @click="resetName">ResetName by event</button>
        <button @click="resetFn()">ResetName by callback</button>


    </div>
</template>

<script>
    import {eventBus} from '../main';

    export default {
        props: {
            myName: {
                type : String,
                required: false,
                default: ' Your Name Here'
            },
            resetFn: Function,
            userAge: Number
        },
        methods: {
            switchName() {
                return this.myName.split("").reverse().join("")
            },
            resetName() {
                this.myName = 'Amir';
                this.$emit('nameWasReset',this.myName);
            }
        },
        created() {
            eventBus.$on('ageUpdatedEvent', (data) => {
                this.userAge = data;
            })
        }
    }
</script>

<style scoped>
    div {
        background-color: lightcoral;
    }
</style>
