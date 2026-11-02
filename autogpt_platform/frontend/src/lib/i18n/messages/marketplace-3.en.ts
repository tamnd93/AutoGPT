export const marketplace3En = {
  "marketplace3.edit.title": "Edit submission",
  "marketplace3.edit.updateNote": "Update note",
  "marketplace3.edit.updateNoteBody":
    "Reviewers use this to understand why this submission was edited.",
  "marketplace3.edit.whatChanged": "What changed?",
  "marketplace3.edit.whatChangedTooltip":
    "Summary of what's new or improved in this version. Reviewers see this first.",
  "marketplace3.edit.whatChangedPlaceholder":
    "Briefly describe what you changed",
  "marketplace3.edit.listingBasics": "Listing basics",
  "marketplace3.edit.titleLabel": "Title",
  "marketplace3.edit.titleTooltip":
    "Public name shown on the marketplace listing.",
  "marketplace3.edit.titlePlaceholder": "Workflow name",
  "marketplace3.edit.tagline": "Tagline",
  "marketplace3.edit.taglineTooltip":
    "The one-line subtitle shown under the workflow name and on preview cards. Start with a verb and name the outcome for the user.",
  "marketplace3.edit.taglinePlaceholder":
    "Find decision-makers at any company in seconds",
  "marketplace3.edit.category": "Category",
  "marketplace3.edit.categoryTooltip":
    "Primary category that helps users discover the workflow.",
  "marketplace3.edit.thumbnails": "Thumbnails",
  "marketplace3.edit.experience": "Experience details",
  "marketplace3.edit.description": "Description",
  "marketplace3.edit.descriptionTooltip":
    "What the workflow does and the outcome users get.",
  "marketplace3.edit.descriptionPlaceholder":
    "Describe the outcome this workflow creates",
  "marketplace3.edit.youtube": "YouTube video link",
  "marketplace3.edit.youtubeTooltip":
    "Demo or walkthrough video hosted on YouTube.",
  "marketplace3.edit.youtubePlaceholder": "https://youtube.com/watch?v=...",
  "marketplace3.edit.outputDemo": "Output demo",
  "marketplace3.edit.outputDemoTooltip":
    "Link showing example output the workflow produces.",
  "marketplace3.edit.cancel": "Cancel",
  "marketplace3.edit.saving": "Saving",
  "marketplace3.edit.updateSubmission": "Update submission",
  "marketplace3.edit.updatedTitle": "Workflow Updated",
  "marketplace3.edit.updatedBody":
    "Your workflow submission has been updated successfully.",
  "marketplace3.edit.errorTitle": "Edit Workflow Error",
  "marketplace3.edit.errorBody":
    "An error occurred while editing the workflow. Please try again.",
  "marketplace3.edit.failedUpdate": "Failed to update submission",
  "marketplace3.edit.imageRequired": "At least one image is required",

  "marketplace3.zod.titleRequired": "Title is required",
  "marketplace3.zod.titleTooLong": "Title must be less than 100 characters",
  "marketplace3.zod.taglineRequired": "Tagline is required",
  "marketplace3.zod.taglineTooLong": "Tagline must be {max} characters or less",
  "marketplace3.zod.slugRequired": "Slug is required",
  "marketplace3.zod.slugTooLong": "Slug must be less than 50 characters",
  "marketplace3.zod.slugFormat":
    "Slug can only contain lowercase letters, numbers, and hyphens",
  "marketplace3.zod.youtubeInvalid": "Please enter a valid YouTube URL",
  "marketplace3.zod.categoryRequired": "Category is required",
  "marketplace3.zod.descriptionRequired": "Description is required",
  "marketplace3.zod.descriptionTooLong":
    "Description must be less than 1000 characters",
  "marketplace3.zod.changesRequired": "Changes summary is required for updates",
  "marketplace3.zod.changesTooLong":
    "Changes summary must be less than 500 characters",
  "marketplace3.zod.instructionsTooLong":
    "Instructions must be less than 2000 characters",

  "marketplace3.publish.title": "Publish Workflow",
  "marketplace3.publish.button": "Publish Workflow",
  "marketplace3.publish.selectionRequiredTitle": "Workflow Selection Required",
  "marketplace3.publish.selectionRequiredBody":
    "Please select a workflow before submitting to the store.",
  "marketplace3.publish.submitErrorTitle": "Submit Workflow Error",
  "marketplace3.publish.submitErrorBody":
    "An error occurred while submitting the workflow. Please try again.",
  "marketplace3.publish.planPublishing": "Publishing needs an active plan",
  "marketplace3.publish.planUploading": "Uploading images needs an active plan",
  "marketplace3.publish.planGenerating":
    "Generating an image needs an active plan",
  "marketplace3.publish.buildListing": "Build the store listing",
  "marketplace3.publish.buildListingBody":
    "Write a bit of details about your workflow so reviewers and users know what to expect.",
  "marketplace3.publish.describeUpdate": "Describe the update",
  "marketplace3.publish.describeUpdateBody":
    "Explain what changed, then adjust any listing details that need to move with this version.",
  "marketplace3.publish.updateNoteBody":
    "Reviewers use this to understand why the marketplace listing needs a new version.",
  "marketplace3.publish.slug": "Slug",
  "marketplace3.publish.slugTooltip":
    "URL-friendly identifier used in the marketplace path. Lowercase letters, numbers, hyphens only.",
  "marketplace3.publish.slugPlaceholder": "URL-friendly name",
  "marketplace3.publish.instructions": "Instructions",
  "marketplace3.publish.instructionsTooltip":
    "Steps users should follow to set up and run the workflow.",
  "marketplace3.publish.instructionsPlaceholder":
    "Explain inputs, setup, and what to expect after a run",
  "marketplace3.publish.recommendedSchedule": "Recommended schedule",
  "marketplace3.publish.recommendedScheduleTooltip":
    "Suggested cron schedule users can run the workflow on. Sets a run cadence for recurring use cases.",
  "marketplace3.publish.setSchedule": "Set schedule",
  "marketplace3.publish.recommendedScheduleTitle": "Recommended Schedule",
  "marketplace3.publish.back": "Back",
  "marketplace3.publish.submitting": "Submitting",
  "marketplace3.publish.submitForReview": "Submit for review",

  "marketplace3.thumbnails.media": "Media",
  "marketplace3.thumbnails.count": "{count}/5 images",
  "marketplace3.thumbnails.explainer":
    "The selected image is submitted first and appears as the marketplace thumbnail.",
  "marketplace3.thumbnails.uploading": "Uploading",
  "marketplace3.thumbnails.addImage": "Add image",
  "marketplace3.thumbnails.generating": "Generating",
  "marketplace3.thumbnails.generate": "Generate",
  "marketplace3.thumbnails.maxReached": "Max images reached",
  "marketplace3.thumbnails.selectAria": "Select thumbnail {index}",
  "marketplace3.thumbnails.alt": "Thumbnail {index}",
  "marketplace3.thumbnails.removeAria": "Remove image {index}",
  "marketplace3.thumbnails.thumbnailLabel": "Thumbnail",
  "marketplace3.thumbnails.uploadFailed": "Upload failed",
  "marketplace3.thumbnails.tryAgain": "Please try again.",
  "marketplace3.thumbnails.generateFailed": "Generation failed",
  "marketplace3.thumbnails.generateFailedBody":
    "Failed to generate image. Please try again.",
  "marketplace3.thumbnails.workflowIdRequired": "Workflow ID is required",
} as const;
