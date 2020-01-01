<template>
    <div>
        <h3>New Quote</h3>
        <button @click="counter++">Count {{counter}}</button>
    </div>    
</template>

<script>
export default {
    data() {
        return {
            counter: 0
        }
    },
    destroyed() {
        console.log("New component destroyed!");
    },
    deactivated() {
        console.log("deactivated New");
    },
    activated() {
        console.log("activated New");
    }
}
</script>

<style>
</style>