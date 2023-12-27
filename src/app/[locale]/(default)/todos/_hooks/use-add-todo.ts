import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";

import { trpc } from "~/trpc";

export const useAddToDo = () => {
  const queryClient = useQueryClient();
  return trpc.todos.add.useMutation({
    onSettled: () => {
      void queryClient.invalidateQueries(getQueryKey(trpc.todos.list));
    },
  });
};
