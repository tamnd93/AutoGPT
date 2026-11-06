import { Metadata } from "next/types";
import { OAuthAppsHeader } from "./components/OAuthAppsHeader";
import { OAuthAppsSection } from "./components/OAuthAppsSection";

export const metadata: Metadata = { title: "OAuth Apps - AutoGPT Platform" };

const OAuthAppsPage = () => {
  return (
    <div className="container space-y-6 py-10">
      <OAuthAppsHeader />
      <OAuthAppsSection />
    </div>
  );
};

export default OAuthAppsPage;
