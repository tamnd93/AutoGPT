export const Integrations1En = {
  "integrations1.panel.title": "Tools your experts and workflows use",
  "integrations1.available.title": "Available integrations",
  "integrations1.available.description":
    "Connect your services, including official vendor integrations. Some services need additional setup.",
  "integrations1.available.noMatch": "No available services match your search.",
  "integrations1.available.empty": "No available services.",
  "integrations1.available.count": "{shown} of {total} services",
  "integrations1.available.showMore": "Show more services",

  "integrations1.credential.forChats": "For chats",
  "integrations1.credential.managed": "Managed",
  "integrations1.credential.managedHint":
    "Managed by AutoGPT — cannot be removed",
  "integrations1.credential.select": "Select {title}",
  "integrations1.credential.delete": "Delete {title}",
  "integrations1.credential.blocksNote":
    "{service} blocks in workflows need their own connection.",
  "integrations1.credential.type.apiKey": "API Key",
  "integrations1.credential.type.oauth": "OAuth",
  "integrations1.credential.type.userPassword": "User/Password",
  "integrations1.credential.type.hostScoped": "Host-scoped",
  "integrations1.credential.type.deviceAuth": "Device auth",
  "integrations1.credential.masked.username": "Username: {username}",
  "integrations1.credential.masked.apiKey": "API key configured",
  "integrations1.credential.masked.oauth": "Connected via OAuth",
  "integrations1.credential.masked.userPassword": "Username/password set",
  "integrations1.credential.masked.configured": "Configured",

  "integrations1.delete.forceTitleOne": "Force remove {name}?",
  "integrations1.delete.forceTitleMany": "Force remove {count} integrations?",
  "integrations1.delete.removeTitleOne": "Remove {name}?",
  "integrations1.delete.removeTitleMany": "Remove {count} integrations?",
  "integrations1.delete.thisIntegration": "this integration",
  "integrations1.delete.forceMessageOne":
    "This credential is referenced by an active webhook or workflow. Forcing removal may break it.",
  "integrations1.delete.forceMessageMany":
    "These credentials are referenced by active webhooks or workflows. Forcing removal may break them.",
  "integrations1.delete.removeMessageOne":
    "This action cannot be undone. Experts and workflows using this credential will lose access immediately.",
  "integrations1.delete.removeMessageMany":
    "This action cannot be undone. Experts and workflows using these credentials will lose access immediately.",
  "integrations1.delete.force": "Force remove",
  "integrations1.delete.remove": "Remove",
  "integrations1.delete.cancel": "Cancel",
  "integrations1.delete.toast.removedOne": "Removed {name}",
  "integrations1.delete.toast.removed": "Integration removed",
  "integrations1.delete.toast.removedMany": "{count} integrations removed",
  "integrations1.delete.toast.more": " +{count} more",
  "integrations1.delete.toast.failedOne": "Failed to remove integration",
  "integrations1.delete.toast.failedMany":
    "Failed to remove {count} integrations",
  "integrations1.delete.toast.failedSome":
    "{failed} of {attemptable} could not be removed",
  "integrations1.delete.toast.failedBody":
    "{names}. Try again to retry the failed ones.",

  "integrations1.list.codexNotice":
    "New chats can no longer run on your ChatGPT plan — they fall back to the connection AutoGPT picks. Your chat history is kept, and your other integrations are unaffected.",
  "integrations1.skeleton.loading": "Loading integrations",

  "integrations1.empty.noMatch":
    'None of your connected integrations match "{query}".',
  "integrations1.empty.title": "No integration connected",
  "integrations1.empty.description":
    "Connect a service to let your experts and workflows use third-party tools like GitHub, Gmail, or Figma.",

  "integrations1.search.placeholder": "Search integrations...",
  "integrations1.search.label": "Search integrations",

  "integrations1.selection.selected": "{count} selected",
  "integrations1.selection.selectAll": "Select All",
  "integrations1.selection.deselect": "Deselect",
  "integrations1.selection.delete": "Delete selected",
} as const;
