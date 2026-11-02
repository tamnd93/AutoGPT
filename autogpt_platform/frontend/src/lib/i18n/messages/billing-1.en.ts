export const billing1En = {
  "billing1.title.recovery": "Your plan",
  "billing1.title.choose": "Choose your plan",
  "billing1.logout": "Log out",
  "billing1.recoveryFallback":
    "Update your payment method in billing to continue. Your chats, workflows and results are saved.",
  "billing1.unavailable":
    "Subscriptions are temporarily unavailable. Please try again shortly.",
  "billing1.retry": "Retry",
  "billing1.backToBilling": "Back to billing",
  "billing1.checkout.failedTitle": "Couldn't start checkout",
  "billing1.checkout.failedDescription":
    "Stripe didn't accept the request. Please try again.",
  "billing1.switch.title": "Switch to {tier}?",
  "billing1.switch.confirm": "Switch to {tier}",
  "billing1.switch.body":
    "Your current Stripe subscription will be modified — you may be charged or refunded the prorated difference. Continue?",

  "billing1.header.title": "Choose a plan to keep working",
  "billing1.header.body": "Your chats, workflows and files are saved.",
  "billing1.header.demo": "Explore a quick demo",

  "billing1.choices.sectionAria": "Choose your AutoGPT plan",
  "billing1.choices.periodAria": "Billing period",
  "billing1.choices.monthly": "Monthly",
  "billing1.choices.yearly": "Yearly",
  "billing1.choices.save": "Save {percent}%",
  "billing1.choices.team": "Team",
  "billing1.choices.teamBody": "Custom capacity for your organization.",
  "billing1.choices.talkToSales": "Talk to sales",
  "billing1.choices.footnote":
    "Your conversations and workflows stay saved. Cancel anytime.",
  "billing1.choices.planAria": "{name} plan",
  "billing1.choices.proTagline": "For the work you do every day.",
  "billing1.choices.maxTagline": "For bigger ideas and heavier work.",
  "billing1.choices.proFeature1":
    "Experts for content, sales and research, with Otto coordinating",
  "billing1.choices.proFeature2":
    "Workflows that keep working in the background on a schedule",
  "billing1.choices.maxUsage": "{usage} times the usage of Pro",
  "billing1.choices.maxFeature": "More usage for demanding work",
  "billing1.choices.storage": "More file storage and priority support",
  "billing1.choices.unavailablePrice": "Unavailable",
  "billing1.choices.perYear": "year",
  "billing1.choices.perMonth": "month",
  "billing1.choices.start": "Start {name}",

  "billing1.helpers.pausedOne":
    "Your scheduled workflow is paused until you subscribe.",
  "billing1.helpers.pausedMany":
    "Your {count} scheduled workflows are paused until you subscribe.",
  "billing1.helpers.reset": "Resets",
  "billing1.helpers.resetIn": "Resets in",
  "billing1.helpers.soon": "soon",

  "billing1.autoRefill.title": "Auto-refill",
  "billing1.autoRefill.enabledBody":
    "Refills ${amount} when balance drops below ${threshold}.",
  "billing1.autoRefill.disabledBody":
    "Top up automatically when your balance gets low.",
  "billing1.autoRefill.edit": "Edit",
  "billing1.autoRefill.setUp": "Set up auto-refill",
  "billing1.autoRefill.dialogBody":
    "Top up your balance automatically when it dips below the threshold you set.",
  "billing1.autoRefill.thresholdLabel": "When balance goes below:",
  "billing1.autoRefill.amountLabel": "Automatically refill with:",
  "billing1.autoRefill.warning":
    "As a safety mechanism, auto-refill will only trigger once per task. Keep this in mind when budgeting to ensure your balance does not hit zero and your tasks don't pause mid-run.",
  "billing1.autoRefill.disable": "Disable",
  "billing1.autoRefill.cancel": "Cancel",
  "billing1.autoRefill.saveChanges": "Save changes",
  "billing1.autoRefill.enable": "Enable Auto-Refill",
  "billing1.autoRefill.minPlaceholder": "min $5",
  "billing1.autoRefill.saveFailedTitle": "Couldn't save auto top-up",
  "billing1.autoRefill.saveFailedBody":
    "Auto top-up settings weren't saved. Please try again.",
  "billing1.autoRefill.disableFailedTitle": "Couldn't disable auto top-up",
  "billing1.autoRefill.disableFailedBody":
    "Auto top-up couldn't be disabled. Please try again.",

  "billing1.balance.title": "Automation credits",
  "billing1.balance.explainer":
    "Automation Credits are platform credits used for automation executions. They are not cash, cannot be withdrawn, and cannot be exchanged for subscription fees.",
  "billing1.balance.errorContext": "balance",
  "billing1.balance.errorHint": "We couldn't load your credit balance.",
  "billing1.balance.addTitle": "Add credits",
  "billing1.balance.addButton": "Add credits",
  "billing1.balance.stripeNote":
    "We'll redirect you to Stripe to complete your purchase.",
  "billing1.balance.amountLabel":
    "Amount (USD, whole dollars only, minimum $5)",
  "billing1.balance.amountPlaceholder": "Amount",
  "billing1.balance.cancel": "Cancel",
  "billing1.balance.continue": "Continue to checkout",
  "billing1.balance.serverReturned": "Server returned {status}.",
  "billing1.balance.noCheckoutUrl":
    "Stripe didn't return a checkout URL. Check backend logs for the underlying Stripe error.",
  "billing1.balance.checkoutFailedTitle": "Couldn't start checkout",
  "billing1.balance.checkoutFailedBody":
    "Something went wrong contacting Stripe. Please try again.",

  "billing1.history.aria": "Transaction history",
  "billing1.history.title": "Transaction history",
  "billing1.history.subtitle": "Changes to your automation credit balance.",
  "billing1.history.currencyNote": "USD · Your local time",
  "billing1.history.errorContext": "transaction history",
  "billing1.history.errorHint":
    "We couldn’t load your transactions. Please try again.",
  "billing1.history.refreshError":
    "History couldn’t be refreshed. Showing previously loaded activity.",
  "billing1.history.tryAgain": "Try again",
  "billing1.history.footnote":
    "Each workflow run combines its recorded charges and adjustments. Only runs with credit activity appear here.",
  "billing1.history.loadingAria": "Loading transaction history",
  "billing1.history.emptyTitle": "No transactions yet.",
  "billing1.history.emptyBody":
    "Credit purchases and paid activity will appear here.",
  "billing1.history.dateUnavailable": "Unavailable",
  "billing1.history.dateUnavailableFull": "Date unavailable",
  "billing1.history.workflowUnavailable": "Workflow unavailable",
  "billing1.history.expertToolUse": "Expert tool use",
  "billing1.history.directBlockUsage": "Direct block usage",
  "billing1.history.creditUsage": "Credit usage",
  "billing1.history.balanceChange": "Credit balance change",
  "billing1.history.partOf": "Part of {name}",
  "billing1.history.workflowRun": "Workflow run",
  "billing1.history.paidBlockTools": "Paid block tools",
  "billing1.history.outsideWorkflowRun": "Outside a workflow run",
  "billing1.history.creditPurchase": "Credit purchase",
  "billing1.history.creditPurchaseRefunded": "Credit purchase refunded",
  "billing1.history.paidFromBalance": "Paid from credit balance",
  "billing1.history.creditBalance": "Credit balance",
  "billing1.history.unavailable": "Unavailable",
  "billing1.history.name.topUp": "Credits added",
  "billing1.history.name.grant": "Credits granted",
  "billing1.history.name.refund": "Top-up refunded",
  "billing1.history.name.subscription": "Subscription payment",
  "billing1.history.name.cardCheck": "Card verification",
  "billing1.history.status.queued": "Queued",
  "billing1.history.status.running": "Running",
  "billing1.history.status.review": "Needs review",
  "billing1.history.status.incomplete": "Incomplete",
  "billing1.history.status.completed": "Completed",
  "billing1.history.status.failed": "Failed",
  "billing1.history.status.terminated": "Stopped",
  "billing1.history.receipt.runActive":
    "This run is still active. Charges and adjustments may continue.",
  "billing1.history.receipt.noNetChange":
    "No net change to your credit balance.",
  "billing1.history.receipt.runRecorded":
    "Recorded charges and adjustments for this run.",
  "billing1.history.receipt.copilotTools":
    "Paid block tools across this conversation. Subscription usage is tracked separately.",
  "billing1.history.receipt.blockUsage":
    "A paid block call without an associated workflow run.",
  "billing1.history.receipt.refunded":
    "Credits removed from your balance after the payment was refunded.",
  "billing1.history.receipt.subscription":
    "This payment was taken from your credit balance.",
  "billing1.history.receipt.noChange": "No change to your credit balance.",
  "billing1.history.charge.usage": "Block usage",
  "billing1.history.charge.executionFee": "Execution fee",
  "billing1.history.charge.adjustment": "Usage adjustment",
  "billing1.history.charge.transaction": "Balance change",
  "billing1.history.charge.fallback": "Balance change",

  "billing1.table.aria": "Automation credit transactions",
  "billing1.table.activity": "Activity",
  "billing1.table.lastActivity": "Last activity",
  "billing1.table.amount": "Amount",
  "billing1.table.details": "Details",
  "billing1.table.latestFirst": "Latest charges and credits first",
  "billing1.table.retryLoadMore": "Retry loading more",
  "billing1.table.loadMore": "Load more",
  "billing1.table.endOfHistory": "End of history",
  "billing1.table.loadMoreError":
    "We couldn’t load older transactions. Your loaded history is still available.",
  "billing1.table.loadingMore": "Loading older transactions",
  "billing1.table.loadedCount": "{count} transactions loaded",

  "billing1.receipt.blockUsage": "Block usage",
  "billing1.receipt.executionFees": "Execution fees",
  "billing1.receipt.usageAdjustment": "Usage adjustment",
  "billing1.receipt.netChangeSoFar": "Net change so far",
  "billing1.receipt.netChange": "Net change",
  "billing1.receipt.aria": "{name} credit receipt",
  "billing1.receipt.chargesForRun": "Charges for this run",
  "billing1.receipt.chargesForRunOnly": "Charges for this run only",
  "billing1.receipt.toolUsage": "Tool usage in this conversation",
  "billing1.receipt.balanceChange": "Credit balance change",

  "billing1.entries.hide": "Hide charge entries",
  "billing1.entries.show": "Show charge entries",
  "billing1.entries.hideReference": "Hide reference",
  "billing1.entries.showReference": "Reference",
  "billing1.entries.runId": "Run ID",
  "billing1.entries.chatId": "Chat ID",
  "billing1.entries.reference": "Reference",
  "billing1.entries.aria": "Recorded charge entries",
  "billing1.entries.dateTime": "Date and time",
  "billing1.entries.charge": "Charge",
  "billing1.entries.amount": "Amount",
  "billing1.entries.truncated":
    "Showing {shown} of {total} charge entries. The total includes every charge and adjustment.",

  "billing1.metadata.runStatus": "Run status",
  "billing1.metadata.started": "Started",
  "billing1.metadata.version": "Version",
  "billing1.metadata.lastActivity": "Last activity",
  "billing1.metadata.creditsAsOf": "Credits as of",
  "billing1.metadata.viewTask": "View task",
  "billing1.metadata.viewConversation": "View conversation",
  "billing1.metadata.runUnavailable": "Run unavailable",
  "billing1.metadata.notInLibrary": "Not in your library",
  "billing1.metadata.workflowRunUnavailable": "Workflow and run unavailable",
  "billing1.metadata.conversationUnavailable": "Conversation unavailable",

  "billing1.relations.startedBy": "Started by",
  "billing1.relations.otherWorkflows": "Other workflows used by this run",
  "billing1.relations.note":
    "Any credit charges for related runs appear separately.",
  "billing1.relations.noteSuffix":
    " The task page includes related runs in its total.",
  "billing1.relations.moreHidden": "More related runs are not shown here.",

  "billing1.row.soFar": "so far",
  "billing1.row.openDetails": "Open details for {name}, {date} at {time}",
  "billing1.row.closeDetails": "Close details for {name}, {date} at {time}",
  "billing1.row.details": "Details",

  "billing1.usage.title": "Usage",
  "billing1.usage.runs": "· {runs} runs",
  "billing1.usage.last30": "Last 30 days",
  "billing1.usage.barEmptyAria": "{date}: $0.00, 0 runs",
  "billing1.usage.barAria": "{date}: ${amount}, {runs} runs",

  "billing1.apUsage.aria": "Usage",
  "billing1.apUsage.title": "Usage",
  "billing1.apUsage.noLimit": "No usage limit",
  "billing1.apUsage.choosePlan": "Choose a plan to keep working",
  "billing1.apUsage.noLimitBody":
    "Your plan has no daily or weekly usage limits.",
  "billing1.apUsage.choosePlanBody":
    "Choose a plan to continue working with your saved conversations and workflows.",
  "billing1.apUsage.lifetimeTitle": "One allowance for your whole trial",
  "billing1.apUsage.lifetimeBody":
    "This allowance lasts for your whole trial. It doesn’t refresh each day or week.",
  "billing1.apUsage.workSaved": "Your work stays saved.",
  "billing1.apUsage.allowanceNote":
    "Bigger requests use more of your allowance. Hitting the limit never adds a charge.",
  "billing1.apUsage.used": "used",
  "billing1.apUsage.usedAria": "{percent}% used",
  "billing1.apUsage.progressAria": "{label} usage",
  "billing1.apUsage.today": "Today",
  "billing1.apUsage.thisWeek": "This week",
  "billing1.apUsage.trialUsage": "Trial usage",
  "billing1.apUsage.trialEnds": "Trial ends",
  "billing1.apUsage.reached": "Allowance reached",
  "billing1.apUsage.low": "Running low",
  "billing1.apUsage.plenty": "Plenty left",

  "billing1.usageUnavailable.errorTitle": "We couldn’t load your usage",
  "billing1.usageUnavailable.errorBody":
    "Your plan and your work aren’t affected. Try again in a moment.",
  "billing1.usageUnavailable.tryAgain": "Try again",
  "billing1.usageUnavailable.contactSupport": "Contact support",
} as const;
