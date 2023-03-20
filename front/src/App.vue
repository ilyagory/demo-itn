<script setup>
import { ref, computed } from 'vue'
import r from './lib/fetch.js'
import Company from './Company.vue'

const itn = ref(null)
const company = ref(null)
const isLoading = ref(false)
const error = ref(null)
const isDisabled = computed(() => isLoading.value || (itn.value && itn.value.length !== 10 && itn.value.length !== 12))
const cls = computed(() => {
    const c = {
        vstack: company.value || isLoading.value || error.value,
        'gap-5': company.value || isLoading.value || error.value,
        'pt-4': company.value || isLoading.value || error.value,
        'd-flex': !company.value && !isLoading.value && !error.value,
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
        <div v-if="!isLoading && error" class="alert alert-danger w-100 alert-dismissible">
            {{ error }}
            <button type="button" class="btn-close ms-auto" aria-label="Close" @click="close" />
        </div>
        <template v-if="!isLoading && !error && company">
            <Company :company="company" @close="close" />
        </template>
    </div>
</template>