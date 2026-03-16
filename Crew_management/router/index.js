import CrewManagement from "../views/CrewManagement.vue";

const routes = [

    {
        path: '/crew',
        name: 'crew',
        component: () => import('@/views/CrewManagement.vue')
    }
]