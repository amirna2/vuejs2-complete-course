<template>
    <div class="row">
        <app-quote v-for = "quote in quotes" @click.native="deleteQuote(index)" v-bind:key="quote.id">{{ quote }}</app-quote>
    </div>    
</template>

<script>
    import Quote from './Quote.vue';

    export default {
        props: ['quotes'],
        
        components: {
            appQuote: Quote
        },
        methods:{
            deleteQuote(index) {
                this.$emit('quoteDeleted',index);
            }
        }

    }
</script>

<style scoped>

</style>