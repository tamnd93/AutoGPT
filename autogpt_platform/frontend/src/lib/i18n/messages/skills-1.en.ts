export const Skills1En = {
  "skills1.publish.aria": "Publish skill to marketplace",
  "skills1.publish.title": "Publish to marketplace",
  "skills1.publish.submitted":
    "Submitted for review. Your skill appears in the marketplace once it is approved; what you published is a copy, so editing it here changes nothing until you publish again.",
  "skills1.publish.introPrefix": "Publishing sends a copy of",
  "skills1.publish.introSuffix":
    " for review. Say where it belongs and what it expects to be connected.",
  "skills1.publish.category": "Category",
  "skills1.publish.categoryPlaceholder": "Pick a category",
  "skills1.publish.worksWith": "Works with",
  "skills1.publish.worksWithHint":
    "Integrations your instructions assume. Installers see these and connect them when they first need one.",
  "skills1.publish.integrationsAria": "Integrations this skill works with",
  "skills1.publish.submit": "Submit for review",
  "skills1.publish.toastFailed": "Couldn't publish this skill",
  "skills1.publish.tryAgain": "Please try again.",

  "skills1.upload.button": "Upload skill",
  "skills1.upload.tooltip":
    "Import a SKILL.md, or a zipped skill package",
  "skills1.uploadError.noFrontmatter":
    "File is not a valid SKILL.md — expected YAML frontmatter (---) with a name and description.",
  "skills1.uploadError.missingFields":
    "File is not a valid SKILL.md — frontmatter must include a non-empty name and description.",
  "skills1.uploadError.tooLong":
    "Description is {length}/{max} characters — trim at least {over}. It appears in the copilot's per-turn skills index, so it's kept short.",
  "skills1.empty.title": "No skills yet",
  "skills1.empty.bodyPrefix":
    "Give your experts a repeatable process to follow. Select",
  "skills1.empty.newSkill": "New skill",
  "skills1.empty.bodyMid": " to create one in chat, or",
  "skills1.empty.uploadSkill": "Upload skill",
  "skills1.empty.bodySuffix": " to import one you've saved.",
  "skills1.fileList.executable": "executable",
  "skills1.viewer.tooLarge": "This file is too large to preview here.",
  "skills1.viewer.notText":
    "This file isn't text, so it can't be previewed.",
  "skills1.viewer.loadFailed": "Couldn't load this file.",
  "skills1.panel.heading": "Skills",
  "skills1.panel.description":
    "Reusable playbooks your experts follow. Review your skills, import a new one, or delete one you no longer need.",
  "skills1.panel.newSkill": "New skill",
  "skills1.panel.newTooltip": "Create a new skill in chat",
  "skills1.panel.loadFailed": "Failed to load skills",
  "skills1.panel.listAria": "Skills",
  "skills1.item.noBody": "(no body)",
  "skills1.item.packageFiles": "Package files ({count}):",
  "skills1.item.deleteTitle": "Delete skill",
  "skills1.item.deleteBodyPrefix": "Delete the skill",
  "skills1.item.deleteBodySuffix":
    " from your library? You can create or upload it again later if needed.",
  "skills1.item.keepIt": "Keep it",
  "skills1.item.yesDelete": "Yes, delete",
  "skills1.item.loadSkillFailed": "Failed to load skill (HTTP {status})",
  "skills1.item.downloadSkillFailed":
    "Failed to download skill (HTTP {status})",
  "skills1.item.downloadFailed": "Failed to download skill",
  "skills1.item.skillDeleted": "Skill deleted",
  "skills1.item.deleteFailed": "Failed to delete skill",

  "skills1.upload.uploaded": 'Skill "{name}" uploaded',
  "skills1.upload.toastFailed": "Failed to upload skill",
  "skills1.upload.cannotUpload": "Can't upload this skill",
} as const;
