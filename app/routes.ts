import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  // Public auth routes — no gate
  layout("components/layouts/AuthLayout.tsx", [
    route("login", "features/auth/pages/Login.tsx"),
    route("register", "features/auth/pages/Register.tsx"),
    route("forgot-password", "features/auth/pages/ForgotPassword.tsx"),
    route("verification", "features/auth/pages/Verification.tsx"),
    route("reset-password", "features/auth/pages/ResetPassword.tsx"),
  ]),

  // Everything below requires a logged-in session
  layout("components/layouts/RequireAuth.tsx", [
    layout("components/layouts/MainLayout.tsx", [
      index("features/dashboard/pages/Dashboard.tsx"),
      route(
        "school-management",
        "features/schoolManagement/pages/SchoolManagement.tsx",
      ),
      route(
        "user-admin-management",
        "features/userAdminManagement/pages/UserAdminManagement.tsx",
      ),
      route(
        "subscriptions-payments-tracking",
        "features/subscriptionsPaymentsTracking/pages/SubscriptionsPaymentsTracking.tsx",
      ),
      route(
        "content-website-management",
        "features/contentWebsiteManagement/pages/ContentWebsiteManagement.tsx",
      ),
      route(
        "analytics-reporting",
        "features/analyticsReporting/pages/AnalyticsReporting.tsx",
      ),
      route(
        "revenue-analytics",
        "features/revenueAnalytics/pages/RevenueAnalytics.tsx",
      ),
      route(
        "support-operations",
        "features/supportOperations/pages/SupportOperations.tsx",
      ),
      route(
        "system-security",
        "features/systemSecurity/pages/SystemSecurity.tsx",
      ),
      route(
        "configurations",
        "features/configurations/pages/Configurations.tsx",
      ),
      route(
        "marketing-affiliates",
        "features/marketingAffiliates/pages/MarketingAffiliates.tsx",
      ),
      route("help-center", "features/helpCenter/pages/HelpCenter.tsx"),
      route(
        "system-health-status",
        "features/systemHealthStatus/pages/SystemHealthStatus.tsx",
      ),
      route("announcements", "features/announcements/pages/Announcements.tsx"),
    ]),

    layout("components/layouts/FullScreenLayout.tsx", [
      route(
        "school-management/:schoolId",
        "features/schoolManagement/pages/SchoolDetails.tsx",
      ),
      route("notifications", "features/notifications/pages/Notifications.tsx"),
      route(
        "notifications/:id",
        "features/notifications/pages/NotificationDetails.tsx",
      ),
      route("storybook", "components/StoryBook.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
