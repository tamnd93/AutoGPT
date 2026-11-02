"use client";

import { useRef } from "react";
import { Button } from "@/components/atoms/Button/Button";
import { Badge } from "@/components/atoms/Badge/Badge";
import { useOAuthApps } from "./useOAuthApps";
import { LoadingSpinner } from "@/components/atoms/LoadingSpinner/LoadingSpinner";
import {
  Image01Icon,
  PowerIcon,
  Upload01Icon,
} from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";

export function OAuthAppsSection() {
  const t = useT();
  const {
    oauthApps,
    isLoading,
    updatingAppId,
    uploadingAppId,
    handleToggleStatus,
    handleUploadLogo,
  } = useOAuthApps();

  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const handleFileChange = (
    appId: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      handleUploadLogo(appId, file);
    }
    // Reset the input so the same file can be selected again
    event.target.value = "";
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (oauthApps.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        <p>{t("profile5.oauth.empty")}</p>
        <p className="mt-2 text-sm">{t("profile5.oauth.emptyNote")}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
      {oauthApps.map((app) => (
        <div
          key={app.id}
          data-testid="oauth-app-card"
          className="flex flex-col gap-4 rounded-xl border bg-card p-5"
        >
          {/* Header: Logo, Name, Status */}
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-muted">
              {app.logo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={app.logo_url}
                  alt={t("profile5.oauth.logoAlt", { name: app.name })}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Icon
                  icon={Image01Icon}
                  className="h-7 w-7 text-muted-foreground"
                />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="truncate text-lg font-semibold">{app.name}</h3>
                <Badge
                  className="ml-2"
                  variant={app.is_active ? "success" : "error"}
                >
                  {app.is_active
                    ? t("profile5.oauth.active")
                    : t("profile5.oauth.disabled")}
                </Badge>
              </div>
              {app.description && (
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {app.description}
                </p>
              )}
            </div>
          </div>

          {/* Client ID */}
          <div>
            <span className="text-xs font-medium text-muted-foreground">
              {t("profile5.oauth.clientId")}
            </span>
            <code
              data-testid="oauth-app-client-id"
              className="mt-1 block w-full truncate rounded-md border bg-muted px-3 py-2 text-xs"
            >
              {app.client_id}
            </code>
          </div>

          {/* Footer: Created date and Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4">
            <span className="text-xs text-muted-foreground">
              {t("profile5.oauth.created", {
                date: new Date(app.created_at).toLocaleDateString(),
              })}
            </span>
            <div className="flex items-center gap-3">
              <Button
                variant={app.is_active ? "outline" : "primary"}
                size="small"
                onClick={() => handleToggleStatus(app.id, app.is_active)}
                loading={updatingAppId === app.id}
                leftIcon={<Icon icon={PowerIcon} className="h-4 w-4" />}
              >
                {app.is_active
                  ? t("profile5.oauth.disable")
                  : t("profile5.oauth.enable")}
              </Button>
              <input
                type="file"
                ref={(el) => {
                  fileInputRefs.current[app.id] = el;
                }}
                onChange={(e) => handleFileChange(app.id, e)}
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
              />
              <Button
                variant="outline"
                size="small"
                onClick={() => fileInputRefs.current[app.id]?.click()}
                loading={uploadingAppId === app.id}
                leftIcon={<Icon icon={Upload01Icon} className="h-4 w-4" />}
              >
                {app.logo_url
                  ? t("profile5.oauth.changeLogo")
                  : t("profile5.oauth.uploadLogo")}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
