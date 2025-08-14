// Importación de middlewares
import Auth from "./middleware/Auth";
import Public from "./middleware/Public";

const routes = [
  // companies
  {
    path: "/empresas",
    name: "companies",
    component: () => import("@/views/companies/List.vue"),
    meta: {
      title: "Empresas",
      icon: "mdi-domain",
      middleware: Auth,
    },
  },
  {
    path: "/empresas/agregar",
    name: "companies/store",
    component: () => import("@/views/companies/Form.vue"),
    meta: {
      title: "Empresa | Agregar",
      icon: "mdi-domain",
      middleware: Auth,
    },
  },
  {
    path: "/empresas/:id",
    name: "companies/show",
    component: () => import("@/views/companies/Show.vue"),
    props: true,
    meta: {
      title: "Empresa",
      icon: "mdi-domain",
      middleware: Auth,
    },
  },
  {
    path: "/empresas/:id/editar",
    name: "companies/update",
    component: () => import("@/views/companies/Form.vue"),
    props: true,
    meta: {
      title: "Empresa | Editar",
      icon: "mdi-domain",
      middleware: Auth,
    },
  },
  // General
  {
    path: "/inicio",
    name: "home",
    component: () => import("@/views/general/Home.vue"),
    meta: {
      title: "Inicio",
      middleware: Auth,
    },
  },
  {
    path: "/no_autorizado",
    name: "unauthorized",
    component: () => import("@/views/general/Unauthorized.vue"),
    meta: {
      title: "Acceso Denegado",
      middleware: Auth,
    },
  },

  // Public
  {
    path: "/iniciar_sesion",
    name: "login",
    component: () => import("@/views/public/UserLogin.vue"),
    meta: {
      title: "Iniciar Sesión",
      middleware: Public,
    },
  },
  {
    path: "/",
    name: "main",
    component: () => import("@/views/public/Main.vue"),
    meta: {
      title: "SVR",
      middleware: Public,
    },
  },
  {
    path: "/recuperar_contrasena",
    name: "user_password_recover",
    component: () => import("@/views/public/UserPasswordRecover.vue"),
    meta: {
      title: "Recuperar contraseña",
      icon: "mdi-account",
      middleware: Public,
    },
  },
  {
    path: "/restablecer_contrasena/:id",
    name: "user_password_reset",
    component: () => import("@/views/public/UserPasswordReset.vue"),
    meta: {
      title: "Restablecer contraseña",
      icon: "mdi-account",
      middleware: Public,
    },
  },
  {
    path: "/confirmar_cuenta/:id",
    name: "user_account_confirm",
    component: () => import("@/views/public/UserAccountConfirm.vue"),
    meta: {
      title: "Confirmar cuenta",
      icon: "mdi-account",
      middleware: Public,
    },
  },

  // Not Found
  {
    path: "/:pathMatch(.*)*",
    name: "not_found",
    component: () => import("@/views/public/NotFound.vue"),
  },
];

export default routes;
