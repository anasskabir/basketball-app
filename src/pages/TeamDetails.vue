<template>
    <!-- Team Header Section -->
    <div class="flex justify-start items-center gap-4 bg-white mt-5 p-5">
        <!-- Team Logo -->
        <div class="w-full max-w-[100px]">
            <img :src="team?.logo" :alt="team?.name" class="w-full h-full">
        </div>
        <!-- Team Name and City -->
        <div class="flex flex-col gap-2">
            <h1 class="font-semibold text-2xl">{{ team?.name }}</h1>
            <div class="flex gap-1 items-center">
                <FaIcon :icon="['fas', 'location-dot']" />
                <p class="text-sm">{{ team?.city }}</p>
            </div>
        </div>
    </div>

    <!-- Leagues Information Section -->
    <div class="bg-white mt-5 p-5">
        <h2 class="font-bold text-sm">Leagues</h2>
        <div class="grid grid-cols-4 gap-7 mt-2">
            <!-- Looping through each league the team is part of -->
            <div v-for="league in team?.leagues" :key="league.property">
                <!-- League Name -->
                <h1 class="font-bold border-b border-slate-300 pb-1 mb-2 capitalize">{{ league.property }}</h1>
                <!-- League Conference and Division -->
                <div class="flex justify-between items-center mt-2">
                    <div class="font-semibold">Conference</div>
                    <div class=" italic">{{ league.conference ?? 'N/A' }}</div>
                </div>
                <div class="flex justify-between items-center mt-2">
                    <div class="font-semibold">Division:</div>
                    <div class=" italic">{{ league.division ?? 'N/A' }}</div>
                </div>
            </div>
        </div>
    </div>

    <!-- Players Section -->
    <div class="mt-5 py-5 mb-20">
        <h2 class="font-bold text-2xl">Players</h2>
        <div class="grid grid-cols-4 gap-7 mt-2">
            <!-- Looping through each player in the team -->
            <div class="max-w-xs h-[450px] overflow-hidden" v-for="player in players" :key="player.id">
                <!-- Player Card -->
                <div class="bg-white h-full shadow-xl rounded-lg py-3">
                    <div class="p-2">
                        <!-- Player Name -->
                        <h3 class="text-center text-xl text-gray-900 font-bold leading-8">{{ player?.firstname + ' ' +
                            player?.lastname }}</h3>
                        <!-- Player Image -->
                        <div class="w-24 h-24 rounded-full m-auto mt-3">
                            <img :src="playerImage" alt="" class="rounded-full w-full">
                        </div>
                        <!-- Player Details Table -->
                        <table class="text-xs my-3">
                            <!-- Table Body with Player Details -->
                            <tbody>
                                <!-- Player Country, Birthday, Height, Weight, and NBA Career Details -->
                                <!-- Each row in the table displays a different detail -->
                            </tbody>
                        </table>
                        <div class="grid grid-cols-2 gap-8">
                            <div v-for="league in player?.leagues" :key="league.property">
                                <!-- Displaying each league the player is part of -->
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </div>
</template>


<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router"; // accesses the current route parameters ("id")
import http from "../request/http"; //  fetches team details and players when the component mounts
import { searchStore } from '../stores/search'
import playerImage from '../assets/images/player.jpg'

// Refs for reactive data, updated when data is fetched from API
const route = useRoute();
const team = ref(null);
const players = ref([]);
const backupPlayers = ref([]);

// Accessing the search store for search functionality.
const searchStorage = searchStore();

// Function to fetch players of a specific team.
const getTeamPlayers = async (teamId) => {
    try {
        const date = new Date();
        // HTTP request to fetch players based on the team ID and current season.
        const { data } = await http.get(`https://v2.nba.api-sports.io/players`, {
            params: {
                team: teamId,
                season: date.getFullYear()
            }
        });

        // Transforming data to a more usable format.
        let allPlayers = data.response.map(playerData => {
            let filterLeagues = Object.values(playerData.leagues)?.map((item, i) => {
                item.property = Object.keys(playerData.leagues)[i]
                return item;
            })

            playerData.leagues = filterLeagues;
            return playerData;
        });

        // Updating the players and backupPlayers reactive data.
        players.value = allPlayers
        backupPlayers.value = allPlayers

    } catch (error) {
        console.log(error);
    }
}

// Lifecycle hook: on component mount.
onMounted(async () => {
    try {
        // HTTP request to fetch team details based on the team ID from the route.
        const { data } = await http.get(`https://v2.nba.api-sports.io/teams`, {
            params: { id: route.params?.id }
        });
        let teamData = data.response[0];

        // Fetching players for the team.
        await getTeamPlayers(teamData?.id);

        // Transforming league data for the team.
        let filterLeagues = Object.values(teamData.leagues)?.map((item, i) => {
            item.property = Object.keys(teamData.leagues)[i]
            return item;
        })

        teamData.leagues = filterLeagues;
        team.value = teamData;

    } catch (error) {
        console.log(error);
    }
})

// Watcher: tracks changes in the search input.
watch(() => searchStorage.key, (value) => {
    // Filtering players based on the search input.
    if (searchStorage.field === 'player') {
        players.value = backupPlayers.value.filter(({ firstname, lastname }) => {
            if (firstname.toLowerCase().includes(value.toLowerCase())) {
                return firstname.toLowerCase().includes(value.toLowerCase());
            } else {
                return lastname.toLowerCase().includes(value.toLowerCase());
            }
        })
    }
})
</script>
