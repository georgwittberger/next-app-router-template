"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import type { FC, HTMLAttributes } from "react";

import { trpc } from "~/trpc";

export const ToDoList: FC<Omit<HTMLAttributes<HTMLElement>, "children">> = ({
  className,
  ...props
}) => {
  const t = useTranslations("todos.list");
  const { data: todos, isInitialLoading } = trpc.todos.list.useQuery();

  if (isInitialLoading) {
    return (
      <div
        className={clsx(
          "px-4 py-2 rounded border border-gray-200 bg-gray-200 text-lg",
          className
        )}
        {...props}
      >
        {t("loading")}
      </div>
    );
  }

  return (
    <ul className={clsx("grid gap-4", className)} {...props}>
      {todos?.map((todo) => (
        <li
          key={todo.id}
          className="flex justify-between items-center px-4 py-2 rounded border border-gray-500"
        >
          <span className="text-lg">{todo.title}</span>
          <span className="text-sm text-gray-500">
            {t("createdDate", { createdDate: todo.createdAt })}
          </span>
        </li>
      ))}
    </ul>
  );
};
