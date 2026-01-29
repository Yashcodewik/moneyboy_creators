import React, { useEffect, useRef, useState } from 'react'
import CustomSelect from '../CustomSelect'
import { getDecryptedSession } from '@/libs/getDecryptedSession';
import {
  ageGroupOptions,
  bodyTypeOptions,
  categoryOptions,
  cityOptions,
  countryOptions,
  ethnicityOptions,
  eyeColorOptions,
  featureOptions,
  hairColorOptions,
  heightOptions,
  popularityOptions,
  sexualOrientationOptions,
  sizeOptions,
  styleOptions,
} from "../helper/creatorOptions";

type FilterType =
  | "category"
  | "feature"
  | "country"
  | "city"
  | "bodyType"
  | "sexualOrientation"
  | "age"
  | "eyeColor"
  | "hairColor"
  | "ethnicity"
  | "height"
  | "style"
  | "size"
  | "popularity"
  | null;

interface FilterProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  filterValues: Record<string, string>;
  setFilterValues: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

const Filter: React.FC<FilterProps> = ({ 
  search, 
  setSearch, 
  setPage,
  filterValues,  // Use props, not local state
  setFilterValues // Use props, not local state
}) => {
  const [adavanceFilter, setAdavanceFilter] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>(null);
  
  // REMOVE THESE DUPLICATE STATES:
  // const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  // const [creators, setCreators] = useState<any[]>([]);
  // const [totalPages, setTotalPages] = useState(1);
  // const [loading, setLoading] = useState(false);

  const dropdownRefs = useRef<{
    [key in Exclude<FilterType, null>]?: HTMLDivElement | null;
  }>({});
  const getData = async () => {
    const get = await getDecryptedSession();
    return get;
  };

  useEffect(() => {
    getData();
  }, []);

  // Remove the like button useEffect as it's also in Dashboard
  // This should only be in one place (Dashboard)
  useEffect(() => {
    const likeButtons = document.querySelectorAll("[data-like-button]");

    const handleClick = (event: Event) => {
      const button = event.currentTarget as HTMLElement;
      button.classList.toggle("liked");
    };

    likeButtons.forEach((button) => {
      button.addEventListener("click", handleClick);
    });

    return () => {
      likeButtons.forEach((button) => {
        button.removeEventListener("click", handleClick);
      });
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isClickInsideDropdown = Object.values(dropdownRefs.current).some(
        (ref) => ref && ref.contains(event.target as Node)
      );

      const target = event.target as HTMLElement;
      const isDropdownTrigger = target.closest("[data-custom-select-triger]");

      if (!isClickInsideDropdown && !isDropdownTrigger) {
        setActiveFilter(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFilterClick = (filter: FilterType) => {
    setActiveFilter((current) => (current === filter ? null : filter));
  };

  const closeAllFilters = () => {
    setActiveFilter(null);
  };

  // Update this function to use the props
const handleFilterChange = (filterName: string, value: string) => {
  setPage(1); // reset pagination
  setFilterValues((prev) => ({
    ...prev,
    [filterName]: value || "all", // keep "all" as no-filter
  }));
};

  return (
    <div className="discover-page-filters-container">
      <div
        className="content-filters-main-wrapper"
        data-content-advanced-filters-container
      >
        <div className="content-filters-head-wrapper">
          <div className="content-basic-filters-wrapper">
            <div className="content-basic-filters-container">
              <div className="content-filter-card-wrapper">
                <div className="content-filter-card">
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
                        ></path>
                        <path
                          d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M14 5H20"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M14 8H17"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search here"
                      value={search}
                    onChange={(e) => setSearch(e.target.value)} 
                    />
                  </div>
                </div>
              </div>

              <div className="content-filter-card-wrapper">
                <div className="content-filter-card">
                  <CustomSelect
                    label="All Categories"
                    options={categoryOptions}
                    value={filterValues.category || "all"}
                    onChange={(value) =>
                      handleFilterChange("category", value as string)
                    }
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                      >
                        <path
                          d="M22.4102 10.44L21.4302 14.62C20.5902 18.23 18.9302 19.69 15.8102 19.39C15.3102 19.35 14.7702 19.26 14.1902 19.12L12.5102 18.72C8.34018 17.73 7.05018 15.67 8.03018 11.49L9.01018 7.29999C9.21018 6.44999 9.45018 5.70999 9.75018 5.09999C10.9202 2.67999 12.9102 2.02999 16.2502 2.81999L17.9202 3.20999C22.1102 4.18999 23.3902 6.25999 22.4102 10.44Z"
                          stroke="none"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15.8099 19.39C15.1899 19.81 14.4099 20.16 13.4599 20.47L11.8799 20.99C7.90985 22.27 5.81985 21.2 4.52985 17.23L3.24985 13.28C1.96985 9.31001 3.02985 7.21001 6.99985 5.93001L8.57985 5.41001C8.98985 5.28001 9.37985 5.17001 9.74985 5.10001C9.44985 5.71001 9.20985 6.45001 9.00985 7.30001L8.02985 11.49C7.04985 15.67 8.33985 17.73 12.5099 18.72L14.1899 19.12C14.7699 19.26 15.3099 19.35 15.8099 19.39Z"
                          stroke="none"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M13.3901 8.53L18.2401 9.76"
                          stroke="none"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12.4102 12.4L15.3102 13.14"
                          stroke="none"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
                  />
                </div>
              </div>

              <div className="content-filter-card-wrapper">
                <div className="content-filter-card">
                  <CustomSelect
                    label="Featured"
                    options={featureOptions}
                   value={filterValues.feature || "all"}
                    onChange={(value) =>
                      handleFilterChange("feature", value as string)
                    }
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                      >
                        <path
                          d="M2.5 15.29V5.71C2.5 4.38 3.27 4.06 4.21 5L6.8 7.59C7.19 7.98 7.83 7.98 8.21 7.59L11.79 4C12.18 3.61 12.82 3.61 13.2 4L16.79 7.59C17.18 7.98 17.82 7.98 18.2 7.59L20.79 5C21.73 4.06 22.5 4.38 22.5 5.71V15.3C22.5 18.3 20.5 20.3 17.5 20.3H7.5C4.74 20.29 2.5 18.05 2.5 15.29Z"
                          stroke="none"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
                  />
                </div>
              </div>

              <div className="show-advance-filter-btn">
                <button
                  className="premium-btn"
                  data-content-advanced-filters-toggle-button
                  onClick={() => setAdavanceFilter((prev) => !prev)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                  >
                    <path
                      d="M12.125 5.25C12.5392 5.25 12.875 5.58579 12.875 6V11.25H18.125C18.5392 11.25 18.875 11.5858 18.875 12C18.875 12.4142 18.5392 12.75 18.125 12.75H12.875V18C12.875 18.4142 12.5392 18.75 12.125 18.75C11.7108 18.75 11.375 18.4142 11.375 18V12.75H6.125C5.71079 12.75 5.375 12.4142 5.375 12C5.375 11.5858 5.71079 11.25 6.125 11.25H11.375V6C11.375 5.58579 11.7108 5.25 12.125 5.25Z"
                      fill="url(#paint0_linear_1_1745)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_1_1745"
                        x1="6.17502"
                        y1="5.25"
                        x2="24.1481"
                        y2="9.632"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#FECE26" />
                        <stop offset="1" stopColor="#E5741F" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span>Advanced Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {adavanceFilter && (
          <div
            className="content-advanced-filters-wrapper"
            data-content-advanced-filters
          >
            <div className="content-advanced-filters-layout">
              <div className="content-filter-card-wrapper">
                <div className="content-filter-card">
                  <CustomSelect
                    label="All Countries"
                    options={countryOptions}
                    value={filterValues.country || "all"}
                    onChange={(value) =>
                      handleFilterChange("country", value as string)
                    }
                  />
                </div>
              </div>

              <div className="content-filter-card-wrapper">
                <div className="content-filter-card">
                  <CustomSelect
                    label="All Cities"
                    options={cityOptions}
                    value={filterValues.city || "all"}
                    onChange={(value) =>
                      handleFilterChange("city", value as string)
                    }
                  />
                </div>
              </div>

              <div className="content-filter-card-wrapper">
                <div className="content-filter-card">
                  <CustomSelect
                    label="All Body Types"
                    options={bodyTypeOptions}
                    value={filterValues.bodyType || "all"}
                    onChange={(value) =>
                      handleFilterChange("bodyType", value as string)
                    }
                  />
                </div>
              </div>

              <div className="content-filter-card-wrapper">
                <div className="content-filter-card">
                  <CustomSelect
                    label="All Sexual Orientations"
                    options={sexualOrientationOptions}
                    value={filterValues.sexualOrientation || "all"}
                    onChange={(value) =>
                      handleFilterChange("sexualOrientation", value as string)
                    }
                  />
                </div>
              </div>

              <div className="content-filter-card-wrapper">
                <div className="content-filter-card">
                  <CustomSelect
                    label="All Ages"
                    options={ageGroupOptions}
                    value={filterValues.age || "all"}
                    onChange={(value) =>
                      handleFilterChange("age", value as string)
                    }
                  />
                </div>
              </div>

              <div className="content-filter-card-wrapper">
                <div className="content-filter-card">
                  <CustomSelect
                    label="All Eye Colors"
                    options={eyeColorOptions}
                    value={filterValues.eyeColor || "all"}
                    onChange={(value) =>
                      handleFilterChange("eyeColor", value as string)
                    }
                  />
                </div>
              </div>
              <div className="content-filter-card-wrapper">
                <div className="content-filter-card">
                  <CustomSelect
                    label="All Hair Colors"
                    options={hairColorOptions}
                    value={filterValues.hairColor || "all"}
                    onChange={(value) =>
                      handleFilterChange("hairColor", value as string)
                    }
                  />
                </div>
              </div>

              <div className="content-filter-card-wrapper">
                <div className="content-filter-card">
                  <CustomSelect
                    label="All Ethnicities"
                    options={ethnicityOptions}
                    value={filterValues.ethnicity || "all"}
                    onChange={(value) =>
                      handleFilterChange("ethnicity", value as string)
                    }
                  />
                </div>
              </div>

              <div className="content-filter-card-wrapper">
                <div className="content-filter-card">
                  <CustomSelect
                    label="All Heights"
                    options={heightOptions}
                    value={filterValues.height || "all"}
                    onChange={(value) =>
                      handleFilterChange("height", value as string)
                    }
                  />
                </div>
              </div>

              <div className="content-filter-card-wrapper">
                <div className="content-filter-card">
                  <CustomSelect
                    label="All Styles"
                    options={styleOptions}
                    value={filterValues.style || "all"}
                    onChange={(value) =>
                      handleFilterChange("style", value as string)
                    }
                  />
                </div>
              </div>
              <div className="content-filter-card-wrapper">
                <div className="content-filter-card">
                  <CustomSelect
                    label="All Sizes"
                    options={sizeOptions}
                    value={filterValues.size || "all"}
                    onChange={(value) =>
                      handleFilterChange("size", value as string)
                    }
                  />
                </div>
              </div>

              <div className="content-filter-card-wrapper">
                <div className="content-filter-card">
                  <CustomSelect
                    label="All Popularity"
                    options={popularityOptions}
                    value={filterValues.popularity || "all"}
                    onChange={(value) =>
                      handleFilterChange("popularity", value as string)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
