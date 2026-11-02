export const build1En = {
  "build1.publish.tooltip": "Publish to Marketplace",

  "build1.intro.title": "Create your own workflows.",
  "build1.intro.body":
    "Wire blocks into a workflow that runs exactly how you want — or let Otto build it.",
  "build1.intro.cta": "Ask Otto to build it",
  "build1.intro.altAction": "Learn to build it yourself",

  "build1.outputs.defaultName": "Output",
  "build1.outputs.description": "Output from the workflow",
  "build1.outputs.header": "Workflow Outputs",
  "build1.outputs.unnamed": "Unnamed Output",
  "build1.outputs.none": "No output blocks available.",

  "build1.cron.nameLabel": "Schedule Name",
  "build1.cron.namePlaceholder": "Enter schedule name",
  "build1.cron.creating": "Creating schedule...",
  "build1.cron.done": "Done",
  "build1.cron.created": "Schedule created",
  "build1.cron.createdBody": "Schedule created successfully",
  "build1.cron.failed": "Failed to create schedule",
  "build1.cron.nameRequiredError": "Schedule name is required",
  "build1.cron.invalid": "Invalid schedule",
  "build1.cron.nameRequiredBody": "Please enter a schedule name",
  "build1.cron.cronInvalid": "Please enter a valid cron expression",

  "build1.run.validationFailed": "Workflow validation failed",
  "build1.run.fixValidation":
    "Please fix the validation errors on the highlighted nodes and try again.",
  "build1.runInput.runTitle": "Run Workflow",
  "build1.runInput.scheduleTitle": "Schedule Run",
  "build1.runInput.errorRunning": "Error running workflow",
  "build1.schedule.title": "Schedule Workflow",

  "build1.chat.startFailed": "Could not start the builder chat",
  "build1.chat.blankFailed": "Could not create a blank workflow",
  "build1.chat.checkFailed": "Could not check the AI connection",
  "build1.chat.placeholder": "Ask the builder to edit or run this workflow…",
  "build1.chat.startFailedBody":
    "Please retry or close and reopen the chat panel.",
  "build1.chat.tryAgain": "Please try again.",
  "build1.chat.reverted": "Reverted to the previous version",
  "build1.chat.revertedBody": "Now viewing version {version}.",
  "build1.chat.revertFailed": "Revert failed",

  "build1.noModel.aria": "No AI connection",
  "build1.noModel.body":
    "No AI model is connected, so the builder chat can't answer yet. Whoever runs this server can add a model API key or a local model",
  "build1.noModel.setupGuide": "(setup guide)",

  "build1.panelHeader.revertToVersion": "Revert to version {version}",
  "build1.panelHeader.revertPrev": "Revert to previous version",
  "build1.panelHeader.revertTooltip":
    "Revert to the workflow version that was active before the last edit",

  "build1.draft.block": "block",
  "build1.draft.blocks": "blocks",
  "build1.draft.connections": "connections",
  "build1.draft.restore": "Restore changes",
  "build1.draft.discard": "Discard changes",

  "build1.safeMode.on": "ON",
  "build1.safeMode.off": "OFF",
  "build1.safeMode.hitlLabel": "Human in the loop block approval",
  "build1.safeMode.hitlEnabled":
    "The workflow will pause at human-in-the-loop blocks and wait for your approval",
  "build1.safeMode.hitlDisabled":
    "Human in the loop blocks will proceed automatically",
  "build1.safeMode.sensitiveLabel": "Sensitive actions blocks approval",
  "build1.safeMode.sensitiveEnabled":
    "The workflow will pause at sensitive action blocks and wait for your approval",
  "build1.safeMode.sensitiveDisabled":
    "Sensitive action blocks will proceed automatically",

  "build1.controls.zoomIn": "Zoom In",
  "build1.controls.zoomOut": "Zoom Out",
  "build1.controls.loadingTutorial": "Loading Tutorial...",
  "build1.controls.startTutorial": "Start Tutorial",
  "build1.controls.fitView": "Fit View",
  "build1.controls.readOnlyLock":
    "Canvas is locked because this is a read-only workflow",
  "build1.controls.toggleLock": "Toggle Lock",

  "build1.triggerBanner.title": "You are building a Trigger Workflow",
  "build1.triggerBanner.body":
    "Your workflow will listen for its trigger and will run when the time is right.",
  "build1.triggerBanner.library": "Workflow Library",

  "build1.copyPaste.copied": "Copied successfully",
  "build1.copyPaste.copiedBody": "{count} node(s) copied to clipboard",
  "build1.draft.connection": "connection",
} as const;
