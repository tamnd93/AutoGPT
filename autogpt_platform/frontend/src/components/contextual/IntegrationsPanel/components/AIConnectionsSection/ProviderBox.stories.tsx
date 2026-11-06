import type { Meta, StoryObj } from "@storybook/nextjs";
import { ProviderBox } from "./ProviderBox";
import { ProviderCatalogueCard } from "./ProviderCatalogueCard";
import { normalizeProviderCatalog } from "./providerCatalogue";

const COMING_SOON_PROVIDERS = normalizeProviderCatalog(undefined).filter(
  (provider) => provider.status === "coming-soon",
);

const meta = {
  title: "Integrations/Subscription Provider",
  component: ProviderBox,
  parameters: { layout: "centered" },
  args: {
    name: "Microsoft 365 Copilot",
    logoSrc: "/integrations/microsoft.webp",
    state: "available",
  },
  decorators: [
    (Story, context) => (
      <div className={context.parameters.providerGrid ? "w-[40rem]" : "w-48"}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProviderBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Available: Story = {};
export const Connected: Story = { args: { state: "connected" } };
export const Connecting: Story = { args: { isBusy: true } };
export const ComingSoon: Story = {
  args: {
    name: "GitHub Copilot",
    logoSrc: "/integrations/github.png",
    state: "coming-soon",
  },
};

export const AllProviders: Story = {
  parameters: { providerGrid: true },
  render: () => (
    <div className="grid grid-cols-4 gap-3">
      <ProviderBox
        name="ChatGPT"
        logoSrc="/integrations/openai.png"
        state="available"
      />
      <ProviderBox
        name="Microsoft 365 Copilot"
        logoSrc="/integrations/microsoft.webp"
        state="available"
      />
      {COMING_SOON_PROVIDERS.map((provider) => (
        <ProviderCatalogueCard
          key={provider.id}
          provider={provider}
          onSuccess={() => undefined}
        />
      ))}
    </div>
  ),
};
