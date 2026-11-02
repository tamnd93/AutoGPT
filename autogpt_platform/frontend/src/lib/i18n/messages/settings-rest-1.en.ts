export const settingsRest1En = {
  "settingsRest1.info.key": "Key",
  "settingsRest1.info.description": "Description",
  "settingsRest1.info.scopes": "Scopes",
  "settingsRest1.info.created": "Created",
  "settingsRest1.info.lastUsed": "Last used",
  "settingsRest1.info.noScopes": "No scopes",
  "settingsRest1.info.v1Only": "· v1 only",
  "settingsRest1.info.neverUsed": "Never used",

  "settingsRest1.list.errorContext": "API keys",
  "settingsRest1.empty.title": "No API key found",
  "settingsRest1.empty.body":
    "You haven't created an API key yet. Create one to start using the AutoGPT Platform API.",
  "settingsRest1.skeleton.loading": "Loading API keys",

  "settingsRest1.row.select": "Select {name}",
  "settingsRest1.row.viewDetails": "View details for {name}",
  "settingsRest1.row.viewKeyDetails": "View key details",
  "settingsRest1.row.delete": "Delete {name}",
  "settingsRest1.selection.selected": "{count} selected",
  "settingsRest1.selection.selectAll": "Select All",
  "settingsRest1.selection.deselect": "Deselect",
  "settingsRest1.selection.deleteSelected": "Delete selected",

  "settingsRest1.header.title": "AutoGPT API Keys",
  "settingsRest1.header.bodyPrefix":
    "Manage API keys that let external tools access your AutoGPT account. See the",
  "settingsRest1.header.apiDocs": "API docs",
  "settingsRest1.header.bodySuffix": "to get started.",
  "settingsRest1.header.create": "Create Key",

  "settingsRest1.create.titleSuccess": "Your new API key",
  "settingsRest1.create.title": "Create API key",
  "settingsRest1.form.name": "Name",
  "settingsRest1.form.namePlaceholder": "My integration key",
  "settingsRest1.form.description": "Description (optional)",
  "settingsRest1.form.descriptionPlaceholder":
    "Describe what this key is used for",
  "settingsRest1.form.submit": "Create Key",
  "settingsRest1.success.warning":
    "Copy your key now. For security, we won't show it again.",
  "settingsRest1.success.copied": "Copied to clipboard",
  "settingsRest1.success.copyFailed": "Could not copy to clipboard",
  "settingsRest1.success.copyManually": "Please copy the key manually.",
  "settingsRest1.success.copy": "Copy",
  "settingsRest1.success.close": "Close",
  "settingsRest1.permissions.title": "Permissions",

  "settingsRest1.schema.nameRequired": "Name is required",
  "settingsRest1.schema.nameTooLong": "Name must be 100 characters or less",
  "settingsRest1.schema.descriptionTooLong":
    "Description must be 500 characters or less",
  "settingsRest1.schema.permissionRequired": "Select at least one permission",

  "settingsRest1.delete.titleOne": "Revoke API key?",
  "settingsRest1.delete.titleMany": "Revoke {count} API keys?",
  "settingsRest1.delete.bodyPrefix":
    "This action cannot be undone. Integrations using",
  "settingsRest1.delete.thisKey": "this key",
  "settingsRest1.delete.theseKeys": "these keys",
  "settingsRest1.delete.bodySuffix": "will immediately lose access.",
  "settingsRest1.delete.cancel": "Cancel",
  "settingsRest1.delete.revokeMany": "Revoke keys",
  "settingsRest1.delete.revokeOne": "Revoke key",

  "settingsRest1.hooks.created": "API key created",
  "settingsRest1.hooks.createFailed": "Failed to create API key",
  "settingsRest1.hooks.revokedOne": "API key revoked",
  "settingsRest1.hooks.revokedMany": "{count} API keys revoked",
  "settingsRest1.hooks.someFailed": "Some API keys could not be revoked",
  "settingsRest1.hooks.failedCount": "{failed} of {total} failed.",
  "settingsRest1.list.used": "Used {relative}",

  "settingsRest1.bots.title": "Bots",
  "settingsRest1.bots.body":
    "Connect AutoGPT bots to your chat platforms. Add a bot to one of your servers, link a DM channel so the bot can talk to you directly, or unlink an existing connection.",
  "settingsRest1.bots.errorContext": "bots",
  "settingsRest1.bots.emptyTitle": "No bots enabled",
  "settingsRest1.bots.emptyBody":
    "No chat-bot platforms are available on this deployment right now.",
  "settingsRest1.notice.lead": "Conversations that come in over a bot start on",
  "settingsRest1.notice.bridge": ", the connection you chose in",
  "settingsRest1.notice.link": "AI subscriptions",

  "settingsRest1.card.iconAlt": "{name} icon",
  "settingsRest1.card.pending": "Pending — finish in {platform}",
  "settingsRest1.card.openIn": "Open AutoGPT in {platform}",
  "settingsRest1.card.messageBot": "Message bot on {platform}",
  "settingsRest1.card.addBotTo": "Add bot to {platform}",
  "settingsRest1.card.addToServer": "Add to a {noun}",
  "settingsRest1.card.directMessages": "Direct messages",
  "settingsRest1.card.linkedServers": "Linked {noun}s",

  "settingsRest1.dm.userFallback": "User {id}",
  "settingsRest1.dm.pendingTitle": "{noun} “{name}” connected — one step left",
  "settingsRest1.dm.linkPrompt": "DM the bot on {platform} to link",
  "settingsRest1.dm.linkedSubtitle":
    "Your DM channel is linked to this account.",
  "settingsRest1.dm.pendingSubtitle":
    "DM the bot in {platform} and tap Link Account to connect your DMs.",
  "settingsRest1.dm.idleSubtitle":
    "Send the bot a direct message to start the link flow.",
  "settingsRest1.dm.unlinkAria": "Unlink DM on {platform}",
  "settingsRest1.dm.unlink": "Unlink",
  "settingsRest1.dm.notLinked": "Not linked",

  "settingsRest1.server.emptyLead": "No {noun}s linked yet. Use",
  "settingsRest1.server.emptyMid": "to invite the bot — already added it? Run",
  "settingsRest1.server.emptyTail": "there to finish connecting.",
  "settingsRest1.server.nameUnavailable": "Name unavailable",
  "settingsRest1.server.nameTooltip":
    "{platform} didn't give us a name for this {noun}. It stays linked and usable; unlink to remove this row.",
  "settingsRest1.server.linkedByYou": "Linked by you",
  "settingsRest1.server.unlinkAria": "Unlink {label}",
  "settingsRest1.server.unlink": "Unlink",

  "settingsRest1.botFail.title": "Couldn't {action}",
  "settingsRest1.botFail.retry": "Please try again in a moment.",
  "settingsRest1.botFail.unlinkServer": "unlink the server",
  "settingsRest1.botFail.unlinkDm": "unlink the DM",

  "settingsRest1.creator.title": "Creator dashboard",
  "settingsRest1.creator.body":
    "Track your store submissions, see how they perform, and ship updates for the workflows you publish.",
  "settingsRest1.creator.submit": "Submit workflow",
} as const;
