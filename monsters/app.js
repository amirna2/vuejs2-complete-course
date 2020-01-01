new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth:100,
        gameIsRunning: false,
        turns:[]
    },

    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.turns = [];
        },
        attack: function() {
            var damage = this.calculateDamage(3,10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + damage
            });
            if (this.checkWin()) {
                return;
            }

            this.monsterAttacks();
        },
        specialAttack: function() {
            var damage = this.calculateDamage(10,20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster Hard for ' + damage
            });
            if (this.checkWin()) {
                return;
            }
            this.monsterAttacks();
        },
        heal: function() {
            this.playerHealth += 10;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for 10'
            });
            if(this.playerHealth >=100) {
                this.playerHealth = 100;
            }
            this.monsterAttacks();
        },
        giveUp: function() {
            this.gameIsRunning = false;
        },
        monsterAttacks: function() {
            var damage = this.calculateDamage(5,12);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player for ' + damage
            });
            this.checkWin();
        },
        calculateDamage: function(minDamage, maxDamage) {
            return Math.max(Math.floor(Math.random() * maxDamage) + 1,minDamage);
        },
        checkWin: function() {
            if (this.monsterHealth <= 0) {
                if (confirm('You Won! Play again?')) {
                    this.startGame()
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('Monster Won! Play again?')) {
                    this.startGame()
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
})