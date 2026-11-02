export const library3En = {
  "library3.actions.more": "More actions",

  "library3.scheduleActions.running": "Running...",
  "library3.scheduleActions.runNow": "Run now",
  "library3.scheduleActions.delete": "Delete schedule",

  "library3.taskActions.saveAsTemplate": "Save as template",
  "library3.taskActions.delete": "Delete task",

  "library3.editSchedule.repeatDaily": "Daily",
  "library3.editSchedule.repeatWeekly": "Weekly",
  "library3.editSchedule.daySun": "Su",
  "library3.editSchedule.dayMon": "Mo",
  "library3.editSchedule.dayTue": "Tu",
  "library3.editSchedule.dayWed": "We",
  "library3.editSchedule.dayThu": "Th",
  "library3.editSchedule.dayFri": "Fr",
  "library3.editSchedule.daySat": "Sa",
  "library3.editSchedule.updateFailed": "Failed to update schedule",
  "library3.editSchedule.pickOneDay": "Pick at least one day",

  "library3.common.name": "Name",
  "library3.common.description": "Description",
  "library3.common.yourInput": "Your Input",
  "library3.common.taskCredentials": "Task Credentials",
  "library3.common.saveChanges": "Save changes",
  "library3.common.delete": "Delete",
  "library3.common.notFound": "Not found",
  "library3.common.noDescription": "No description.",
  "library3.common.error": "Error",
  "library3.common.openInBuilder": "Open in builder",

  "library3.sidebar.tasksTab": "Tasks",
  "library3.sidebar.scheduledTab": "Scheduled",
  "library3.sidebar.triggersTab": "Triggers",
  "library3.sidebar.templatesTab": "Templates",
  "library3.sidebar.noScheduled": "No scheduled workflows",
  "library3.sidebar.webhookTriggers": "Webhook Triggers",
  "library3.sidebar.triggerWorkflows": "Trigger Workflows",
  "library3.sidebar.noTriggers": "No triggers set up",
  "library3.sidebar.noTriggersHint":
    'Ask an expert to set up a trigger for this workflow (e.g. "run this when a new email arrives").',
  "library3.sidebar.noTemplates": "No templates saved",

  "library3.scheduleActions.viewDetails": "View scheduled task details",
  "library3.scheduleActions.notLoaded": "Schedule not loaded",
  "library3.scheduleActions.waitForLoad":
    "Please wait for the schedule to load.",

  "library3.templateView.loadFailed": "Failed to load template",
  "library3.templateView.trigger": "Trigger",
  "library3.templateView.template": "Template",
  "library3.templateView.details": "{kind} Details",
  "library3.templateView.namePlaceholder": "Enter {kind} name",
  "library3.templateView.descriptionPlaceholder": "Enter {kind} description",
  "library3.templateView.updated": "Template updated",
  "library3.templateView.updateFailed": "Failed to update template",
  "library3.templateView.started": "Task started",
  "library3.templateView.startFailed": "Failed to start task",

  "library3.templateActions.deleted": "Template deleted",
  "library3.templateActions.deleteFailed": "Failed to delete template",
  "library3.templateActions.start": "Start task from template",
  "library3.templateActions.delete": "Delete template",
  "library3.templateActions.deleteBody":
    "Are you sure you want to delete this template? This action cannot be undone.",

  "library3.triggerAgent.loadFailed": "Failed to load trigger data",
  "library3.triggerAgent.notFoundBody":
    "This trigger workflow no longer exists.",
  "library3.triggerAgent.descriptionNote":
    "Trigger workflows run on a schedule and execute this workflow when their conditions are met. Edit them in the builder to change what they do.",
  "library3.triggerAgent.versionWarn":
    "This schedule is running version {current} of the trigger workflow, but the latest version is {latest}. Ask your expert to recreate the schedule to pick up your latest edits.",
  "library3.triggerAgent.noSchedule":
    "No schedule configured for this trigger workflow.",
  "library3.triggerAgent.viewInLibrary": "View in library",
  "library3.triggerAgent.remove": "Remove trigger",

  "library3.triggerView.loadFailed": "Failed to load trigger",
  "library3.triggerView.details": "Trigger Details",
  "library3.triggerView.namePlaceholder": "Enter trigger name",
  "library3.triggerView.descriptionPlaceholder": "Enter trigger description",
  "library3.triggerView.updated": "Trigger updated",
  "library3.triggerView.updateFailed": "Failed to update trigger",

  "library3.triggerActions.deleted": "Trigger deleted",
  "library3.triggerActions.deleteFailed": "Failed to delete trigger",
  "library3.triggerActions.delete": "Delete trigger",
  "library3.triggerActions.deleteBody":
    "Are you sure you want to delete this trigger? This action cannot be undone.",

  "library3.share.title": "Share Workflow Run",
  "library3.share.aria": "Share results",
  "library3.share.sharedBody":
    "Your workflow run is currently shared. Anyone with the link can view the output.",
  "library3.share.generateBody":
    "Generate a public link to share this workflow run output with others.",
  "library3.share.warning":
    "When you enable sharing, the output of this workflow run will be publicly accessible to anyone with the link. The page will include a noindex directive to discourage search engine crawling, but this cannot be guaranteed.",
  "library3.share.enable": "Enable Sharing",
  "library3.share.url": "Share URL",
  "library3.share.publicNote":
    "This link is publicly accessible. Only share it with people you trust. The shared page includes noindex directives to discourage search engines.",
  "library3.share.stop": "Stop Sharing",
  "library3.share.enabledTitle": "Sharing enabled",
  "library3.share.enabledBody":
    "Your workflow run is now publicly accessible via the share link.",
  "library3.share.enableFailed": "Failed to enable sharing. Please try again.",
  "library3.share.disabledTitle": "Sharing disabled",
  "library3.share.disabledBody": "The share link is no longer accessible.",
  "library3.share.disableFailed":
    "Failed to disable sharing. Please try again.",
  "library3.share.copiedTitle": "Copied!",
  "library3.share.copiedBody": "Share link copied to clipboard.",
  "library3.share.copyFailed": "Failed to copy link. Please try again.",
} as const;
