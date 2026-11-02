export const ConnectServices1En = {
  "connectServices1.dialog.title": "Connect a service",
  "connectServices1.dialog.description":
    "Choose a service to connect your account or view its setup instructions.",

  "connectServices1.methodView.connectProvider": "Connect {provider}",
  "connectServices1.methodView.connectAutoGpt": "Connect AutoGPT to {provider}",
  "connectServices1.methodView.chooseHow":
    "Choose how you'd like to connect your {provider} account.",
  "connectServices1.methodView.recommended": "RECOMMENDED",
  "connectServices1.methodView.oauthLabel": "OAuth",
  "connectServices1.methodView.oauthDesc": "One-click secure access.",
  "connectServices1.methodView.apiKeyLabel": "API Key",
  "connectServices1.methodView.apiKeyDesc": "Paste your token for a custom setup.",
  "connectServices1.methodView.userPasswordLabel": "Username & password",
  "connectServices1.methodView.userPasswordDesc":
    "Sign in with account credentials.",
  "connectServices1.methodView.hostScopedLabel": "Website access",
  "connectServices1.methodView.hostScopedDesc":
    "Paste a key or headers used only for one website.",
  "connectServices1.methodView.deviceCodeLabel": "Device auth",
  "connectServices1.methodView.deviceCodeDesc":
    "Approve on your phone with a short code.",

  "connectServices1.inlineApiKey.name": "Name",
  "connectServices1.inlineApiKey.keyPlaceholder": "My {provider} key",
  "connectServices1.inlineApiKey.apiKey": "API key",
  "connectServices1.inlineApiKey.expires": "Expires (optional)",

  "connectServices1.hostScoped.hostRequired": "Host is required",
  "connectServices1.hostScoped.hostNoUrl":
    "Enter only the host (e.g. api.example.com), not a full URL",
  "connectServices1.hostScoped.hostNoPath":
    "Enter only the host, without a trailing path. A port is allowed.",
  "connectServices1.hostScoped.savedTitle": "Host credentials saved",
  "connectServices1.hostScoped.saveFailed":
    "Couldn't save host credentials",
  "connectServices1.hostScoped.host": "Host",
  "connectServices1.hostScoped.takenFromUrl":
    "Taken from the URL this block calls.",
  "connectServices1.hostScoped.hostFromUrl":
    "The host of the URL this block will call.",
  "connectServices1.hostScoped.headers": "Headers",
  "connectServices1.hostScoped.headersBody":
    "Sent with every request to this host, such as Authorization.",
  "connectServices1.hostScoped.headerName": "Header name",
  "connectServices1.hostScoped.headerValue": "Header value",
  "connectServices1.hostScoped.removeHeader": "Remove header {index}",
  "connectServices1.hostScoped.addHeader": "Add header",
  "connectServices1.hostScoped.connecting": "Connecting…",
  "connectServices1.hostScoped.connect": "Connect",

  "connectServices1.userPassword.nameRequired": "Name is required",
  "connectServices1.userPassword.nameMax":
    "Name must be 100 characters or less",
  "connectServices1.userPassword.usernameRequired": "Username is required",
  "connectServices1.userPassword.passwordRequired": "Password is required",
  "connectServices1.userPassword.savedTitle": "Credentials saved",
  "connectServices1.userPassword.saveFailed": "Couldn't save credentials",
  "connectServices1.userPassword.name": "Name",
  "connectServices1.userPassword.accountPlaceholder":
    "My {provider} account",
  "connectServices1.userPassword.username": "Username",
  "connectServices1.userPassword.password": "Password",

  "connectServices1.form.planNeeded":
    "Connecting a service needs an active plan",
  "connectServices1.form.unexpected": "Unexpected error",

  "connectServices1.apiKeyForm.saved": "API key saved",
  "connectServices1.apiKeyForm.saveFailed": "Couldn't save API key",
  "connectServices1.apiKeyForm.name": "Name",
  "connectServices1.apiKeyForm.keyPlaceholder": "My {provider} key",
  "connectServices1.apiKeyForm.apiKey": "API key",
  "connectServices1.apiKeyForm.expires": "Expires (optional)",
  "connectServices1.apiKeyForm.expiresHint":
    "Leave blank to keep the key indefinitely",
  "connectServices1.apiKeyForm.save": "Save API key",
  "connectServices1.apiKeyForm.nameRequired": "Name is required",
  "connectServices1.apiKeyForm.nameMax":
    "Name must be 100 characters or less",
  "connectServices1.apiKeyForm.keyRequired": "API key is required",
  "connectServices1.apiKeyForm.dateInvalid": "Pick a valid date",
  "connectServices1.apiKeyForm.dateFuture": "Expiry must be in the future",

  "connectServices1.gpt.what": "What it does.",
  "connectServices1.gpt.whatBody":
    "Chats routed to ChatGPT run on your ChatGPT plan instead of AutoGPT credits. Every new chat starts on the connection you choose in Settings, and you can change it per conversation — nothing switches on its own.",
  "connectServices1.gpt.cost": "What it costs.",
  "connectServices1.gpt.costBody":
    "Usage counts toward your ChatGPT plan's own limits. Those runs spend zero AutoGPT credits, and AutoGPT never adds a charge on top.",
  "connectServices1.gpt.get": "What you get.",
  "connectServices1.gpt.getBody":
    "The models your ChatGPT plan already includes, at no extra cost from AutoGPT.",
  "connectServices1.gpt.getBodyModels":
    "{models}, at no extra cost from AutoGPT.",
  "connectServices1.gpt.control": "Stay in control.",
  "connectServices1.gpt.controlBody":
    "A chat stays on the connection it started with, so a run is never moved onto your AutoGPT credits without asking. Disconnect any time in Settings.",

  "connectServices1.detail.back": "Back to services",

  "connectServices1.tab.oauth": "OAuth",
  "connectServices1.tab.apiKey": "API key",
  "connectServices1.tab.userPassword": "User / password",
  "connectServices1.tab.host": "Host",
  "connectServices1.tab.deviceAuth": "Device auth",
  "connectServices1.tab.chatgpt": "ChatGPT",
  "connectServices1.tab.signInChatGpt": "Sign in with ChatGPT",
  "connectServices1.tab.notWired":
    "{method} sign-in for {provider} is not yet wired up in this dialog.",

  "connectServices1.mcpPreset.none": "No sign-in",
  "connectServices1.mcpPreset.oauth": "Sign in",
  "connectServices1.mcpPreset.bearer": "API token",
  "connectServices1.mcpPreset.basic": "Basic authentication",
  "connectServices1.mcpPreset.docs": "Official documentation",
  "connectServices1.mcpPreset.connectionMethod": "Connection method",

  "connectServices1.mcpUrl.region": "Server region",
  "connectServices1.mcpUrl.chooseRegion": "Choose your account's region",
  "connectServices1.mcpUrl.custom": "Custom URL",
  "connectServices1.mcpUrl.serverUrl": "Server URL",

  "connectServices1.mcp.enterUrl":
    "Enter the server URL from the service's setup instructions.",
  "connectServices1.mcp.allowChanges": "Allow changes",
  "connectServices1.mcp.readOnly":
    "Without this it can only read, not create or edit.",
  "connectServices1.mcp.useCredential":
    "Use the credential described in the setup instructions above.",
  "connectServices1.mcp.useApiCredential":
    "Use an API credential only if this server supports it. Follow the server's documentation for the correct authentication type.",
  "connectServices1.mcp.useApiToken": "Use an API token instead",
  "connectServices1.mcp.tryOAuth": "Try OAuth",
  "connectServices1.mcp.connect": "Connect",
  "connectServices1.mcp.saveToken": "Save token",
  "connectServices1.mcp.noOAuth":
    "This server doesn't support OAuth sign-in. Choose how its API credential should be sent.",
  "connectServices1.mcp.signInUnavailable":
    "Sign-in is unavailable for this connection. Check its setup instructions and try again.",
  "connectServices1.mcp.timedOut":
    "OAuth sign-in timed out. Please try again.",
  "connectServices1.mcp.basicUnsupported":
    "This connection does not support Basic authentication.",
  "connectServices1.mcp.bearerUnsupported":
    "This connection does not support Bearer tokens.",

  "connectServices1.mcpFirst.moreWays": "More ways to connect",
  "connectServices1.mcpFirst.back": "Back",

  "connectServices1.publicMCP.noAccount":
    "This server can be used without connecting an account.",
  "connectServices1.publicMCP.noTools":
    "Connected, but this server returned no tools.",
  "connectServices1.publicMCP.toolsOne": "1 tool available.",
  "connectServices1.publicMCP.tools": "{count} tools available.",
  "connectServices1.publicMCP.nothingSaved":
    "This service needs no sign-in, so nothing was saved. Add it to a workflow or ask an expert to use it.",
  "connectServices1.publicMCP.checkConnection": "Check connection",

  "connectServices1.unsupported.title": "No connection method available",
  "connectServices1.unsupported.bodyDefault":
    "{provider} doesn't currently expose a connection flow you can manage from settings. Add a block that uses {provider} to enable this.",

  "connectServices1.oauth.popupBlocked": "Popup blocked",
  "connectServices1.oauth.connected": "Connected via OAuth",
  "connectServices1.oauth.failed": "OAuth connection failed",

  "connectServices1.error.generic": "Something went wrong. Please try again.",

  "connectServices1.list.searchPlaceholder": "Search services...",
  "connectServices1.list.searchAria": "Search services",
  "connectServices1.list.noMatch": "No services match \"{query}\"",
  "connectServices1.list.noServices": "No services available",

  "connectServices1.row.setupRequired": "Setup required",
} as const;
