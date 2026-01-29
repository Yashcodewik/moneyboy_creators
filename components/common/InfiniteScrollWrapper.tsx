"use client";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {
  dataLength: number;
  fetchMore: () => void;
  hasMore: boolean;
  children: React.ReactNode;
  loader?: React.ReactNode;
  scrollableTarget: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function InfiniteScrollWrapper({
  dataLength,
  fetchMore,
  hasMore,
  children,
  loader = (<div className="loadingtext"><img src="/images/micons.png" alt="M" className="loading-letter-img"/>{"oneyBoy".split("").map((char, i) => (<span key={i} style={{ animationDelay: `${(i + 2) * 0.1}s` }}>{char}</span>))}</div>),
  scrollableTarget,
  className,
  style,
}: Props) {
  return (
    <InfiniteScroll className={className} style={style} dataLength={dataLength} next={fetchMore} hasMore={hasMore} loader={loader} scrollThreshold={0.85} scrollableTarget={scrollableTarget}>
      {children}
    </InfiniteScroll>
  );
}
