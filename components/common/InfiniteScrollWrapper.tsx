"use client";

import InfiniteScroll from "react-infinite-scroll-component";

interface InfiniteScrollWrapperProps {
  dataLength: number;
  fetchMore: () => void;
  hasMore: boolean;
  scrollableTarget: string;
  children: React.ReactNode;
  loader?: React.ReactNode;
}

const InfiniteScrollWrapper = ({
  dataLength,
  fetchMore,
  hasMore,
  scrollableTarget,
  children,
  loader = <div className="text-center py-4">Loading...</div>,
}: InfiniteScrollWrapperProps) => {
  return (
    <InfiniteScroll
      dataLength={dataLength}
      next={fetchMore}
      hasMore={hasMore}
      loader={loader}
      scrollableTarget={scrollableTarget}
      scrollThreshold={0.9}
    >
      {children}
    </InfiniteScroll>
  );
};

export default InfiniteScrollWrapper;
