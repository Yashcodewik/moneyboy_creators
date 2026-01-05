"use client";
import React, { useState, useRef, useEffect } from "react";

type Option = { label: string; value: string };
type CustomSelectProps = {
  label?: string;
  options: Option[];
  value?: string | null;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  icon?: React.ReactNode;
};
const CustomSelect: React.FC<CustomSelectProps> = ({
  label = "Select",
  options,
  value,
  onChange,
  placeholder = "Search here",
  className = "",
  icon,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [internalValue, setInternalValue] = useState<string | null>(
    value ?? null
  );
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === internalValue);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (val: string) => {
    setInternalValue(val);
    onChange?.(val);
    setOpen(false);
  };

  return (
    <div
      ref={wrapperRef}
      className={`custom-select-element ${className}`}
      data-custom-select-element=""
      data-custom-select-value={internalValue ?? ""}
    >
      <div
        className="custom-select-label-wrapper"
        data-custom-select-triger=""
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="custom-select-icon-txt">
          {icon ? icon : <svg className="icons calendarClock svg-icon"></svg>}
          <span className="custom-select-label-txt">
            {selectedOption ? selectedOption.label : label}
          </span>
        </div>
        <div className="custom-select-chevron">
          <svg className="icons chevronDown svg-icon"></svg>
        </div>
      </div>
      {/* Dropdown */}
      {open && (
        <div
          className="custom-select-options-dropdown-wrapper"
          style={{ display: open ? "unset" : "none" }}
        >
          <div className="custom-select-options-dropdown-container">
            {/* Search */}
            <div className="custom-select-options-search">
              <div className="label-input">
                <div className="input-placeholder-icon">
                  <svg className="icons searchAdd svg-icon"></svg>
                </div>
                <input
                  type="text"
                  placeholder={placeholder}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            {/* Options */}
            <div className="custom-select-options-lists-container">
              <ul
                className="custom-select-options-list"
                data-custom-select-options-list=""
              >
                {filteredOptions.map((opt) => (
                  <li
                    key={opt.value}
                    className="custom-select-option"
                    onClick={() => handleSelect(opt.value)}
                  >
                    <span>{opt.label}</span>
                  </li>
                ))}
                {filteredOptions.length === 0 && (
                  <li className="custom-select-option">
                    <span>No options found</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
