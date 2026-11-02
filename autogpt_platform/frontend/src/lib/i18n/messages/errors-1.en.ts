export const errors1En = {
  "errors1.error.userCreation.message":
    "Failed to create your user account in our system. This could be due to a temporary server issue or a problem with your account setup.",
  "errors1.error.userCreation.context": "user account creation",
  "errors1.error.authToken.message":
    "Your authentication token is missing or invalid. Please try signing in again.",
  "errors1.error.authToken.context": "authentication token",
  "errors1.error.server.message":
    "Our servers are experiencing issues. Please try again in a few minutes, or contact support if the problem persists.",
  "errors1.error.server.context": "server error",
  "errors1.error.rateLimited.message":
    "Too many requests have been made. Please wait a moment before trying again.",
  "errors1.error.rateLimited.context": "rate limiting",
  "errors1.error.network.message":
    "Unable to connect to our servers. Please check your internet connection and try again.",
  "errors1.error.network.context": "network connectivity",
  "errors1.error.authFailed.message":
    "Authentication failed. Please try signing in again.",
  "errors1.error.authFailed.context": "authentication",
  "errors1.error.sessionExpired.message":
    "Your session has expired. Please sign in again to continue.",
  "errors1.error.sessionExpired.context": "session",
  "errors1.error.unexpected.message":
    "An unexpected error occurred. Please try again or contact support if the problem persists.",
  "errors1.error.unexpected.context": "application",
  "errors1.error.loading": "Loading...",
  "errors1.appError.title": "Oops, something went wrong!",
  "errors1.appError.body":
    "We're sorry, but an unexpected error has occurred. Please try again later or contact support if the issue persists.",
  "errors1.appError.retry": "Retry",
  "errors1.appError.home": "Go to Homepage",
  "errors1.unauthorized.title": "Unauthorized Access",
  "errors1.unauthorized.body": "You do not have permission to view this page.",
  "errors1.safeMode.hitlOnTitle": "HITL safe mode enabled",
  "errors1.safeMode.hitlOffTitle": "HITL safe mode disabled",
  "errors1.safeMode.hitlOnDetail":
    "Human-in-the-loop blocks will require manual review",
  "errors1.safeMode.hitlOffDetail":
    "Human-in-the-loop blocks will proceed automatically",
  "errors1.safeMode.sensitiveOnTitle": "Sensitive action safe mode enabled",
  "errors1.safeMode.sensitiveOffTitle": "Sensitive action safe mode disabled",
  "errors1.safeMode.sensitiveOnDetail":
    "Sensitive action blocks will require manual review",
  "errors1.safeMode.sensitiveOffDetail":
    "Sensitive action blocks will proceed automatically",
  "errors1.safeMode.notAvailableTitle": "Safe mode not available",
  "errors1.safeMode.notAvailableBody":
    "To configure safe mode, please save this workflow to your library first.",
  "errors1.safeMode.updateFailedTitle": "Failed to update safe mode",
  "errors1.safeMode.unexpectedError": "An unexpected error occurred.",
  "errors1.credits.checkoutFailed":
    "Checkout didn't start. Please try again later.",
  "errors1.storeCategories.loading": "Loading categories…",
  "errors1.storeCategories.unavailable": "Categories unavailable",
  "errors1.storeCategories.select": "Select a category",
  "errors1.apiKey.group.v2": "API v2",
  "errors1.apiKey.group.both": "API v1 and v2",
  "errors1.apiKey.group.v1": "API v1 only (stops working 2027-02-01)",
  "errors1.apiKey.scope.IDENTITY": "View your user ID, e-mail, and timezone",
  "errors1.apiKey.scope.EXECUTE_GRAPH": "Run your workflows",
  "errors1.apiKey.scope.READ_GRAPH": "View your workflows and their configurations",
  "errors1.apiKey.scope.WRITE_GRAPH": "Create and edit your workflows, and choose which version runs",
  "errors1.apiKey.scope.WRITE_LIBRARY": "Add, organize, fork and remove workflows in your library, including their schedules and triggers",
  "errors1.apiKey.scope.EXECUTE_BLOCK": "Execute individual blocks",
  "errors1.apiKey.scope.READ_BLOCK": "View available blocks",
  "errors1.apiKey.scope.READ_STORE": "Access the Marketplace",
  "errors1.apiKey.scope.WRITE_STORE": "Create, update, and delete marketplace submissions",
  "errors1.apiKey.scope.READ_LIBRARY": "View your library workflows and folders",
  "errors1.apiKey.scope.RUN_AGENT": "Run workflows from your library",
  "errors1.apiKey.scope.READ_RUN": "View run details and history",
  "errors1.apiKey.scope.WRITE_RUN": "Stop and delete runs",
  "errors1.apiKey.scope.SHARE_RUN": "Share and unshare workflow runs",
  "errors1.apiKey.scope.READ_RUN_REVIEW": "View pending human-in-the-loop reviews",
  "errors1.apiKey.scope.WRITE_RUN_REVIEW": "Submit human-in-the-loop review responses",
  "errors1.apiKey.scope.READ_SCHEDULE": "View your schedules",
  "errors1.apiKey.scope.WRITE_SCHEDULE": "Create and delete schedules",
  "errors1.apiKey.scope.READ_CREDITS": "View your credit balance, transactions, invoices and subscription",
  "errors1.apiKey.scope.READ_FILES": "List and download workspace files",
  "errors1.apiKey.scope.WRITE_FILES": "Upload and delete workspace files",
  "errors1.apiKey.scope.USE_TOOLS": "Search and fetch web pages for you; web searches count against your usage allowance",
  "errors1.apiKey.scope.MANAGE_INTEGRATIONS": "Set up new integrations",
  "errors1.apiKey.scope.READ_INTEGRATIONS": "View your connected integrations",
  "errors1.apiKey.scope.DELETE_INTEGRATIONS": "Remove connected integrations",

} as const;
