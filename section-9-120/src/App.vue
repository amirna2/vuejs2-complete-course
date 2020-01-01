<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <button @click="selectedComponent ='appQuote'">Quote</button>
                <button @click="selectedComponent ='appAuthor'">Author</button>
                <button @click="selectedComponent ='appNew'">New</button>
                <p>Selected {{selectedComponent}}</p>
                <hr>
                <keep-alive> <!-- persiting the dynamic component after they are created -->
                    <component :is="selectedComponent">
                        <h2 slot="title">{{quoteTitle}}</h2>
                        <p>A wonderful quote!</p>
                    </component>
                </keep-alive>
                   <!-- <app-quote>
                   <h2 slot="title">{{quoteTitle}}</h2>
                   <p>A wonderful quote!</p>
               </app-quote> -->
               
            </div>
        </div>
    </div>
</template>

<script>
    import Quote from './components/Quote.vue';
    import Author from './components/Author.vue';
    import New from './components/New.vue';
    export default {
        data() {
            return {
                quoteTitle: "The Quote",
                selectedComponent: "appQuote"
            }
        },
        components: {
            appQuote: Quote,
            appAuthor: Author,
            appNew: New
        }
    }
</script>

<style>
    h2 {
        color: red;
    }
</style>
