import { Metadata } from "next/types";
import { APIKeysSection } from "@/app/(platform)/profile/(user)/api-keys/components/APIKeySection/APIKeySection";
import { Card, CardContent } from "@/components/atoms/Card/Card";
import { APIKeysHeader } from "./components/APIKeysHeader";
import { APIKeysModals } from "./components/APIKeysModals/APIKeysModals";

export const metadata: Metadata = { title: "API Keys - AutoGPT Platform" };

function ApiKeysPage() {
  return (
    <div className="w-full pr-4 pt-24 md:pt-0">
      <Card variant="outlined">
        <APIKeysHeader />
        <CardContent>
          <APIKeysModals />
          <APIKeysSection />
        </CardContent>
      </Card>
    </div>
  );
}

export default ApiKeysPage;
