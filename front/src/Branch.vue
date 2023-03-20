<script setup>
const props = defineProps(['branch'])
const dtFormatter = new Intl.DateTimeFormat('ru-RU')
const rows = {
    name: 'Название организации',
    address: 'Адрес регистрации',
    itn: 'ИНН',
    kpp: 'КПП',
    ogrn: 'Код ОГРН',
    ogrn_date: 'Дата выдачи ОГРН',
    okpo: 'Код ОКПО',
    okato: 'Код ОКАТО',
    oktmo: 'Код ОКТМО',
    okogu: 'Код ОКОГУ',
    okved: 'Код ОКВЭД',
    okved_type: 'Версия справочника ОКВЭД',
    okfs: 'Код ОКФС',
    registration_date: 'Дата регистрации',
    actuality_date: 'Дата последних изменений',
    liquidation_date: 'Дата ликвидации',
}
const statusTitles = {
    LIQUIDATING: 'Ликвидируется',
    BANKRUPT: 'Банкрот',
    REORGANIZING: 'В процессе присоединения к другому юрлицу, с последующей ликвидацией',
    LIQUIDATED: 'Ликвидирована',
}

function isRowVisible(row) {
    switch (row) {
        case 'liquidation_date':
            return props.branch.status === 'LIQUIDATED'
    }

    return props.branch[row] ? true : false
}

function rowValue(row) {
    let val = props.branch[row]

    if(['ogrn_date','actuality_date','registration_date','liquidation_date'].includes(row)) {
        val = dtFormatter.format(new Date(val))
    }

    return val
}
</script>

<template>
    <div class="company-branch">
        <span class="badge bg-info">
            {{ props.branch.type == 'LEGAL' ? 'Юрлицо' : 'ИП' }}
        </span>
        <span class="badge bg-success" v-if="props.branch.branch_type == 'BRANCH'">Филиал</span>
        <span class="badge bg-warning"
            v-if="['LIQUIDATING', 'BANKRUPT', 'REORGANIZING'].includes(props.branch.status)">
            {{ statusTitles[props.branch.status] }}
        </span>
        <span class="badge bg-danger" v-if="props.branch.status == 'LIQUIDATED'">{{ statusTitles[props.branch.status]
        }}</span>
        <ul class="list-group list-group-flush">
            <template v-for="(label, row) in rows">
                <li v-if="isRowVisible(row)" class="list-group-item list-group-flush">
                    <div class="row">
                        <div class="col fw-bold"> {{ label }}</div>
                        <div class="col">{{ rowValue(row) }}</div>
                    </div>
                </li>
            </template>
        </ul>
    </div>
</template>