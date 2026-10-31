# Spec: OpenCode as a first-class AI connection (per-user API key)

**Status:** approved by the human partner; implementation follows the plan in
`docs/superpowers/plans/2026-10-31-opencode-ai-connection.md`.

## Problem

On a self-hosted AutoGPT every chat turn runs on the model provider the server
operator configured through environment variables. A user who already pays for
an **OpenCode** subscription (Go or pay-as-you-go) has no way to use it: the
frontend offers only ChatGPT / Microsoft 365 Copilot connections, and the
self-hosted route is not something a non-technical user can change.

## Outcome

A user opens **Settings → Integrations → AI subscriptions**, finds an
**OpenCode** box next to ChatGPT, pastes the API key they copied from the
OpenCode Console, and can immediately choose OpenCode as the connection new
chats start on (and per conversation in the composer). Turns on that connection
run on OpenCode's Anthropic-compatible gateway and spend no AutoGPT credits.

## User-facing details

- Box label: **OpenCode**. Dialog: title "OpenCode", one password field
  ("API key", hint `oc_sk_...`), link "Where to get a key" → the OpenCode docs,
  primary button "Connect".
- After connecting, the connection row says "Connected", shows
  "Your OpenCode plan", and lists the two tiers from configuration.
- Disconnect from the row's Manage dialog: shows the connected key masked and a
  Delete action using the existing delete-integration flow.
- Copy rules from `AGENTS.md` apply: the work runs on Otto and workflows; no
  visible "agent"/"graph" wording.

## Architecture

- **Credential** is an ordinary `APIKeyCredentials` with `provider="opencode"`,
  created through the existing generic endpoint
  `POST /api/integrations/opencode/credentials` and therefore stored encrypted
  by `IntegrationCredentialsManager`. No schema change.
- **Connection** is a new `CopilotLlmAuthProvider` value `"opencode"`, listed by
  `copilot/transports.py` while the user holds a valid OpenCode credential, and
  described by `copilot/offers.py`.
- **Routing**: `processor.py` accepts the provider only for SDK turns, leases
  the credential, and hands it to `stream_chat_completion_sdk`. The SDK path is
  generalized from "codex" to "BYOK" (`is_byok_transport`); the Codex gateway
  stays Codex-only, and OpenCode instead receives its gateway URL and token in
  `build_sdk_env`.
- **Configuration** (server, env-overridable, no UI):
  - `OPENCODE_BASE_URL` default `https://opencode.ai/inference/go/anthropic`
  - `OPENCODE_STANDARD_MODEL` default `claude-haiku-5-5`
  - `OPENCODE_ADVANCED_MODEL` default `claude-haiku-5-5`
- **Billing**: BYOK. Turns are not billed to AutoGPT credits and have no turn
  budget cap; usage is persisted with provider `opencode`, cost unknown
  (`cost_usd=None`), like the ChatGPT route.

## Security

- The key is encrypted at rest by the existing credential store, never returned
  by the API (listed as a secret), and never logged. The CLI stderr redaction in
  `sdk/service.py` must include it exactly as it includes the Codex gateway
  token.
- Only the owning user's credential can be routed to: session creation and
  default-route saving both resolve through the user's transport list.

## Failure modes the implementation must survive

1. Empty/whitespace key → dialog refuses locally, backend rejects with 4xx
   (pydantic), no credential stored.
2. Revoked/invalid key at turn time → turn ends with a StreamError, not a crash
   or an unredacted key in the log.
3. Credential deleted while it is the saved default → next chat falls back to
   the automatic default (platform) instead of 409 forever.
4. Another user's credential id in a session request → rejected as
   `opencode_credential_not_found`.
5. A turn on OpenCode never touches AutoGPT credit/allowance accounting.

## Non-goals

OAuth or device login for OpenCode, a model browser, usage/cost dashboards for
OpenCode, a GitBook docs page, changes to the baseline (non-SDK) engine.
