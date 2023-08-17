"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useRef, type ElementRef, type FC, type HTMLAttributes } from "react";
import { useForm } from "react-hook-form";

import { ActionButton } from "~/components/action-button";
import { addToDoInputSchema, type AddToDoInputData } from "~/schemas/todos";
import { useAddToDo } from "../_hooks/use-add-todo";

export const ToDoInput: FC<Omit<HTMLAttributes<HTMLElement>, "children">> = ({
  className,
  ...props
}) => {
  const t = useTranslations("todos.input");
  const formRef = useRef<ElementRef<"form">>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddToDoInputData>({
    resolver: zodResolver(addToDoInputSchema),
  });
  const { mutate: addToDo, isLoading } = useAddToDo();

  const onSubmit = (data: AddToDoInputData) => {
    addToDo(data, {
      onSuccess: () => {
        formRef.current?.reset();
      },
    });
  };

  return (
    <form
      ref={formRef}
      className={clsx("flex gap-4", className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <input
        type="text"
        placeholder={t("placeholder")}
        className={clsx("flex-grow p-2 rounded border border-gray-300", {
          "outline-2 outline-red-600": errors.title,
        })}
        {...register("title")}
      />
      <ActionButton type="submit" disabled={isLoading}>
        {t("submitButtonText")}
      </ActionButton>
    </form>
  );
};
