import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const useInfiniteScrollContext = (
  fetchFunction,
  params,
  queryKey,
  shouldRefresh = false
) => {
  const { ref, inView } = useInView();
  const normalizedParams =
    params && typeof params === "object"
      ? params
      : params !== null && params !== undefined
      ? { value: params }
      : null;

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    isFetching,
  } = useInfiniteQuery({
    queryKey: params ? [queryKey, params] : [queryKey],
    queryFn: ({ pageParam = 0 }) => {
      if (params) {
        return fetchFunction(params, pageParam).then((res) => res.data);
      }
      return fetchFunction(pageParam).then((res) => res.data);
    },
    getNextPageParam: (lastPage) =>
      lastPage.last ? undefined : lastPage.number + 1,
    enabled: params ? Object.values(normalizedParams).every(Boolean) : true,
    refetchOnWindowFocus: false,
    refetchInterval: shouldRefresh ? 5000 : false,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);
  return {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    isFetching,
    ref,
    inView,
  };
};

export default useInfiniteScrollContext;
