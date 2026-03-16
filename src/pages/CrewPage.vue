<template>
    <div>
        <StatsBar
            :totalAgents="agents.length"
            :onlineCount="agents.filter(a => a.isOnline).length"
            :godfatherName="agents.find(a => a.role === 'Godfather')?.alias"
            :activeMissions="agents.reduce((sum, a) => sum + a.missions, 0)" 
        />

        <div class="grid grid-cols-4 gap-4 p-6">
            <AgentCard
                v-for="agent in agents"
                :key="agent.id"
                :agent="agent"
            />
        </div>

            <RecruitModal
                v-if="showModal"
                @close="showModal = false"
                @recruit="addAgent"
            />

            <button @click="showModal = true">+ Recruit Agent</button>
    </div>

</template>

<script>
    import AgentCard from '../components/crew/AgentCard.vue';
    import RecruitModal from '../components/crew/RecruitModal.vue';
    import StatsBar from '../components/crew/StatsBar.vue';
    import { agents } from '../data/agents.js'

    export default {
        components: {AgentCard, RecruitModal, StatsBar},
        data() {
            return {
                agents: agents,
                showModal: false
            }
        },

        methods: {
            addAgent(newAgent) {
                this.agents.push(newAgent)
                this.showModal = false
            }
        }

    }
</script>