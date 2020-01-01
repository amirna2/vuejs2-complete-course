<template>
    <div>
        <button class="btn btn-primary" @click="increment(100)">Increment (by mutation)</button>
        <button class="btn btn-primary" @click="decrement">Decrement (by mutation)</button>
        <button class="btn btn-primary" @click="asyncIncrement({by:10, duration:500})">Async Increment (by action)</button>
        <button class="btn btn-primary" @click="asyncDecrement">Async Decrement (by action)</button>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'
    import {mapActions} from 'vuex'

    export default {
        methods: {
            ...mapMutations([
                'increment',
                'decrement'
            ]),
            ...mapActions([
                'asyncIncrement',
                'asyncDecrement'
            ]),
        }
    }
</script>