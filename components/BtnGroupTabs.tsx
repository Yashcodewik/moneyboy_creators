"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export interface TabItem {
  key: string;
  label: string;
}

interface Props {
  activeTab: string;
  onChange: (tab: string) => void;
  tabs: TabItem[];
}

const BtnGroupTabs = ({ activeTab, onChange, tabs }: Props) => {
  const groupRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const updatePosition = (btn: HTMLButtonElement | null) => {
    const parent = groupRef.current;
    if (!btn || !parent) return;

    const rect = btn.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();

    setIndicator({
      left: rect.left - parentRect.left,
      width: rect.width,
    });
  };

  const moveToActive = () => {
    const index = tabs.findIndex(t => t.key === activeTab);
    if (index === -1) return; // safety

    updatePosition(btnRefs.current[index]);
  };

  // run AFTER layout stabilizes
  useLayoutEffect(() => {
    const id = requestAnimationFrame(moveToActive);
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    moveToActive();

    const resizeObserver = new ResizeObserver(moveToActive);
    if (groupRef.current) resizeObserver.observe(groupRef.current);

    window.addEventListener("resize", moveToActive);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", moveToActive);
    };
  }, [activeTab, tabs]);

  return (
    <div
      className="moneyboy-feed-page-cate-buttons card btnGroup"
      ref={groupRef}
      onMouseLeave={moveToActive}
    >
      <span
        className="slider"
        style={{
          left: indicator.left,
          width: indicator.width,
        }}
      />

      {tabs.map((tab, i) => (
        <button
          key={tab.key}
          ref={(el :any) => (btnRefs.current[i] = el)}
          className={`page-content-type-button ${
            activeTab === tab.key ? "active" : ""
          }`}
          onClick={() => onChange(tab.key)}
          onMouseEnter={() => updatePosition(btnRefs.current[i])}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default BtnGroupTabs;