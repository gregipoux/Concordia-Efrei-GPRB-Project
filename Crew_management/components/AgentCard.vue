<template>
    <div class=" flex flex-col bg-gray-800 rounded-xl p-4 w-48">

            <div class="relative w-12 h-12">
                <span class="w-12 h-12 rounded-full bg-purple-600 
                 flex items-center justify-center text-white font-bold">
                {{ initiales }}
                </span>

                <span v-if="agent.isOnline" 
                    class="absolute bottom-1 right-1 w-3 h-3 
                    bg-green-400 rounded-full border-2 border-gray-900">
                 </span>
            </div>


            <div class="text-center">
                <span>{{ agent.alias }}</span>
            </div>

            <div class="bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                <span>👤</span>
                <span>{{ agent.role }}</span>
            </div>

            <div>
                <span class="text-white font-bold text-lg">{{ agent.heist }}</span>
                <span class="text-gray-400 text-xs">Heist</span>

                <span class="text-white font-bold text-lg">{{ agent.missions }}</span>
                <span class="text-gray-400 text-xs">Missions</span>
            </div>

            <div class="text-gray-400 text-xs">
                <span class="text-gray-200">{{ agent.roleInHeist }}</span>
            </div>

        <div class="flex gap-2 w-full mt-1">
            <button class="flex-1 bg-transparent border border-gray-600 text-gray-300 text-sm py-1 rounded-lg hover:bg-gray-700 transition">
                View
            </button>
            <button class="flex-1 bg-transparent border border-gray-600 text-gray-300 text-sm py-1 rounded-lg hover:bg-gray-700 transition">
                Assign
            </button>
        </div>
        
    </div>


</template>

<script setup>


    import { computed } from 'vue'

    const props = defineProps({ agent: Object })

    const initiales = computed(() => {
    return props.agent.alias
        .split('_')
        .map(mot => mot[0].toUpperCase())
        .join('')
    })

</script>