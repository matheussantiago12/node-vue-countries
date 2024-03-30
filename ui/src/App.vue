<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { CountryService } from '@/services/country-service'

onMounted(() => {
  CountryService.getAll().then((data) => countries.value = data)
})

const countries = ref()
const searchTextCountry = ref()
const searchTextRegion = ref()
const offset = ref(0)

async function search (page: number) {
  const countriesData = await CountryService.getAll({
    country: searchTextCountry.value,
    region: searchTextRegion.value,
    page
  })

  if (page === 1)
    offset.value = 0

  countries.value = countriesData
}

function onPaginate (data: { page: number }) {
    search(data.page + 1)
}
</script>

<template>
<p style="font-size: 20px;">Listagem de países</p>
<DataTable :value="countries" tableStyle="min-width: 50rem">
    <template #header>
        <div style="display: flex; gap: 10px;">
            <IconField iconPosition="left">
                <InputIcon>
                    <i class="pi pi-search" />
                </InputIcon>
                <InputText placeholder="Buscar por nome" v-model="searchTextCountry" @input="() => search(1)" />
            </IconField>
            <IconField iconPosition="left">
                <InputIcon>
                    <i class="pi pi-search" />
                </InputIcon>
                <InputText placeholder="Buscar por região" v-model="searchTextRegion" @input="() => search(1)" />
            </IconField>
        </div>
    </template>
    <Column field="country" header="País" style="width: 50%"></Column>
    <Column field="region" header="Região" style="width: 50%"></Column>
</DataTable>
<Paginator 
    :rows="10" 
    :totalRecords="100" 
    @page="onPaginate"
    :alwaysShow="true" 
    v-model:first="offset"
/>
</template>
