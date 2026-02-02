"use client";
import React, { useState, useRef, useEffect } from "react";

type Option = { label: string; value: string };
type CustomSelectProps = {
  label?: string;
  options: Option[];
  value?: string | string[] | null;
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  className?: string;
  icon?: React.ReactNode;
  searchable?: boolean;
  multiple?: boolean;
};

const CustomSelect: React.FC<CustomSelectProps> = ({
  label = "Select",
  options,
  value,
  onChange,
  placeholder = "Search here",
  className = "",
  icon,
  searchable = true,
  multiple = false,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [internalValue, setInternalValue] = useState<string | string[] | null>(
    value ?? (multiple ? [] : null),
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
  useEffect(() => {
    if (!open) {
      setSearch(""); // clear search when dropdown closes
    }
  }, [open]);

  const selectedOption = Array.isArray(internalValue)
    ? options.filter((opt) => internalValue.includes(opt.value))
    : options.find((opt) => opt.value === internalValue);

  const filteredOptions = searchable
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(search.toLowerCase()),
      )
    : options;

  const handleSelect = (val: string) => {
    if (multiple) {
      const current = Array.isArray(internalValue) ? internalValue : [];
      const updated = current.includes(val)
        ? current.filter((v) => v !== val)
        : [...current, val];

      setInternalValue(updated);
      onChange?.(updated);
    } else {
      setInternalValue(val);
      onChange?.(val);
      setOpen(false);
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={`custom-select-element ${className}`}
      data-custom-select-element=""
      data-custom-select-value={internalValue ? internalValue.toString() : ""}
    >
      <div
        className="custom-select-label-wrapper"
        data-custom-select-triger=""
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="custom-select-icon-txt">
          {icon && icon}
          <span className="custom-select-label-txt">
            {multiple &&
            Array.isArray(selectedOption) &&
            selectedOption.length > 0 ? (
              <div className="selected-tags">
                {selectedOption.map((opt: Option) => (
                  <span key={opt.value} className="selected-tag">
                    {opt.label}
                    <span
                      className="remove-tag"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelect(opt.value);
                      }}
                    >
                      ×
                    </span>
                  </span>
                ))}
              </div>
            ) : !Array.isArray(selectedOption) && selectedOption ? (
              selectedOption.label
            ) : (
              label
            )}
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
            {searchable && (
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
            )}

            <div className="custom-select-options-lists-container">
              <ul
                className="custom-select-options-list"
                data-custom-select-options-list=""
              >
                {filteredOptions.map((opt) => (
                  <li
                    key={opt.value}
                    className={`custom-select-option ${
                      multiple &&
                      Array.isArray(internalValue) &&
                      internalValue.includes(opt.value)
                        ? "selected"
                        : ""
                    }`}
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
