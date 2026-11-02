export const ChatStates4En = {
  "chatStates4.stop.pendingTitle": "Stop may take a moment",
  "chatStates4.stop.pendingBody":
    "The cancel was sent but not yet confirmed. The task should stop shortly.",
  "chatStates4.stop.failedTitle": "Could not stop the task",
  "chatStates4.stop.failedBody":
    "The task may still be running in the background.",

  "chatStates4.reconnect.lostTitle": "Connection lost",
  "chatStates4.reconnect.exhaustedBody":
    "Unable to reconnect. Please refresh the page.",
  "chatStates4.reconnect.timeoutTitle": "Connection timed out",
  "chatStates4.reconnect.timeoutBody":
    "Your expert may still be working. Refresh to check for updates.",
  "chatStates4.reconnect.reconnecting": "Reconnecting...",
  "chatStates4.reconnect.sendBlockedTitle": "Reconnecting",
  "chatStates4.reconnect.sendBlockedBody":
    "Wait for the connection to resume before sending.",
  "chatStates4.anomaly.title": "Connection lost",
  "chatStates4.anomaly.body":
    "We keep trying; your expert may still be working.",

  "chatStates4.notice.catchingUp": "Catching up…",
  "chatStates4.notice.reconnecting": "Reconnecting…",
  "chatStates4.notice.offline": "Offline — waiting for the network…",

  "chatStates4.followUp.notSentTitle": "Follow-up not sent",
  "chatStates4.followUp.notSentBody":
    "You left the chat before it could go out. It's back in the composer.",
  "chatStates4.followUp.attachWaitTitle": "Please wait to attach files",
  "chatStates4.followUp.attachWaitBody":
    "File attachments can't be queued until the current response finishes.",

  "chatStates4.hydrate.interruptedTitle": "Previous response was interrupted",
  "chatStates4.hydrate.interruptedBody":
    "The chat disconnected before the last response finished. Resend to try again.",

  "chatStates4.delete.failedTitle": "Failed to delete chat",
  "chatStates4.delete.failedBody": "An error occurred",

  "chatStates4.send.failedTitle": "Couldn't send message",
  "chatStates4.send.recoveryComposer": "your message is back in the composer",
  "chatStates4.send.recoveryFiles": "your files were not sent",

  "chatStates4.connections.checkFailedTitle": "Could not check AI connections",
  "chatStates4.connections.checkFailedBody": "Refresh the page and try again.",
  "chatStates4.connections.noneTitle": "No AI connection is set up",
  "chatStates4.connections.noneBody":
    "Your message is back in the composer. See the notice above it for how to connect a model.",
  "chatStates4.connections.chooseTitle": "Choose an AI connection",
  "chatStates4.connections.chooseBody":
    "Select the connection your expert should use before starting a new task.",
  "chatStates4.connections.changedTitle": "AI connections changed",
  "chatStates4.connections.changedBody":
    "The next task will use the available connection when it starts.",

  "chatStates4.turn.closedEarly": "The connection closed early.",
  "chatStates4.turn.chatUnavailable": "This chat is no longer available.",
  "chatStates4.turn.unreachable": "Couldn't reach the server (HTTP {status}).",
} as const;
