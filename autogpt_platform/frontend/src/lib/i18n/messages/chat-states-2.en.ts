export const ChatStates2En = {
  "chatStates2.compaction.summarizing": "Condensing our conversation…",
  "chatStates2.compaction.rebuilding": "Reloading context…",
  "chatStates2.compaction.dropped":
    "Started a fresh context — earlier messages were dropped",
  "chatStates2.compaction.condensedCount": "Condensed {count} messages",
  "chatStates2.compaction.condensed": "Condensed the conversation",
  "chatStates2.compaction.tokens": "{before} → {after} tokens",
  "chatStates2.compaction.condensedToKeepGoing":
    "Condensed the conversation to keep going",

  "chatStates2.credentialRejection.refusedNamed": '"{name}" was refused',
  "chatStates2.credentialRejection.refused":
    "The saved credential was refused",

  "chatStates2.deleteChat.title": "Delete chat",
  "chatStates2.deleteChat.bodyPrefix": "Are you sure you want to delete",
  "chatStates2.deleteChat.bodySuffix":
    "? This action cannot be undone.",
  "chatStates2.deleteChat.untitled": "Untitled chat",
  "chatStates2.deleteChat.cancel": "Cancel",
  "chatStates2.deleteChat.delete": "Delete",

  "chatStates2.turnStats.thoughtFor": "Thought for {time}",

  "chatStates2.connectTools.dialogAria": "Connect your tools",
  "chatStates2.connectTools.backNotNow": "Not now",
  "chatStates2.connectTools.nextDone": "Done",
  "chatStates2.connectTools.back": "Back",
  "chatStates2.connectTools.next": "Next",
  "chatStates2.connectTools.searchPlaceholder": "Search services...",
  "chatStates2.connectTools.searchAria": "Search services",
  "chatStates2.connectTools.noMatch": 'No services match "{query}"',
  "chatStates2.connectTools.recommended":
    "Recommended from our conversation",
  "chatStates2.connectTools.popular": "Popular places to start",
  "chatStates2.connectTools.searchHint":
    "Search to find a service to connect.",
  "chatStates2.connectTools.connecting": "Connecting…",
  "chatStates2.connectTools.continue": "Continue",

  "chatStates2.copilotModals.grantFailedTitle":
    "Connected, but could not give {name} access",
  "chatStates2.copilotModals.grantFailedDescription":
    "Grant it from the Integrations tab.",
  "chatStates2.copilotModals.skills": "Skills",
  "chatStates2.copilotModals.scheduled": "Scheduled",
  "chatStates2.copilotModals.integrations": "Integrations",

  "chatStates2.notificationBanner.body":
    "Notifications are off. Turn them on in Settings to know when your experts finish working, even when you switch tabs.",
  "chatStates2.notificationBanner.openSettings": "Open settings",
  "chatStates2.notificationBanner.dismiss": "Dismiss",

  "chatStates2.panelResize.resize": "Resize panel",
  "chatStates2.credentialMention.inputAria": "Chat message input",
} as const;
