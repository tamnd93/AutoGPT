export const credentials1En = {
  "credentials1.dialog.cancel": "Cancel",
  "credentials1.dialog.addNew": "Add new",
  "credentials1.dialog.granting": "Granting…",
  "credentials1.dialog.updateThisAccount": "Update this account",
  "credentials1.dialog.useThisAccount": "Use this account",
  "credentials1.dialog.useExisting": "Use existing",
  "credentials1.dialog.connecting": "Connecting…",
  "credentials1.dialog.continue": "Continue",

  "credentials1.existing.titleGrant": "Give this expert access to {name}",
  "credentials1.existing.titleChoose": "Choose a {name} account",
  "credentials1.existing.titleUpdate": "Update a {name} account",
  "credentials1.existing.descGrant":
    "Your account is already connected, but this expert can't use it yet. Pick an account to share, or add a new one.",
  "credentials1.existing.descChoose":
    "You have more than one account connected. Pick the one this chat should use, or add a new one.",
  "credentials1.existing.descUpdate":
    "None of your connected accounts has the access this needs. Pick the one to sign in to again, or add a new one.",
  "credentials1.existing.accountLabel": "Account",
  "credentials1.existing.typeOAuth": "OAuth",
  "credentials1.existing.typeApiKey": "API key",
  "credentials1.row.delete": "Delete",

  "credentials1.apiKey.title": "Add new API key for {name}",
  "credentials1.apiKey.name": "Name",
  "credentials1.apiKey.namePlaceholder": "Enter a name for this API Key...",
  "credentials1.apiKey.label": "API Key",
  "credentials1.apiKey.placeholder": "Enter API Key...",
  "credentials1.apiKey.scopesHint": "Required scope(s) for this block:",
  "credentials1.apiKey.expiration": "Expiration Date",
  "credentials1.apiKey.expirationPlaceholder": "Select expiration date...",
  "credentials1.apiKey.submit": "Add API Key",
  "credentials1.apiKey.nameRequired": "Name is required",
  "credentials1.apiKey.keyRequired": "API Key is required",

  "credentials1.typeSelector.title": "Add credential for {name}",
  "credentials1.typeSelector.passwordDesc":
    "Add a username and password credential.",
  "credentials1.typeSelector.passwordButton": "Enter credentials",
  "credentials1.typeSelector.hostDesc":
    "Add host-scoped headers for authentication.",
  "credentials1.typeSelector.hostButton": "Add headers",
  "credentials1.typeSelector.oauthDesc":
    "Sign in with your {name} account using OAuth.",
  "credentials1.typeSelector.oauthButton": "Sign in with {name}",

  "credentials1.ayrshare.button": "Connect Social Media Accounts",
  "credentials1.ayrshare.popupBlocked":
    "Please allow popups for this site to be able to login with Ayrshare",
  "credentials1.ayrshare.successTitle": "Success",
  "credentials1.ayrshare.successBody":
    "Please complete the authentication in the popup window",
  "credentials1.ayrshare.errorTitle": "Error",
  "credentials1.ayrshare.errorBody": "Error getting SSO URL: {error}",

  "credentials1.flatView.credentials": "{name} credentials",
  "credentials1.flatView.optional": "(optional)",
  "credentials1.flatView.required": "required",

  "credentials1.select.none": "None (skip this credential)",
  "credentials1.select.placeholder": "Select credential",
  "credentials1.select.aria": "Select {name} credential",
  "credentials1.select.selectOne": "Select a credential",

  "credentials1.delete.title": "Delete credential",
  "credentials1.delete.body":
    'Are you sure you want to delete "{title}"? This action cannot be undone.',
  "credentials1.delete.delete": "Delete",
  "credentials1.delete.force": "Force Delete",
} as const;
