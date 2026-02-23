import type { FilterType, dropdownType } from "./graphFilterComponent";
import {
  AutoComplete,
  InputGroup,
  InputNumber,
  SelectPicker,
  Tooltip,
  Whisper,
} from "rsuite";
import { ValidPercentage } from "../../utils/extention/stringExtention";
import { GraphFilterType } from "../../enums/graph-filter-type-enums";
import TrashIcon from "../../assets/icons/TrashIcon";
import { useMemo, useState } from "react";
import { createIconMapForFilters } from "../../utils/graph-utils/GraphUiUtils";
import { RiSearch2Line } from "react-icons/ri";
import DeleteMessageModal from "../../modal/message-modal/DeleteMessageModal";

export type FilterOptionsData = {
  nodeCodes: dropdownType[];
  nodeNames: dropdownType[];
  nodeJurisdiction: dropdownType[];
  nodeSubNational: dropdownType[];
  nodeType: dropdownType[];
  nodeTax: dropdownType[];
};

export type filterUiProps = {
  data: FilterType;
  RemoveFilter: (id: string) => void;
  nodeOption: dropdownType[];
  filterSelectorData: dropdownType[];
  filterSelectorDataForText: dropdownType[];
  filterType: dropdownType[];
  options: FilterOptionsData;
  onChageFilterData: (data: FilterType) => void;
  filterlistLength: number;
};

export default function FilterUiComponent(props: filterUiProps) {
  const [showDeleteMessage, setShowDeleteMessage] = useState<boolean>(false);
  const filterOptions = useMemo(
    () =>
      props.data.type === GraphFilterType.OwnershipPercentage
        ? props.filterSelectorData
        : props.filterSelectorDataForText,
    [props.data.type, props.filterSelectorData, props.filterSelectorDataForText]
  );
  
  const graphFilterIconMap = useMemo(() => {
    return createIconMapForFilters(filterOptions);
  }, [filterOptions]);

  // Derive selected filter option from props.data.logic or default to first option
  const selectedFilterOption = useMemo(() => {
    if (props.data.logic && filterOptions.length > 0) {
      const found = filterOptions.find(option => option.value === props.data.logic);
      return found || filterOptions[0];
    }
    return filterOptions.length > 0 ? filterOptions[0] : { label: "", value: "" };
  }, [filterOptions, props.data.logic]);

  const handleFilterSelect = (selectedFilter: dropdownType) => {
    props.onChageFilterData({
      ...props.data,
      logic: selectedFilter.value ?? "",
    });
  };

  return (
    <div className="bg-reg-white rounded border flex flex-col relative">
      <div className="filter-component-header flex justify-between px-3 py-2">
        <div className="text-14-medium text-reg-gray-500">Filter Item</div>
            <DeleteMessageModal
                title={"Delete Filter Item"}
                message={`Are you sure you want to delete Filter Item?`}
                okButtonCallback={async () => {
                  props.RemoveFilter(props.data.id);
                  setShowDeleteMessage(false);
                }}
                cancelButtonCallback={() => {
                  setShowDeleteMessage(false);
                }}
                isOpen={showDeleteMessage}
              />
      {props.filterlistLength > 1 && (
        <TrashIcon
          className="red-transition w-5 h-5"
          onClick={() => setShowDeleteMessage(true)}
        />
        )}
      </div>
      

      <div className="pt-4 pb-2 flex flex-col gap-3 px-[14px]">
        <SelectPicker
          className={`w-full placeholder:text-reg-gray-500 ${
            !props.data.type ? "rounded rounded-3" : ""
          }`}
          data={props.filterType}
          placeholder="select filter type *"
          value={props.data.type}
          onChange={(value) =>
            props.onChageFilterData({
              ...props.data,
              type: value ?? "",
              entity: "all",
              logic: "",
              value: "",
            })
          }
          placement="auto"
        ></SelectPicker>

        <div className="filter-component-button-group flex flex-col w-100">
          <div className="flex flex-row h-8">
            {filterOptions.map((filterOption, index) => {
              return (
                <Whisper
                  placement="auto"
                  trigger="hover"
                  speaker={
                    <Tooltip className="custom-rs-tooltip bg-reg-white border border-reg-gray-300 text-reg-gray-900 shadow-md">
                      {filterOption.value}
                    </Tooltip>
                  }
                >
                  <button
                    key={index}
                    id={`filter-option-${index}`}
                    className={`secondary-neutral-button-transition-with-bg px-3 py-[6px] h-full \
                    ${
                      selectedFilterOption.value === filterOption.value
                        ? "bg-reg-blue-100 border border-reg-blue-500"
                        : "border border-reg-gray-300 "
                    } \
                    ${index === 0 ? "rounded-l-md " : ""} \
                    ${
                      index === filterOptions.length - 1 ? "rounded-r-md " : ""
                    } \
                    ${
                      index !== 0 &&
                      index !== filterOptions.length - 1 &&
                      !(selectedFilterOption.value === filterOption.value)
                        ? "border-l-0 border-r-0"
                        : ""
                    }
                    `}
                    onClick={() => handleFilterSelect(filterOption)}
                  >
                    {graphFilterIconMap.get(filterOption.value)}
                  </button>
                </Whisper>
              );
            })}
          </div>

          <div className="text-reg-blue-500 text-[10px] font-medium pt-[2px]">
            {selectedFilterOption.value}
          </div>
        </div>

        {props.data.type === GraphFilterType.OwnershipPercentage && (
          <div className="pb-6 relative">
            <InputNumber
              className="custom-input-number-override w-full"
              max={100}
              min={0}
              step={0.01}
              value={props.data.value}
              placeholder="0"
              onChange={(value) => {
                if (value && !ValidPercentage(value as string)) return;
                props.onChageFilterData({
                  ...props.data,
                  value: value as string,
                });
              }}
            />
            <div className="absolute right-8 top-[20px] transform -translate-y-1/2 pointer-events-none text-reg-gray-500">
              %
            </div>
          </div>
        )}

        {props.data.type !== GraphFilterType.OwnershipPercentage && (
          <div className="pb-4">
            <InputGroup className="input-small px-0" inside>
              <InputGroup.Addon>
                <RiSearch2Line className="h-[18px] w-[18px] text-reg-gray-500 flex-shrink-0" />
              </InputGroup.Addon>
              <AutoComplete
                className={`${!props.data.value ? "rounded rounded-3 " : ""}`}
                data={
                  props.data.type === GraphFilterType.EntityName
                    ? props.options.nodeNames
                    : props.data.type === GraphFilterType.ID
                    ? props.options.nodeCodes
                    : props.data.type ===
                      GraphFilterType.IncorporationJurisdiction
                    ? props.options.nodeJurisdiction
                    : props.data.type === GraphFilterType.SubNational
                    ? props.options.nodeSubNational
                    : props.data.type === GraphFilterType.Type
                    ? props.options.nodeType
                    : props.data.type === GraphFilterType.TaxResidence
                    ? props.options.nodeTax
                    : []
                }
                placeholder="Search *"
                value={props.data.value}
                onChange={(value) =>
                  props.onChageFilterData({
                    ...props.data,
                    value: value ?? "",
                  })
                }
                placement="auto"
              />
            </InputGroup>
          </div>
        )}
      </div>
    </div>
  );
}
