"use client";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {
  dataLength: number;
  fetchMore: () => void;
  hasMore: boolean;
  children: React.ReactNode;
  loader?: React.ReactNode;
}

export default function InfiniteScrollWrapper({
  dataLength,
  fetchMore,
  hasMore,
  children,
  loader = <div className="nodeta">Loading...</div>,
}: Props) {
  return (
    <InfiniteScroll
      dataLength={dataLength}
      next={fetchMore}
      hasMore={hasMore}
      loader={loader}
      scrollThreshold={0.85}
    >
      {children}
    </InfiniteScroll>
  );
}