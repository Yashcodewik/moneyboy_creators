"use client";
import { CircleX } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

type Option = { label: string; value: string };

type CustomSelectProps = { label?: string; options: Option[]; value?: string | string[] | null; onChange?: (value: string | string[]) => void; placeholder?: string; className?: string; icon?: React.ReactNode; searchable?: boolean; multiple?: boolean;};

const CustomSelect: React.FC<CustomSelectProps> = ({ label = "Select", options, value, onChange, placeholder = "Search here", className = "", icon, searchable = true, multiple = false,}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [internalValue, setInternalValue] = useState<string | string[] | null>(value ?? (multiple ? [] : null));
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {if (value !== undefined) setInternalValue(value);}, [value]);

  useEffect(() => {const handleClickOutside = (e: MouseEvent) => {if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {setOpen(false);}};
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOptions = Array.isArray(internalValue)
    ? options.filter((o) => internalValue.includes(o.value))
    : options.find((o) => o.value === internalValue);

  const filteredOptions = searchable
    ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  const handleSelect = (val: string) => {if (!multiple) {setInternalValue(val); onChange?.(val); setOpen(false); return;}

    const current = Array.isArray(internalValue) ? internalValue : [];
    const updated = current.includes(val) ? current.filter((v) => v !== val) : [...current, val];
    setInternalValue(updated);
    onChange?.(updated);
  };

  const handleRemove = (val: string) => {
    if (!Array.isArray(internalValue)) return;
    const updated = internalValue.filter((v) => v !== val);
    setInternalValue(updated);
    onChange?.(updated);
  };

  useEffect(() => {
  if (!open) {
    setSearch(""); 
  }
}, [open]);
  return (
    <div ref={wrapperRef} className={`custom-select-element ${className}`} data-custom-select-element data-custom-select-value={internalValue?.toString() ?? ""}>
      <div className="custom-select-label-wrapper" data-custom-select-triger onClick={() => setOpen((p) => !p)}>
        <div className="custom-select-icon-txt">
          {icon}
          <span className={`custom-select-label-txt ${multiple ? "multi-select" : ""}`}>
            {multiple && Array.isArray(selectedOptions) ? (selectedOptions.length ? (selectedOptions.map((opt) => (
              <span key={opt.value} className="multitext">
                {opt.label} <span className="multi-remove" onClick={(e) => { e.stopPropagation(); handleRemove(opt.value);}}><CircleX size={10} color="#CD3F3F" /></span>
              </span>
                ))
              ) : (
                label
              )
            ) : !multiple && selectedOptions && !Array.isArray(selectedOptions) ? (selectedOptions.label) : (label)}
          </span>
        </div>
        <div className="custom-select-chevron">
          <svg className="icons chevronDown svg-icon" />
        </div>
      </div>

      {open && (
        <div className="custom-select-options-dropdown-wrapper">
          <div className="custom-select-options-dropdown-container">
            {searchable && (
              <div className="custom-select-options-search">
                <div className="label-input">
                  <div className="input-placeholder-icon">
                    <svg className="icons searchAdd svg-icon" />
                  </div>
                  <input type="text" placeholder={placeholder} value={search} onChange={(e) => setSearch(e.target.value)}/>
                </div>
              </div>
            )}

            <div className="custom-select-options-lists-container">
              <ul className="custom-select-options-list" data-custom-select-options-list>
                {filteredOptions.map((opt) => (
                  <li key={opt.value} className={`custom-select-option ${multiple && Array.isArray(internalValue) && internalValue.includes(opt.value) ? "selected" : "" }`} onClick={() => handleSelect(opt.value)}>
                    <span>{opt.label}</span>
                  </li>
                ))}

                {!filteredOptions.length && (
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