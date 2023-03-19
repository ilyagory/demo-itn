<script setup>
import { ref, computed } from 'vue'
import r from './lib/fetch.js'

const itn = ref(null)
const company = ref(null)
const isLoading = ref(false)
const error = ref(null)
const isDisabled = computed(() => isLoading.value || (itn.value && itn.value.length !== 10 && itn.value.length !== 12))
const cls = computed(() => {
    const c = {
        vstack: company.value || isLoading.value,
        'gap-5': company.value || isLoading.value,
        'pt-4': company.value || isLoading.value,
        'd-flex': !company.value && !isLoading.value,
    }
    return c
})

function close() {
    company.value = null
    error.value = null
    itn.value = null
}

async function doRequest() {
    if (isLoading.value) return

    isLoading.value = true
    company.value = null
    error.value = null
    try {
        company.value = await r.get('search', { itn: itn.value })
    } catch (e) {
        error.value = e
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <div class="container h-100 align-items-center justify-items-center" :class="cls">
        <form @submit.prevent="doRequest" class="hstack gap-3 w-100">
            <label for="itn" class="form-label">ИНН:</label>
            <input id="itn" placeholder="ИНН из 12 или 10 цифр" class="form-control" v-model="itn" :disabled="isLoading">
            <button :disabled="isDisabled" class="btn btn-primary" type="submit">
                {{ isLoading ? 'Поиск…' : 'Поиск' }}
            </button>
        </form>
        <div class="text-center" v-if="isLoading">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Загрузка…</span>
            </div>
        </div>
        <div v-if="!isLoading && company" class="card">
            <div class="card-header hstack">
                <div class="card-title">Title</div>
                <button type="button" class="btn-close ms-auto" aria-label="Close" @click="close"></button>
            </div>
            <div class="card-body">
                {{ company }}
            </div>
        </div>
    </div>
</template>