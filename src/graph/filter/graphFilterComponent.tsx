import { ChangeEvent, memo, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlinePlus } from "react-icons/hi2";
import { shallowEqual, useDispatch } from "react-redux";
import { FilterApi } from "../../apis/FilterApi";
import {
  GetFilterLogic,
  GetFilterLogicForText,
  GetFilterType,
  GraphFilterType,
} from "../../enums/graph-filter-type-enums";
import { ModalName } from "../../enums/modalName";
import GraphFilterSave from "../../modal/GraphFilter/GraphFilterSave";
import { useAppSelector } from "../../stores/redux-store";
import { importEntitiesModalsliceActions } from "../../stores/slices/entitiesModalSlice";
import { ChartFilterDTO, FilterItemDTO } from "../../types/filterTypes";
import { GraphControlUtils } from "../../utils/graph-utils/graph-control-utils";
import FilterUiComponent from "./filterUiComponent";

export type FilterType = {
  id: string;
  type: string;
  entity: string;
  logic: string;
  value: string;
};

export type dropdownType = {
  label: string;
  value: string;
  CreatedDateTime?: Date;
};

export type FilterWithOption = { option: dropdownType; filters: FilterType[] };

const GraphFilterComponent = () => {
  const dispatch = useDispatch();

  const currentSelectedModal = useAppSelector(
    (state) => state.modals.type,
    shallowEqual
  );

  const currentSelectedChartId = useAppSelector(
    (state) => state.chart.selectedChartId,
    shallowEqual
  );

  const defaultFilter: FilterType = {
    id: new Date().getTime().toString(36),
    entity: "all",
    logic: "",
    value: "",
    type: "",
  };

  const [filterlist, setfilterlist] = useState<FilterType[]>([defaultFilter]);
  const savedFilterData = useAppSelector((state) => state.graph.filter);

  useEffect(() => {
    setfilterlist(
      savedFilterData?.length > 0 ? savedFilterData : [defaultFilter]
    );
  }, [savedFilterData]);

  //#region filter modal
  const [loader, setloader] = useState<boolean>(false);
  const [filterName, setfilterName] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleClose = () => {
    resetState();

    dispatch(importEntitiesModalsliceActions.removeModal());
  };

  function resetState() {
    setfilterName("");
    setError("");
    setloader(false);
    setfilterlist([defaultFilter]);
  }

  const handleOnChartChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setfilterName(value);
  };

  const onSaveFilter = async () => {
    setloader(() => true);
    const body: ChartFilterDTO = {
      Id: 0,
      Name: filterName,
      ChartId: Number(currentSelectedChartId),
      CreatedDate: new Date(),
      FilterItemDTOs: filterlist.map((filter) => {
        return {
          Id: 0,
          EntityName: filter.entity,
          Logic: filter.logic,
          Value: filter.value,
          Type: filter.type,
          ChartFilterId: Number(currentSelectedChartId),
        } as unknown as FilterItemDTO;
      }),
    };

    await FilterApi.postFilter(body)
      .then(() => {
        resetGraphFilter();
        handleClose();
        toast.success("New filter added");
      })
      .catch((err) => {
        toast.error(err.response.message ?? "Filter save failed");
      })
      .finally(() => setloader(() => false));
  };

  const resetGraphFilter = async () => {
    resetState();
    await GraphControlUtils.SyncGraphFilter(true);
  };

  //#endregion

  const nodes = GraphControlUtils.GraphEntities();

  const nodeName: dropdownType[] = nodes.map(
    (node) =>
      ({
        label: node.name,
        value: node.id,
      } as dropdownType)
  );

  const nodeType: dropdownType[] = nodes
    .map((node) => {
      if (node.businessType === undefined || node.businessType === "")
        return null;
      return {
        label: node.businessType,
        value: node.businessType,
      } as dropdownType;
    })
    .filter(
      (value, index, self) =>
        value !== null &&
        self.findIndex((v) => v?.value === value?.value) === index
    );

  const nodeCode: dropdownType[] = nodes
    .map(
      (node) =>
        ({
          label: node.entityCode,
          value: node.entityCode,
        } as dropdownType)
    )
    .filter((value) => value?.value !== undefined && value?.value !== "");

  const nodeJurisdiction: dropdownType[] = nodes
    .map((node) => {
      if (
        node.incorporationJurisdiction === undefined ||
        node.incorporationJurisdiction === ""
      )
        return null;

      return {
        label: node.incorporationJurisdiction,
        value: node.incorporationJurisdiction,
      } as dropdownType;
    })
    .filter(
      (value, index, self) =>
        value !== null &&
        self.findIndex((v) => v?.value === value?.value) === index
    );

  const nodeSubNational: dropdownType[] = nodes
    .map((node) => {
      if (node.subNational === undefined || node.subNational === "")
        return null;

      return {
        label: node.subNational,
        value: node.subNational,
      } as dropdownType;
    })
    .filter(
      (value, index, self) =>
        value !== null &&
        self.findIndex((v) => v?.value === value?.value) === index
    );

  const nodeTax: dropdownType[] = nodes
    .map((node) => {
      if (
        node.taxResidenceJurisdiction === undefined ||
        node.taxResidenceJurisdiction === ""
      )
        return null;

      return {
        label: node.taxResidenceJurisdiction,
        value: node.taxResidenceJurisdiction,
      } as dropdownType;
    })
    .filter(
      (value, index, self) =>
        value !== null &&
        self.findIndex((v) => v?.value === value?.value) === index
    );

  const nodeOption = [...nodeName];
  nodeOption.unshift({ label: "all", value: "all" });

  const filterSelectorData = GetFilterLogic();
  const filterSelectorDataForText = GetFilterLogicForText();

  const filterType = GetFilterType();

  const AddFilter = () => {
    const key = new Date().getTime().toString(36);

    const value: FilterType = {
      id: key,
      entity: "all",
      logic: "",
      value: "",
      type: "",
    };

    setfilterlist((i) => [...i, value]);
  };
  const onChageFilterData = (data: FilterType) => {
    const changed = filterlist.map((item) => {
      if (item.id === data.id) {
        return {
          ...item,
          entity: data.entity,
          logic: data.logic,
          value: data.value,
          type: data.type,
        };
      }

      return item;
    });

    setfilterlist((_) => changed);
  };
  const RemoveFilter = (id: string) => {
    const data = [...filterlist];

    const removed = data.filter((x) => x.id != id);

    if (removed.length === 0) {
      removed.push(defaultFilter);
      GraphControlUtils.SyncGraphFilter();
      toast.success("filter has been cleared");
    }

    setfilterlist(removed);
  };

  // todo: need to discuss this
  // const cleanFilter = () => {
  //   setfilterlist(() => [defaultFilter]);

  //   onResetFilter();
  // };

  const onApplyFilter = () => {
    Filter(filterlist);
  };

  // const onResetFilter = () => {
  //   Filter([]);
  // };

  const isInvalidFilter = () => {
    return filterlist.some((filter) =>
      filter.type === GraphFilterType.OwnershipPercentage
        ? // filter.entity === "" ||
          !filter.type ||
          filter.logic === "" ||
          !filter.value.toString() ||
          Number(filter.value) < 0 ||
          Number(filter.value) > 100
        : filter.logic === "" || filter.type === "" || !filter.value
    );
  };

  function Filter(filter: FilterType[]) {
    // set graph filter option on redux state and make effect in view
    const mapFilter: FilterType[] = filter.map((item) => ({
      id: item.id,
      entity: item.entity,
      logic: item.logic,
      value: item.value?.trim(),
      type: item.type,
    }));

    GraphControlUtils.SetGraphFilter(mapFilter);
  }

  function OpenSaveFilterModal() {
    dispatch(
      importEntitiesModalsliceActions.updateModalType(
        ModalName.GraphFilter_Save
      )
    );
  }

  return (
    <div className="flex flex-col justify-between h-full overflow-y-auto">
      <aside className="flex flex-col h-fit overflow-y-auto scrollbar">
        <div className="flex flex-col flex-grow gap-[13px]">
          {filterlist.map((data) => (
            <FilterUiComponent
              key={data.id}
              data={data}
              RemoveFilter={RemoveFilter}
              nodeOption={nodeOption}
              filterSelectorData={filterSelectorData}
              filterSelectorDataForText={filterSelectorDataForText}
              filterType={filterType}
              onChageFilterData={onChageFilterData}
              options={{
                nodeCodes: nodeCode,
                nodeNames: nodeName,
                nodeJurisdiction: nodeJurisdiction,
                nodeSubNational: nodeSubNational,
                nodeType: nodeType,
                nodeTax: nodeTax,
              }}
              filterlistLength={filterlist.length}
            />
          ))}
        </div>
        <div className="flex pt-[13px]">
          <button
            className="reg-tertiary-button-brand button-medium w-100 flex justify-center items-center"
            onClick={AddFilter}
            disabled={isInvalidFilter()}
          >
            <HiOutlinePlus className="w-4 h-4" />
            <span className="pl-1">Add New</span>
          </button>
        </div>
        {currentSelectedModal === ModalName.GraphFilter_Save && (
          <GraphFilterSave
            chart={filterName}
            error={error}
            handleClose={handleClose}
            handleOnChartChange={handleOnChartChange}
            loader={loader}
            handleModal={onSaveFilter}
          />
        )}
      </aside>
      <aside className="flex  justify-center border-start gap-3 mt-auto py-3">
        <button
          className="reg-secondary-button-brand button-small"
          type="submit"
          disabled={filterlist.length == 0 || isInvalidFilter()}
          onClick={OpenSaveFilterModal}
        >
          Save Filter
        </button>
        <button
          onClick={onApplyFilter}
          className="reg-primary-button-brand button-small"
          type="submit"
          disabled={filterlist.length == 0 || isInvalidFilter()}
        >
          Apply
        </button>
      </aside>
    </div>
  );
};
export default memo(GraphFilterComponent);
