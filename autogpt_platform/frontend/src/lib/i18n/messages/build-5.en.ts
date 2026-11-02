export const Build5En = {
  "build5.graphContent.foundOne": "Found {count} node",
  "build5.graphContent.foundMany": "Found {count} nodes",
  "build5.graphContent.noMatch": "No nodes found matching your search",
  "build5.graphContent.startTyping": "Start typing to search nodes",
  "build5.searchBar.placeholder":
    "Search this workflow for blocks, inputs, outputs...",

  "build5.noSearchResult.title": "No match found",
  "build5.noSearchResult.body": "Try adjusting your search terms",

  "build5.readOnly.viewing":
    "You're viewing a read-only copy of this workflow.",
  "build5.readOnly.duplicateHint": "Duplicate it to make changes.",
  "build5.readOnly.libraryHint":
    "Add it to your library to enable duplication.",
  "build5.readOnly.duplicate": "Duplicate",
  "build5.readOnly.dismiss": "Dismiss",

  "build5.undoRedo.undo": "Undo",
  "build5.undoRedo.redo": "Redo",

  "build5.loadError.notFound": "Workflow not found",
  "build5.loadError.notAuthorized": "Not authorized to view this workflow",
  "build5.loadError.failed": "Failed to load workflow",
  "build5.loadError.unexpected": "An unexpected error occurred.",

  "build5.saveError.validationTitle": "Couldn't save your workflow",
  "build5.saveError.validationBody":
    "{message}. Fix the highlighted fields and save again.",
  "build5.saveError.title": "Error saving workflow",

  "build5.skipped.singleTitle": "A trigger preset needs reconfiguration",
  "build5.skipped.manyTitle": "Some trigger presets need reconfiguration",
  "build5.skipped.singleBody":
    "{names} was kept on its previous version because the new version uses a different trigger. Reconfigure its trigger on the new version to keep it running.",
  "build5.skipped.manyBody":
    "{names} were kept on their previous version because the new version uses a different trigger. Reconfigure their triggers on the new version to keep them running.",

  "build5.save.tooltip": "Save",
  "build5.save.name": "Name",
  "build5.save.namePlaceholder": "Enter your workflow name",
  "build5.save.description": "Description",
  "build5.save.descriptionPlaceholder": "Your workflow description",
  "build5.save.version": "Version",
  "build5.save.saveWorkflow": "Save Workflow",
  "build5.save.nameRequired": "Name is required",
  "build5.save.successTitle": "Workflow saved successfully",
  "build5.save.successBody": "The workflow has been saved successfully.",
  "build5.save.noChangesTitle": "No changes to save",
  "build5.save.noChangesBody":
    "The workflow is the same as the saved version.",
  "build5.duplicate.failedTitle": "Failed to duplicate workflow",
  "build5.duplicate.forkError":
    "The copy did not return a workflow to open.",
} as const;
