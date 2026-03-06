// import { type RouteConfig, index } from "@react-router/dev/routes";

// export default [
//   index("features/dashboard/pages/Dashboard.tsx"),
// ] satisfies RouteConfig;

import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  // Auth routes
  layout("components/layouts/AuthLayout.tsx", [
    route("login", "features/auth/pages/Login.tsx"),
    route("register", "features/auth/pages/Register.tsx"),
    route("forgot-password", "features/auth/pages/ForgotPassword.tsx"),
    route("verification", "features/auth/pages/Verification.tsx"),
    route("reset-password", "features/auth/pages/ResetPassword.tsx"),
  ]),

  // Main routes
  layout("components/layouts/MainLayout.tsx", [
    index("features/dashboard/pages/Dashboard.tsx"),
    route(
      "school-management",
      "features/schoolManagement/pages/SchoolManagement.tsx",
    ),
  ]),
] satisfies RouteConfig;
