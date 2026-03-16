<template>
<div class="flex gap-8">
    <div class=" flex flex-col">
        <span class="text-2xl font-bold text-white">{{ totalAgents }}</span>
        <span class="text-sm text-gray-400">Total Operatives</span>
    </div>

    <div class=" flex flex-col">
        <span class="text-2xl font-bold text-white">{{ onlineCount }}</span>
        <span class="text-sm text-gray-400">Online Now</span>
    </div>

    <div class=" flex flex-col">
        <span class="text-2xl font-bold text-white">{{ godfatherName }}</span>
        <span class="text-sm text-gray-400">Godfather</span>
    </div>

    <div class=" flex flex-col">
        <span class="text-2xl font-bold text-white">{{ activeMissions }}</span>
        <span class="text-sm text-gray-400">Active Missions</span>
    </div>
</div>
    
</template>

<script setup>

    defineProps({
        totalAgents: Number,
        onlineCount: Number,
        godfatherName: String,
        activeMissions: Number
    })


</script>

<style scoped>

</style>