"use client";

import * as Sentry from "@sentry/nextjs";
import { Component, type ErrorInfo, type ReactNode } from "react";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";

interface Props {
  children: ReactNode;
  artifactID: string;
  artifactTitle: string;
  artifactType: string;
  locale?: Locale;
}

interface State {
  error: Error | null;
}

export class ArtifactErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    Sentry.captureException(error, {
      contexts: {
        react: { componentStack: errorInfo.componentStack },
      },
      tags: { errorBoundary: "true", context: "copilot-artifact" },
      extra: {
        artifactID: this.props.artifactID,
        artifactTitle: this.props.artifactTitle,
        artifactType: this.props.artifactType,
      },
    });
  }

  componentDidUpdate(prevProps: Props) {
    if (
      this.state.error &&
      (prevProps.artifactID !== this.props.artifactID ||
        prevProps.artifactTitle !== this.props.artifactTitle ||
        prevProps.artifactType !== this.props.artifactType)
    ) {
      this.setState({ error: null });
    }
  }

  handleCopy = () => {
    const { error } = this.state;
    if (!error) return;
    const details = [
      `Artifact: ${this.props.artifactTitle}`,
      `ID: ${this.props.artifactID}`,
      `Type: ${this.props.artifactType}`,
      `Error: ${error.message}`,
      error.stack ? `Stack:\n${error.stack}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    navigator.clipboard?.writeText(details).catch(() => {});
  };

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    const locale = this.props.locale ?? DEFAULT_LOCALE;
    const message =
      error.message ||
      getMessage(locale, "chatFiles1.artifactError.unknownError");

    return (
      <div
        role="alert"
        className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center"
      >
        <p className="text-sm font-medium text-foreground-body">
          {getMessage(locale, "chatFiles1.artifactError.title")}
        </p>
        <p className="max-w-md break-words text-xs text-foreground-tertiary">
          {getMessage(locale, "chatFiles1.artifactError.bodyPrefix")}{" "}
          <span className="font-mono">{this.props.artifactTitle}</span>{" "}
          {getMessage(locale, "chatFiles1.artifactError.bodySuffix")}
        </p>
        <pre className="max-h-32 max-w-md overflow-auto whitespace-pre-wrap break-words rounded-md bg-surface-hover px-3 py-2 text-left text-xs text-foreground-body">
          {message}
        </pre>
        <button
          type="button"
          onClick={this.handleCopy}
          // TODO(tokens): no exact role for focus-visible:ring-violet-400
          className="rounded-md border border-border-base bg-surface px-3 py-1.5 text-xs font-medium text-foreground-body shadow-sm transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
        >
          {getMessage(locale, "chatFiles1.artifactError.copyDetails")}
        </button>
        <p className="max-w-md text-xs text-foreground-subtle">
          {getMessage(locale, "chatFiles1.artifactError.pasteHint")}
        </p>
      </div>
    );
  }
}
