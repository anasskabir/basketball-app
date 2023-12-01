<template>
    <div class="container mx-auto">
        <header class="bg-gray-800 py-10">
            <div class="flex justify-center items-center flex-col">
                <h1 class="text-4xl font-bold text-white">Sports News Aggregator</h1>
                <div class="max-w-[400px] w-full mt-7">
                    <input type="text" :placeholder="route.params.id ? 'Search Player' : 'Search Team...'"
                        class="w-full px-5 py-2 rounded-md outline-none" @keyup="handleSearch">
                </div>
            </div>
        </header>
        <router-view />
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { searchStore } from '../../stores/search'

const searchStorage = searchStore()
const route = useRoute()

const handleSearch = (event) => {

    if (route.params.id) {
        searchStorage.setSearchValue(event.target.value, 'player')
    } else {
        searchStorage.setSearchValue(event.target.value, 'team')
    }
}


</script>