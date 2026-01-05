import React, { useState } from "react";

type ProfileTabProps = {
  onChangeLayouts?: (layout: "grid" | "list") => void;
  onChangeTab?: (tab: string) => void;
};

const ProfileTab: React.FC<ProfileTabProps> = ({
  onChangeLayouts,
  onChangeTab,
}) => {
  const [tab, setTab] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All Time");
  const [layout, setLayout] = useState("grid");

  const handleLayoutChange = (value: "grid" | "list") => {
    setLayout(value);
    onChangeLayouts?.(value);
  };

  const handleTabChange = (value: string) => {
    setSelectedOption(value);
    onChangeTab?.(value);
    setTab(false);
  };

  return (
    <div className="search-features-grid-btns">
      <div className="creator-content-search-input">
        <div className="label-input">
          <div className="input-placeholder-icon">
            <svg
              className="svg-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M20 11C20 15.97 15.97 20 11 20C6.03 20 2 15.97 2 11C2 6.03 6.03 2 11 2"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 5H20"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 8H17"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <input type="text" placeholder="Search here" />
        </div>
      </div>

      <div className="creater-content-filters-layouts">
        <div className="creator-content-select-filter">
          <div
            className="custom-select-element bg-white p-sm"
            data-custom-select-element
            data-custom-select-value
          >
            <div
              className="custom-select-label-wrapper"
              data-custom-select-triger
              onClick={() => setTab((prev) => !prev)}
            >
              <div className="custom-select-icon-txt">
                <span className="custom-select-label-txt">
                  {" "}
                  {selectedOption}
                </span>
              </div>
              <div className="custom-select-chevron">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                >
                  <path
                    d="M20.4201 8.95L13.9001 15.47C13.1301 16.24 11.8701 16.24 11.1001 15.47L4.58008 8.95"
                    stroke="none"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            {tab && (
              <div
                className="custom-select-options-dropdown-wrapper"
                data-custom-select-dropdown
              >
                <div className="custom-select-options-dropdown-container">
                  <div className="custom-select-options-lists-container">
                    <ul
                      className="custom-select-options-list"
                      data-custom-select-options-list
                    >
                      <li
                        className="custom-select-option"
                        onClick={() => {
                          handleTabChange("Option 1");
                        }}
                      >
                        <span> Option 1</span>
                      </li>
                      <li
                        className="custom-select-option"
                        onClick={() => {
                          handleTabChange("Option 2");
                        }}
                      >
                        <span> Option 2</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          className="creator-content-grid-layout-options"
          data-multi-dem-cards-layout-btns
        >
          {/* data__active */}
          <button
            className={`creator-content-grid-layout-btn ${
              layout === "grid" ? "active" : "inactive"
            }`}
            onClick={() => handleLayoutChange("grid")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M22 8.52V3.98C22 2.57 21.36 2 19.77 2H15.73C14.14 2 13.5 2.57 13.5 3.98V8.51C13.5 9.93 14.14 10.49 15.73 10.49H19.77C21.36 10.5 22 9.93 22 8.52Z"
                fill="none"
              />
              <path
                d="M22 19.77V15.73C22 14.14 21.36 13.5 19.77 13.5H15.73C14.14 13.5 13.5 14.14 13.5 15.73V19.77C13.5 21.36 14.14 22 15.73 22H19.77C21.36 22 22 21.36 22 19.77Z"
                fill="none"
              />
              <path
                d="M10.5 8.52V3.98C10.5 2.57 9.86 2 8.27 2H4.23C2.64 2 2 2.57 2 3.98V8.51C2 9.93 2.64 10.49 4.23 10.49H8.27C9.86 10.5 10.5 9.93 10.5 8.52Z"
                fill="none"
              />
              <path
                d="M10.5 19.77V15.73C10.5 14.14 9.86 13.5 8.27 13.5H4.23C2.64 13.5 2 14.14 2 15.73V19.77C2 21.36 2.64 22 4.23 22H8.27C9.86 22 10.5 21.36 10.5 19.77Z"
                fill="none"
              />
            </svg>
          </button>

          <button
            className={`creator-content-grid-layout-btn ${
              layout === "list" ? "active" : "inactive"
            }`}
            onClick={() => handleLayoutChange("list")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M19.9 13.5H4.1C2.6 13.5 2 14.14 2 15.73V19.77C2 21.36 2.6 22 4.1 22H19.9C21.4 22 22 21.36 22 19.77V15.73C22 14.14 21.4 13.5 19.9 13.5Z"
                stroke="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19.9 2H4.1C2.6 2 2 2.64 2 4.23V8.27C2 9.86 2.6 10.5 4.1 10.5H19.9C21.4 10.5 22 9.86 22 8.27V4.23C22 2.64 21.4 2 19.9 2Z"
                stroke="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
