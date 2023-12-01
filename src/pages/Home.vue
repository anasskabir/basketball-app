<template>
    <div class="px-5 py-10 mt-8">
        <h2 class="font-semibold text-2xl mb-4 bg-white px-2 py-3 rounded-md">Teams</h2>
        <div class="grid grid-cols-5 gap-3">
            <template v-for="team in teams" :key="team.id">
                <div class="bg-white p-3 relative" v-if="team.name">
                    <router-link :to="{ name: 'teamDetails', params: { id: team.id } }">
                        <div class=" absolute bg-red-500 text-white left-0 top-2 py-1 px-3 rounded-r-md flex gap-2"
                            v-if="team.city">
                            <FaIcon :icon="['fas', 'map-location']" />
                            <h2 class="text-sm font-semibold">{{ team.city }}</h2>
                        </div>
                        <div class="h-32 flex justify-center mt-10">
                            <img :src="team.logo ?? teamDefaultImage" :alt="team.name" class="h-full">
                        </div>
                        <div class="mt-3 text-center">
                            <h2 class="font-bold">{{ team.name }}</h2>
                        </div>
                    </router-link>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import http from "../request/http";
import teamDefaultImage from '../assets/images/team.jpg'
import { searchStore } from '../stores/search'

const teams = ref([]);
const backupTeams = ref([]);
const searchStorage = searchStore()

onMounted(async () => {
    try {
        const { data } = await http.get('https://v2.nba.api-sports.io/teams');
        teams.value = data.response
        backupTeams.value = data.response
    } catch (error) {
        console.log(error);
    }
})

watch(() => searchStorage.key, (value) => {
    if (searchStorage.field === 'team') {
        teams.value = backupTeams.value.filter(({ name }) => name.toLowerCase().includes(value.toLowerCase()))
    }
})

</script>