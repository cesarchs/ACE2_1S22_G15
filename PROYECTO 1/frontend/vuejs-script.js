Vue.createApp({
    data() {
        return {
            dirtInWater: '50',
            debtOnGround: '50',
            dirtInPostFiltered: '50',
            storeWater: '2000',
            socket: ''
        }
    },

    mounted () {
        this.socket = io('http://localhost:8080');
        this.socket.on('data', (res) => {
            this.dirtInWater = res.dirtInWater;
            this.debtOnGround = res.debtOnGround;
            this.dirtInPostFiltered = res.dirtInPostFiltered;
            this.storeWater = res.storeWater;
        });
    }
}).mount('#app');