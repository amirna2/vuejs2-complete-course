const state = {
    counter: 0
}

const getters = {
    doubleCounter: state => {
        return state.counter * 2;
    },
    stringCounter: state => {
        return state.counter + ' Clicks';
    }
};

const mutations = {
    increment: (state, payload) => {
        state.counter += payload;
    },
    decrement: state => {
        state.counter--;
    }
};

const actions = {
    increment:  ({commit}, payload) => {
        // async ops can be done before the commit action
        commit('increment', payload);
    },
    decrement: ({commit}) => {
        // async ops can be done before the commit action
        commit('decrement');
    },
    asyncIncrement: ({commit}, payload) => {
        // async ops can be done before the commit action
        setTimeout(() => {
            commit('increment', payload.by);
        },payload.duration);
        
    },
    asyncDecrement: ({commit}) => {
        // async ops can be done before the commit action
        setTimeout(() => {
            commit('decrement');
        },1000);
        
    }
};

export default  {
    state,
    mutations,
    actions,
    getters
};