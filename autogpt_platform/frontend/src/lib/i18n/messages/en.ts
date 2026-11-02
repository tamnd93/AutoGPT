import { account1En } from "./account-1.en";
import { account2En } from "./account-2.en";
import { AiConnections1En } from "./ai-connections-1.en";
import { Artifacts1En } from "./artifacts-1.en";
import { auth1En } from "./auth-1.en";
import { auth2En } from "./auth-2.en";
import { billing1En } from "./billing-1.en";
import { billing2En } from "./billing-2.en";
import { billing3En } from "./billing-3.en";
import { build1En } from "./build-1.en";
import { build2En } from "./build-2.en";
import { build3En } from "./build-3.en";
import { build4En } from "./build-4.en";
import { Build5En } from "./build-5.en";
import { chatFiles1En } from "./chat-files-1.en";
import { chatFiles2En } from "./chat-files-2.en";
import { chatInput1En } from "./chat-input-1.en";
import { chatInput2En } from "./chat-input-2.en";
import { chatInput3En } from "./chat-input-3.en";
import { chatRuntime1En } from "./chat-runtime-1.en";
import { chatRuntime2En } from "./chat-runtime-2.en";
import { ChatStates2En } from "./chat-states-2.en";
import { ChatStates3En } from "./chat-states-3.en";
import { ChatStates4En } from "./chat-states-4.en";
import { chatTools1En } from "./chat-tools-1.en";
import { chatTools2En } from "./chat-tools-2.en";
import { chatTools3En } from "./chat-tools-3.en";
import { chatTools4En } from "./chat-tools-4.en";
import { chatTools5En } from "./chat-tools-5.en";
import { ConnectServices1En } from "./connect-services-1.en";
import { ConnectServices2En } from "./connect-services-2.en";
import { credentials1En } from "./credentials-1.en";
import { credentials2En } from "./credentials-2.en";
import { formatEn } from "./format.en";
import { home1En } from "./home-1.en";
import { home2En } from "./home-2.en";
import { integrationsEn } from "./integrations.en";
import { Integrations1En } from "./integrations-1.en";
import { library1En } from "./library-1.en";
import { library2En } from "./library-2.en";
import { library3En } from "./library-3.en";
import { library4En } from "./library-4.en";
import { library5En } from "./library-5.en";
import { marketplace1En } from "./marketplace-1.en";
import { marketplace2En } from "./marketplace-2.en";
import { marketplace3En } from "./marketplace-3.en";
import { marketplace4En } from "./marketplace-4.en";
import { navEn } from "./nav.en";
import { nav1En } from "./nav-1.en";
import { nav2En } from "./nav-2.en";
import { nav3En } from "./nav-3.en";
import { onboarding1En } from "./onboarding-1.en";
import { onboarding2En } from "./onboarding-2.en";
import { onboarding3En } from "./onboarding-3.en";
import { settingsRest1En } from "./settings-rest-1.en";
import { settingsRest2En } from "./settings-rest-2.en";
import { settingsRest3En } from "./settings-rest-3.en";
import { Team2En } from "./team-2.en";
import { voice1En } from "./voice-1.en";

export const en = {
  ...account1En,
  ...account2En,
  ...AiConnections1En,
  ...Artifacts1En,
  ...auth1En,
  ...auth2En,
  ...billing1En,
  ...billing2En,
  ...billing3En,
  ...build1En,
  ...build2En,
  ...build3En,
  ...build4En,
  ...Build5En,
  ...chatFiles1En,
  ...chatFiles2En,
  ...chatInput1En,
  ...chatInput2En,
  ...chatInput3En,
  ...chatRuntime1En,
  ...chatRuntime2En,
  ...ChatStates2En,
  ...ChatStates3En,
  ...ChatStates4En,
  ...chatTools1En,
  ...chatTools2En,
  ...chatTools3En,
  ...chatTools4En,
  ...chatTools5En,
  ...ConnectServices1En,
  ...ConnectServices2En,
  ...credentials1En,
  ...credentials2En,
  ...formatEn,
  ...home1En,
  ...home2En,
  ...integrationsEn,
  ...Integrations1En,
  ...library1En,
  ...library2En,
  ...library3En,
  ...library4En,
  ...library5En,
  ...marketplace1En,
  ...marketplace2En,
  ...marketplace3En,
  ...marketplace4En,
  ...navEn,
  ...nav1En,
  ...nav2En,
  ...nav3En,
  ...onboarding1En,
  ...onboarding2En,
  ...onboarding3En,
  ...settingsRest1En,
  ...settingsRest2En,
  ...settingsRest3En,
  ...Team2En,
  ...voice1En,
  "common.planSuffix": "{plan} plan",
} as const;

export type MessageKey = keyof typeof en;
