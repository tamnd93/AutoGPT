import React from "react";
import { MenuItem } from "../MenuItem";
import { useBlockMenuSidebar } from "./useBlockMenuSidebar";
import { Skeleton } from "@/components/atoms/Skeleton/Skeleton";
import { ErrorCard } from "@/components/molecules/ErrorCard/ErrorCard";
import { useBlockMenuStore } from "../../../../stores/blockMenuStore";
import { DefaultStateType } from "../types";
import { useT } from "@/lib/i18n";

export const BlockMenuSidebar = () => {
  const t = useT();
  const { data, setDefaultState, defaultState, isLoading, isError, error } =
    useBlockMenuSidebar();
  const setIntegration = useBlockMenuStore((state) => state.setIntegration);
  if (isLoading) {
    return (
      <div className="w-fit space-y-2 px-4 pt-4">
        <Skeleton className="h-12 w-[12.875rem]" />
        <Skeleton className="h-12 w-[12.875rem]" />
        <Skeleton className="h-12 w-[12.875rem]" />
        <Skeleton className="h-12 w-[12.875rem]" />
        <Skeleton className="h-12 w-[12.875rem]" />
        <Skeleton className="h-12 w-[12.875rem]" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="w-fit space-y-2 px-4 pt-4">
        <ErrorCard
          className="w-[12.875rem]"
          isSuccess={false}
          responseError={error || undefined}
          context={t("build3.errors.contextBlockMenu")}
          httpError={{
            status: data?.status,
            statusText: t("build3.errors.statusServerError"),
            message:
              (error?.detail as string) || t("build3.errors.messageDefault"),
          }}
        />
      </div>
    );
  }

  const blockCounts = data?.blockCounts;

  const topLevelMenuItems = [
    {
      name: t("build3.sidebar.suggestion"),
      type: "suggestion",
    },
    {
      name: t("build3.sidebar.allBlocks"),
      type: "all_blocks",
      number: blockCounts?.all_blocks,
    },
  ];

  const subMenuItems = [
    {
      name: t("build3.sidebar.inputBlocks"),
      type: "input_blocks",
      number: blockCounts?.input_blocks,
    },
    {
      name: t("build3.sidebar.actionBlocks"),
      type: "action_blocks",
      number: blockCounts?.action_blocks,
    },
    {
      name: t("build3.sidebar.outputBlocks"),
      type: "output_blocks",
      number: blockCounts?.output_blocks,
    },
  ];

  const bottomMenuItems = [
    {
      name: t("build3.sidebar.integrations"),
      type: "integrations",
      number: blockCounts?.integrations,
      onClick: () => {
        setDefaultState(DefaultStateType.INTEGRATIONS);
        setIntegration(undefined);
      },
    },
    {
      name: t("build3.sidebar.marketplace"),
      type: "marketplace_agents",
      number: blockCounts?.marketplace_agents,
    },
    {
      name: t("build3.sidebar.mine"),
      type: "my_agents",
      number: blockCounts?.my_agents,
    },
  ];

  return (
    <div className="w-fit space-y-2 px-4 pt-4">
      {topLevelMenuItems.map((item) => (
        <MenuItem
          key={item.type}
          name={item.name}
          number={item.number}
          menuItemType={item.type}
          selected={defaultState === item.type}
          onClick={() => setDefaultState(item.type as DefaultStateType)}
        />
      ))}
      <div
        // TODO(tokens): no fitting role for border-black/10 #141414; #141414 is foreground-base (a text colour)
        className="ml-[0.5365rem] space-y-2 border-l border-black/10 pl-[0.75rem]"
      >
        {subMenuItems.map((item) => (
          <MenuItem
            key={item.type}
            name={item.name}
            number={item.number}
            menuItemType={item.type}
            className="max-w-[11.5339rem]"
            selected={defaultState === item.type}
            onClick={() => setDefaultState(item.type as DefaultStateType)}
          />
        ))}
      </div>
      {bottomMenuItems.map((item) => (
        <MenuItem
          key={item.type}
          name={item.name}
          number={item.number}
          menuItemType={item.type}
          selected={defaultState === item.type}
          onClick={
            item.onClick ||
            (() => setDefaultState(item.type as DefaultStateType))
          }
        />
      ))}
    </div>
  );
};
