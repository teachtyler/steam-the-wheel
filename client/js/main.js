var socket = io.connect();

var vm = new Vue({
    el: "#steam",
    data: {
        SteamGame: '',
        steamProfile: '',
        steamID: '',
        steamgames: [],
        success: 'Successfully got steam games',
        fail: "No games found",
        LoadingLabel: false,
        profilePre: false,
        profileIDPre: false,
        profilePreInput: false
    },
    methods: {
        profilePreIDFn: function() {
            this.profilePreInput = true
            this.profilePre = false;
            this.profileIDPre = !this.profileIDPre;
            this.steamProfile = "id";
            this.steamID = 'bzrk501';
        },
        profilePreInputFn: function() {
            this.profilePreInput = !this.profilePreInput;
        },
        profilePreProfileFn: function() {
            this.profilePreInput = true
            this.profilePre = !this.profilePre;
            this.profileIDPre = false
            this.steamProfile = "profiles";
            this.steamID = '76561197985405022';
        },
        LoadingLabelFn: function() {
            console.log('clicked!');
            this.LoadingLabel = !this.LoadingLabel;
        },
        getSteamGames: function(profile, id) {
            console.log(profile, id)
            socket.emit('steamID', this.steamProfile, this.steamID)
            setTimeout(function() {
                this.LoadingLabel = true;
            }, 3500)
        },
        randomGame: function() {
                var spin = this.steamgames[0].gameslist.games.game.map(s => (s.name))
                this.SteamGame = spin[Math.floor(Math.random() * spin.length)].toString()
                console.log(this.SteamGame);
            }
            /*end Methods*/
    }
});
socket.on('steamGames', function(json) {
    vm.steamgames = [];
    var steamLib = json.fulfillmentValue
    setTimeout(()=>{
        (steamLib.gameslist)? vm.LoadingLabel = true : vm.LoadingLabel = false
    }, 600)
    vm.steamgames.push(steamLib);
})
