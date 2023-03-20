<script setup>
import { computed,toRaw } from 'vue'
import Branch from './Branch.vue'

const props = defineProps(['company'])
const emit = defineEmits(['close'])
const branches = computed(() => {
    const list = toRaw(props.company)

    list.sort((a, b) => {
        if (a.branch_type === 'MAIN' && b.branch_type === 'MAIN') return 0
        return a.branch_type === 'MAIN' ? -1 : 1
    })
    return list
})

</script>
<template>
    <div class="card">
        <div class="card-header hstack">
            <div class="card-title">{{ branches[0]?.name_full }}</div>
            <button type="button" class="btn-close ms-auto" aria-label="Close" @click="emit('close')" />
        </div>
        <div class="card-body">
            <Branch :branch="branch" v-for="branch of branches" />
        </div>
    </div>
</template>