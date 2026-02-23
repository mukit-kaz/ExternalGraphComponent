import { useAppSelector } from "../../stores/redux-store";
import { useDispatch } from "react-redux";
import { importEntitiesModalsliceActions } from "../../stores/slices/entitiesModalSlice";
import { ModalName } from "../../enums/modalName";
import { FilterType, FilterWithOption } from "./graphFilterComponent";
import GraphFilterEdit from "../../modal/GraphFilter/GraphFilterEdit";
import { memo, useEffect, useState } from "react";
import { orgchartActions } from "../../stores/slices/orgchartSlice";
import GraphFilterRemove from "../../modal/GraphFilter/GraphFilterRemove";
import { GraphControlUtils } from "../../utils/graph-utils/graph-control-utils";
import { FilterApi } from "../../apis/FilterApi";
import { ChartFilterDTO, FilterItemDTO } from "../../types/filterTypes";
import toast from "react-hot-toast";
import {
  FormattedDate,
  IsSameDate,
} from "../../utils/extention/stringExtention";
import { DatePicker, Input, InputGroup } from "rsuite";
import EditIcon from "../../assets/icons/EditIcon";
import TrashIcon from "../../assets/icons/TrashIcon";
import { RiSearch2Line } from "react-icons/ri";
import CalendarIcon from "../../assets/icons/CalendarIcon";
import NoSavedFilters from "../../assets/graphics/NoSavedFilters";

const FilterSavedComponent = () => {
  const dispatch = useDispatch();
  const chartId = useAppSelector((store) => store.chart.selectedChartId);

  //#region filter modal
  const [loader, setloader] = useState<boolean>(false);

  const handleClose = () => {
    resetState();

    dispatch(importEntitiesModalsliceActions.removeModal());
  };

  function resetState() {
    setloader(false);
    setOption({ option: { label: "", value: "" }, filters: [] });
  }

  const onSaveFilter = async () => {
    setloader(() => true);
    const body: ChartFilterDTO = {
      Id: Number(option?.option.value),
      Name: option?.option.label,
      ChartId: Number(chartId),
      CreatedDate: new Date(),
      FilterItemDTOs: option?.filters.map((filter) => {
        return {
          Id: filter.id,
          EntityName: filter.entity,
          Logic: filter.logic,
          Value: filter.value,
          Type: filter.type,
          ChartFilterId: Number(chartId),
        } as unknown as FilterItemDTO;
      }),
    };

    await FilterApi.postFilter(body)
      .then(async () => {
        await GraphControlUtils.UpgradeFilterOption();
        GraphControlUtils.GraphFilterd();
        handleClose();
        toast.success("filter saved");
      })
      .catch((err) => {
        toast.error(err.response.data.Message ?? "filter save failed");
        setloader(() => true);
      })
      .finally(() => setloader(() => false));
  };

  //#endregion

  const optionWithFilter = useAppSelector((x) => x.graph.filterOptions);
  const filterId = useAppSelector((x) => x.graph.filterId);
  const selectedModal = useAppSelector((x) => x.modals.type);
  const [option, setOption] = useState<FilterWithOption>();
  const [filterData, setFilterData] =
    useState<FilterWithOption[]>(optionWithFilter);
  const [searchFilter, setsearchFilter] = useState<string>();
  const [filterDateTime, setfilterDateTime] = useState<Date>();

  const onEdit = (value: FilterWithOption) => {
    setOption(value);

    dispatch(
      importEntitiesModalsliceActions.updateModalType(
        ModalName.GraphFilter_Edit
      )
    );
  };

  const onChageFilterData = (updatedFilter: FilterType) => {
    setOption((prevOption) => {
      if (!prevOption) {
        return prevOption;
      }

      const updatedFilters = prevOption.filters.map((filter) =>
        filter.id === updatedFilter.id
          ? {
              ...filter,
              entity: updatedFilter.entity,
              logic: updatedFilter.logic,
              value: updatedFilter.value,
              type: updatedFilter.type,
            }
          : filter
      );

      return { ...prevOption, filters: updatedFilters };
    });

    // resetGraphFilter();
  };

  const onChageFilterOption = (value: string) => {
    setOption((prevOption) => {
      if (!prevOption) {
        return prevOption;
      }

      const updatedOption = { ...prevOption.option };

      updatedOption.label = value;

      return { ...prevOption, option: updatedOption };
    });

    // resetGraphFilter();
  };

  const RemoveFilter = (id: string) => {
    setOption((prevOption) => {
      if (!prevOption) {
        return prevOption;
      }

      const updatedFilters = prevOption.filters.filter(
        (filter) => filter.id !== id
      );

      return { ...prevOption, filters: updatedFilters };
    });

    // resetGraphFilter();
  };

  const RemoveFilterOption = (value: FilterWithOption) => {
    setOption(value);

    dispatch(
      importEntitiesModalsliceActions.updateModalType(
        ModalName.GraphFilter_Remove
      )
    );
  };
  const handleFilterOptionRemoved = async () => {
    setloader(() => true);

    await FilterApi.removeFilter(Number(option?.option.value))
      .then((res) =>
        toast.success(
          res.data.message ?? `${option?.option.label} filter removed`
        )
      )
      .catch((err) =>
        toast.error(
          err.response.message ?? `${option?.option.label} filter remove failed`
        )
      )
      .finally(() => setloader(() => false));

    handleClose();

    resetGraphFilter(true);
  };

  const handleSelectFilterFromOption = (value: FilterWithOption) => {
    setOption(() => value);

    dispatch(orgchartActions.OnFilterOptionChange({ option: value }));

    GraphControlUtils.GraphFilterd();
  };

  const resetGraphFilter = async (isSyncOnline: boolean = false) => {
    await GraphControlUtils.SyncGraphFilter(isSyncOnline);
  };

  const handleSearchChange = (value) => {
    setsearchFilter(value);
  };

  useEffect(() => {
    onSyncChanges();
  }, [filterDateTime, searchFilter, optionWithFilter]);

  const handleDateChange = (value: Date) => {
    setfilterDateTime(value);
  };

  const onSyncChanges = () => {
    let filterOption = [...optionWithFilter];

    if (searchFilter) {
      filterOption = filterOption.filter((filter) =>
        filter.option.label.toLowerCase().includes(searchFilter.toLowerCase())
      );
    }

    if (filterDateTime) {
      filterOption = filterOption.filter((filter) =>
        IsSameDate(filter.option.CreatedDateTime, filterDateTime)
      );
    }

    setFilterData(filterOption);
  };

  return (
    <aside className="h-full">
      {optionWithFilter?.length > 0 && (
        <div className=" bg-reg-white rounded-md flex flex-col gap-3 pb-6 px-[14px] pt-[8.5px]">
          <div className="text-reg-gray-500 text-14-medium">Filter Item</div>
          <div className="mb-2">
            <InputGroup className="h-8" inside>
              <InputGroup.Addon>
                <RiSearch2Line className="h-4.5 w-4.5 text-reg-gray-500 flex-shrink-0" />
              </InputGroup.Addon>
              <Input
                placeholder="Search filter by name"
                onChange={handleSearchChange}
                className=""
              />
            </InputGroup>
          </div>
          <div className="mb-2">
            <DatePicker
              prefix="date-picker"
              className="w-full h-8"
              oneTap
              value={filterDateTime}
              onChange={handleDateChange}
              placeholder="Filter by date"
              format="yyyy-MM-dd"
              caretAs={() => (
                <CalendarIcon className="h-5 w-5 text-reg-gray-500" />
              )}
            />
          </div>
        </div>
      )}

      <div
        className={`saved-filter-cards overflow-y-auto h-2/3 mt-2 scrollbar ${
          filterData.length === 0 ? "hidden" : ""
        }`}
      >
        {filterData?.map((option) => {
          return (
            <div
              key={option.option.value}
              className={`
                filter-card group
                  p-3 filter-card-transition flex flex-row justify-between
                  ${
                    option.option.value === filterId
                      ? "bg-reg-blue-100 active:border-b border-reg-blue-300"
                      : ""
                  }
                `}
              onClick={() => handleSelectFilterFromOption(option)}
            >
              <div className="saved-filter-card-texts">
                <p
                  className={`break-all text-14-medium
                    ${
                      option.option.value === filterId
                        ? "text-reg-blue-600"
                        : "text-reg-gray-600"
                    }`}
                >
                  {option.option.label}
                </p>

                <p className="text-reg-gray-500 text-13-medium">
                  {`Saved on ${FormattedDate(
                    option.option.CreatedDateTime.toString()
                  )}`}
                </p>
              </div>

              <div className="pr-2 saved-filter-card-actions flex justify gap-3 w-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <EditIcon
                  className="reg-edit-icon-button w-4.5 h-4.5"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(option);
                  }}
                />
                <TrashIcon
                  className="reg-delete-icon-button w-4.5 h-4.5"
                  onClick={(e) => {
                    e.stopPropagation();
                    RemoveFilterOption(option);
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {filterData?.length === 0 && (
        <div className="w-full h-3/5 flex flex-col items-center justify-center gap-4">
          <NoSavedFilters className="w-20 h-20" />
          <p className="text-14-medium text-reg-gray-600">
            No Saved Filters Available
          </p>
        </div>
      )}

      {selectedModal === ModalName.GraphFilter_Edit && (
        <GraphFilterEdit
          handleClose={handleClose}
          loader={loader}
          handleModal={onSaveFilter}
          option={option}
          onChageFilterData={onChageFilterData}
          onChageFilterOption={onChageFilterOption}
          RemoveFilter={RemoveFilter}
        />
      )}

      {selectedModal === ModalName.GraphFilter_Remove && (
        <GraphFilterRemove
          filterName={option?.option.label ?? ""}
          handleClose={handleClose}
          loader={loader}
          handleModal={handleFilterOptionRemoved}
        />
      )}
    </aside>
  );
};
export default memo(FilterSavedComponent);
