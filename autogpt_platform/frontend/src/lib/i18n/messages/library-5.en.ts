export const library5En = {
  "library5.prompt.idHint":
    " Use find_library_agent with the exact agent_id {id} to look it up.",

  "library5.prompt.error":
    'What happened with {name}? It says "{message}" — can you check the logs and tell me what to fix?',
  "library5.prompt.running":
    "Give me a status update on the {name} run — what has it found so far?",
  "library5.prompt.stale":
    "{name} hasn't run recently. Should I keep it or update and re-run it?",
  "library5.prompt.warning":
    '{name}\'s last run finished, but it says "{message}". Which step failed, why, and how do I fix it?',
  "library5.prompt.success":
    "Show me what {name} found in its last run — summarize the results and any key takeaways.",
  "library5.prompt.listening":
    "What is {name} listening for? Give me a summary of its trigger configuration.",
  "library5.prompt.scheduled": "When is {name} scheduled to run next?",
  "library5.prompt.idle":
    "{name} has been idle. Should I keep it or update and re-run it?",

  "library5.folderColor.blue": "Blue",
  "library5.folderColor.purple": "Purple",
  "library5.folderColor.green": "Green",
  "library5.folderColor.orange": "Orange",
  "library5.folderColor.pink": "Pink",

  "library5.folderCreate.created": "Folder created",
  "library5.folderCreate.createdBody":
    "Your folder has been created successfully.",
  "library5.folderCreate.failed": "Failed to create folder. Please try again.",
  "library5.folderCreate.title": "Create Folder",
  "library5.folderCreate.name": "Folder name",
  "library5.folderCreate.namePlaceholder": "Enter folder name",
  "library5.folderCreate.color": "Folder color",
  "library5.folderCreate.colorPlaceholder": "Select a color",

  "library5.folderDelete.deleted": "Folder deleted",
  "library5.folderDelete.deletedBody": '"{name}" has been deleted.',
  "library5.folderDelete.failed": "Failed to delete folder. Please try again.",
  "library5.folderDelete.title": "Delete folder",
  "library5.folderDelete.body":
    "Are you sure you want to delete “{name}”? Workflows inside this folder will be moved back to your library.",
  "library5.folderDelete.confirm": "Delete Folder",

  "library5.folderEdit.exists": "A folder with this name already exists",
  "library5.folderEdit.failed": "Failed to update folder. Please try again.",
  "library5.folderEdit.updated": "Folder updated",
  "library5.folderEdit.updatedBody":
    "Your folder has been updated successfully.",
  "library5.folderEdit.title": "Edit Folder",

  "library5.importDialog.title": "Import",
  "library5.importDialog.agentTab": "AutoGPT workflow",
  "library5.importDialog.platformTab": "Another platform",

  "library5.upload.title": "Upload Workflow",
  "library5.upload.workflowName": "Workflow name",
  "library5.upload.workflowDescription": "Workflow description",
  "library5.upload.workflowFile": "Workflow file",
  "library5.upload.uploading": "Uploading...",
  "library5.upload.upload": "Upload",
  "library5.upload.successTitle": "Success",
  "library5.upload.successBody": "Workflow uploaded successfully",
  "library5.upload.errorUploading": "Error Uploading workflow",
  "library5.upload.noWorkflow": "No workflow object to save",

  "library5.external.filePlaceholder":
    "Workflow file (n8n, Make.com, Zapier, ...)",
  "library5.external.importing": "Importing...",
  "library5.external.importToOtto": "Import to Otto",
  "library5.external.url": "Workflow URL",
  "library5.external.importFromUrl": "Import from URL",
  "library5.external.promptImport":
    "Import this workflow and recreate it as an AutoGPT workflow",
  "library5.external.uploadFailed": "Upload failed",
  "library5.external.couldNotUpload": "Could not upload the file.",
  "library5.external.couldNotFetch": "Could not fetch workflow",
  "library5.external.invalidJson": "Invalid JSON",
  "library5.external.invalidFile": "Invalid file",
  "library5.external.invalidJsonBody": "The uploaded file is not valid JSON.",
  "library5.external.couldNotRead": "Could not read the uploaded file.",

  "library5.search.label": "Search workflows",
  "library5.search.placeholder": "Search workflows",

  "library5.sort.hint": "sort by",
  "library5.sort.lastModified": "Last Modified",
  "library5.sort.createdAt": "Creation Date",
  "library5.sort.lastRun": "Last Run",

  "library5.move.moved": "Workflow moved",
  "library5.move.title": "Move to folder",
  "library5.move.search": "Search folders",
  "library5.move.searchPlaceholder": "Search folders...",

  "library5.status.running": "Running",
  "library5.status.listening": "Listening",
} as const;
