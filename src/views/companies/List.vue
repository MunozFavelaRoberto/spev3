<template>
  <v-card elevation="24" :disabled="isLoading">
    <v-card-title>
      <v-row dense>
        <v-col cols="10">
          <CardTitle :text="route.meta.title" :icon="route.meta.icon" />
        </v-col>
        <v-col cols="2" class="text-right">
            <v-btn
              icon
              variant="flat"
              size="x-small"
              color="success"
              :to="{ name: `${routeName}/store` }"
            >
              <v-icon>mdi-plus</v-icon>
              <v-tooltip activator="parent" location="bottom">Agregar</v-tooltip>
            </v-btn>
        </v-col>
      </v-row>
    </v-card-title>

    <v-card-text>
      <v-row dense>
        <v-col cols="12" md="9" class="pb-0">
          <v-row dense>
            <v-col v-if="store.getAuth?.user?.role_id === 1" cols="12" md="3" class="pb-0">
              <v-select
                v-model="active"
                label="Mostrar"
                variant="outlined"
                density="compact"
                :items="activeOptions"
                item-title="name"
                item-value="id"
                :disabled="!isItemsEmpty"
              />
            </v-col>
            <v-col cols="12" md="3" class="pb-0">
              <v-select
                v-model="filter"
                label="Filtro"
                variant="outlined"
                density="compact"
                :items="filterOptions"
                item-title="name"
                item-value="id"
                :disabled="!isItemsEmpty"
              />
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="3" class="pb-0">
          <v-text-field
            v-model="search"
            label="Buscar"
            type="text"
            variant="outlined"
            density="compact"
            append-inner-icon="mdi-magnify"
            :disabled="isItemsEmpty"
          />
        </v-col>

        <v-col cols="12">
          <v-btn
            block
            size="small"
            :color="isItemsEmpty ? 'info' : 'grey-darken-1'"
            :loading="isItemsEmpty && isLoading"
            @click.prevent="isItemsEmpty ? getItems() : (items = [])"
          >
            {{ isItemsEmpty ? 'Aplicar' : 'Cambiar' }} filtros
            <v-icon right>mdi-filter</v-icon>
          </v-btn>
        </v-col>

        <v-col cols="12">
          <v-data-table
            density="compact"
            :items="items"
            :headers="headers"
            :search="search"
            :items-per-page="15"
            :loading="isLoading"
          >
            <template #item.key="{ item }">
              <b>{{ item.key + 1 }}</b>
            </template>

            <template #item.email_verified_at="{ item }">
              <v-icon size="x-small" :color="item.email_verified_at ? 'info' : ''">
                mdi-checkbox-blank-circle{{ item.email_verified_at ? '' : '-outline' }}
              </v-icon>
            </template>

            <template #item.action="{ item }">
              <div class="text-right">
                <v-btn
                  icon
                  variant="text"
                  size="x-small"
                  :color="item.active ? '' : 'red-darken-3'"
                  :to="{ name: `${routeName}/show`, params: { id: getEncodeId(item.id) } }"
                >
                  <v-icon>mdi-eye</v-icon>
                  <v-tooltip activator="parent" location="left">Detalle</v-tooltip>
                </v-btn>
              </div>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
// Importaciones externas
import { ref, computed, inject, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

// Importaciones internas
import { useStore } from '@/store'
import { URL_API } from '@/utils/config'
import { getHdrs, getErr, getRsp } from '@/utils/http'
import { getEncodeId, getBlob } from '@/utils/coders'
import { getDateTime } from '@/utils/formatters'
import CardTitle from '@/components/CardTitle.vue'

// Constantes
const routeName = 'company'
const alert = inject('alert')
const store = useStore()
const route = useRoute()

// Estado
const isLoading = ref(false)
const items = ref([])
const search = ref('')
const active = ref(1)
const filter = ref(0)

const isItemsEmpty = computed(() => items.value.length === 0)

// Opciones y headers
const activeOptions = [
  { id: 1, name: 'ACTIVOS' },
  { id: 0, name: 'INACTIVOS' },
]
const filterOptions = [{ id: 0, name: 'TODOS' }]

const headers = [
  { title: '#', key: 'key', filterable: false, sortable: false, width: 60 },
  { title: 'Nombre', key: 'name' },
  { title: 'E-mail', key: 'email' },
  { title: 'Rol', key: 'role.name' },
  { title: 'ID', key: 'uiid' },
  { title: 'Verif.', key: 'email_verified_at' },
  { title: '', key: 'action', filterable: false, sortable: false, width: 60 },
]

// Cargar registros
const getItems = async () => {
  isLoading.value = true
  items.value = []
  try {
    //const endpoint = `${URL_API}/${routeName}?active=${active.value}&filter=${filter.value}`
    //const response = await axios.get(endpoint, getHdrs(store.getAuth?.token))
    const response = {
      data: {
        msg: "Registros retornados correctamente",
        data: {
          items: [
            {
              id: 4,
              active: 1,
              name: "CARLO",
              surname_p: "CASTELLANOS",
              surname_m: null,
              email: "ccastellanos@svr.mx",
              employment_position: "VENTAS",
              role_id: 2,
              email_verified_at: null,
              uiid: "U-0004",
              key: 0,
              full_name: "CARLO CASTELLANOS",
              role: {
                name: "USUARIO",
              },
            },
            {
              id: 5,
              active: 1,
              name: "EMILIANO",
              surname_p: "NEGRETE",
              surname_m: null,
              email: "enegrete@svr.mx",
              employment_position: "PROGRAMADOR",
              role_id: 2,
              email_verified_at: null,
              uiid: "U-0005",
              key: 1,
              full_name: "EMILIANO NEGRETE",
              role: {
                name: "USUARIO",
              },
            },
            {
              id: 6,
              active: 1,
              name: "ER LEVI",
              surname_p: "MEDINA",
              surname_m: null,
              email: "emedina@svr.mx",
              employment_position: "PROGRAMADOR",
              role_id: 2,
              email_verified_at: null,
              uiid: "U-0006",
              key: 2,
              full_name: "ER LEVI MEDINA",
              role: {
                name: "USUARIO",
              },
            },
            {
              id: 8,
              active: 1,
              name: "ROBERTO",
              surname_p: "MUÑOZ",
              surname_m: null,
              email: "rmuñoz@svr.mx",
              employment_position: "PROGRAMADOR",
              role_id: 2,
              email_verified_at: null,
              uiid: "U-0008",
              key: 3,
              full_name: "ROBERTO MUÑOZ",
              role: {
                name: "USUARIO",
              },
            },
            {
              id: 1,
              active: 1,
              name: "SAMUEL",
              surname_p: "VALADEZ",
              surname_m: null,
              email: "samuel@svr.mx",
              employment_position: "",
              role_id: 1,
              email_verified_at: null,
              uiid: "U-0001",
              key: 4,
              full_name: "SAMUEL VALADEZ",
              role: {
                name: "ADMINISTRADOR",
              },
            },
            {
              id: 7,
              active: 1,
              name: "VERONICA",
              surname_p: "ALMANZA",
              surname_m: null,
              email: "valmanza@svr.mx",
              employment_position: "DISEÑADORA",
              role_id: 2,
              email_verified_at: null,
              uiid: "U-0007",
              key: 5,
              full_name: "VERONICA ALMANZA",
              role: {
                name: "USUARIO",
              },
            },
            {
              id: 2,
              active: 1,
              name: "XOCHILT",
              surname_p: "GUTIERREZ",
              surname_m: null,
              email: "xgutierrez@svr.mx",
              employment_position: "ADMINISTRADORA",
              role_id: 2,
              email_verified_at: null,
              uiid: "U-0002",
              key: 6,
              full_name: "XOCHILT GUTIERREZ",
              role: {
                name: "USUARIO",
              },
            },
          ],
        },
      },
    };
    items.value = getRsp(response).data.items
  } catch (err) {
    alert?.show('red-darken-1', getErr(err))
  } finally {
    isLoading.value = false
  }
}

// Cargar datos al montar
onMounted(getItems)
</script>