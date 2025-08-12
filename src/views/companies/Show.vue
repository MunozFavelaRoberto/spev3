<template>
  <v-card :loading="isLoading">
    <v-card-title>
      <v-row dense>
        <v-col cols="10">
          <BtnBack :route="{ name: routeName }" />
          <CardTitle :text="route.meta.title" :icon="route.meta.icon" />
        </v-col>
        <v-col v-if="item" cols="2" class="text-right">
          <div class="d-flex justify-end" style="gap: 10px">
            <v-btn
              icon
              variant="flat"
              size="x-small"
              color="primary"
              :to="{ name: `` }"
            >
              <v-icon>mdi mdi-store</v-icon>
              <v-tooltip activator="parent" location="bottom"
                >Sucursales</v-tooltip
              >
            </v-btn>
            <v-btn
              v-if="item.active"
              icon
              variant="flat"
              size="x-small"
              color="warning"
              :to="{
                name: `${routeName}/update`,
                params: { id: getEncodeId(itemId) },
              }"
            >
              <v-icon>mdi-pencil</v-icon>
              <v-tooltip activator="parent" location="left">Editar</v-tooltip>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card-title>

    <v-card-text v-if="item">
      <v-row>
        <v-col v-if="!item.active" cols="12">
          <v-alert type="error" density="compact" class="rounded">
            <v-row dense>
              <v-col class="grow pt-2">El registro se encuentra inactivo</v-col>
              <v-col
                v-if="store.getAuth?.user?.role_id === 1"
                class="shrink text-right"
              >
                <v-btn
                  icon
                  variant="flat"
                  size="x-small"
                  color="success"
                  @click.prevent="restoreItem"
                >
                  <v-icon>mdi-delete-restore</v-icon>
                  <v-tooltip activator="parent" location="left"
                    >Reactivar</v-tooltip
                  >
                </v-btn>
              </v-col>
            </v-row>
          </v-alert>
        </v-col>

        <v-col cols="12">
          <v-card>
            <v-card-title>
              <v-row dense>
                <v-col cols="11">
                  <CardTitle :text="'GENERAL | ' + item.uiid" sub />
                </v-col>
                <v-col cols="1" class="text-right">
                  <v-btn
                    v-if="store.getAuth?.user?.role_id === 1"
                    icon
                    variant="flat"
                    size="x-small"
                    @click.prevent="regDialog = true"
                  >
                    <v-icon>mdi-clock-outline</v-icon>
                    <v-tooltip activator="parent" location="left"
                      >Registro</v-tooltip
                    >
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-title>

            <v-card-text>
              <v-row dense>
                <v-col cols="12" md="3">
                  <VisVal label="Nombre" :value="item.name" />
                </v-col>
                <v-col cols="12" md="3">
                  <VisDoc label="Logo" :value="item.logo_b64" img />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <VisVal label="Descripción" :value="item.description" />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col
          v-if="item.active && store.getAuth?.user?.role_id === 1"
          cols="12"
        >
          <v-btn
            icon
            variant="flat"
            size="x-small"
            color="red-darken-1"
            @click.prevent="deleteItem"
          >
            <v-icon>mdi-minus-thick</v-icon>
            <v-tooltip activator="parent" location="right">Inactivar</v-tooltip>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>

    <DlgReg v-model="regDialog" :item="item" />
  </v-card>
</template>

<script setup>
// Importaciones de librerías externas
import { ref, inject, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

// Importaciones internas del proyecto
import { useStore } from "@/store";
import { URL_API } from "@/utils/config";
import { getHdrs, getErr, getRsp } from "@/utils/http";
import { getDecodeId, getEncodeId } from "@/utils/coders";

// Componentes
import BtnBack from "@/components/BtnBack.vue";
import CardTitle from "@/components/CardTitle.vue";
import DlgReg from "@/components/DlgReg.vue";
import VisVal from "@/components/VisVal.vue";
import VisDoc from "@/components/VisDoc.vue";

// Constantes fijas
const routeName = "company";

// Estado y referencias
const alert = inject("alert");
const confirm = inject("confirm");
const store = useStore();
const router = useRouter();
const route = useRoute();

// Estado reactivo
const itemId = ref(getDecodeId(route.params.id));
const isLoading = ref(true);
const item = ref(null);
const regDialog = ref(false);

// Obtener registro
const getItem = async () => {
  isLoading.value = true;
  try {
    //const endpoint = `${URL_API}/${routeName}/${itemId.value}`
    //const response = await axios.get(endpoint, getHdrs(store.getAuth?.token))
    const response = {
      data: {
        msg: "Registro retornado correctamente",
        data: {
          item: {
            id: 1,
            active: 1,
            created_at: "2025-07-31 17:30:23",
            updated_at: "2025-07-31 17:30:23",
            created_by_id: 1,
            updated_by_id: 1,
            name: "GOOGLE",
            logo: "cDdfLTsehXzcHn7jbydu3mBPUY36Q7nekBpMTZ3BCdB.png",
            uiid: "E-0001",
            description:
              "Descripción de la empresa de prueba para el sistema SPE",
            created_by: {
              email: "samuel@svr.mx",
            },
            updated_by: {
              email: "samuel@svr.mx",
            },
            logo_b64: {
              cnt: "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",
              ext: "png",
            },
            logo_doc: null,
            logo_dlt: false,
          },
        },
      },
    };
    item.value = getRsp(response).data.item;
  } catch (err) {
    alert?.show("red-darken-1", getErr(err));
  } finally {
    isLoading.value = false;
  }
};

// Inactivar
const deleteItem = async () => {
  const confirmed = await confirm?.show("¿Confirma inactivar el registro?");
  if (!confirmed) return;

  isLoading.value = true;
  try {
    const endpoint = `${URL_API}/${routeName}/${itemId.value}`;
    const response = getRsp(
      await axios.delete(endpoint, getHdrs(store.getAuth?.token))
    );
    alert?.show("red-darken-1", response.msg);
    router.push({ name: routeName });
  } catch (err) {
    alert?.show("red-darken-1", getErr(err));
  } finally {
    isLoading.value = false;
  }
};

// Reactivar
const restoreItem = async () => {
  const confirmed = await confirm?.show("¿Confirma activar el registro?");
  if (!confirmed) return;

  isLoading.value = true;
  try {
    const endpoint = `${URL_API}/system/${routeName}/restore`;
    const response = getRsp(
      await axios.post(
        endpoint,
        { id: itemId.value },
        getHdrs(store.getAuth?.token)
      )
    );
    item.value = response.data.item;
    alert?.show("success", response.msg);
  } catch (err) {
    alert?.show("red-darken-1", getErr(err));
  } finally {
    isLoading.value = false;
  }
};

// Inicializar
onMounted(() => {
  getItem();
});
</script>
