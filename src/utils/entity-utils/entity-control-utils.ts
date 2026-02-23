import { AxiosResponse } from "axios";
import { EntityApi } from "../../apis/EntityApi";
import { NodeType } from "../../graph/type/type";
import { appStore } from "../../stores/redux-store";
import { EntitySliceActions } from "../../stores/slices/entity-slice";
import {
  AddEntityRequestType,
  Entity,
  EntityTax,
  GetTpEntityListByChartIdResponseType,
  OwnerInfoDisplayType,
  OwnerShip,
} from "../../types/entity-types";
import { PageControlUtils } from "../extention/PageControlUtils";

export class EntityControlUtils {
  static getEntitiesAndOwnershisByChartId = async (chartId: string) => {
    PageControlUtils.LoaderTurnOn();

    const entityOwnershipResponseData = (await EntityApi.getEntityListByChartId(
      chartId
    )) ?? {
      data: [] as Entity[],
    };

    const entities: Entity[] = entityOwnershipResponseData.data.map(
      (entity) => {
        return {
          entityId: entity.Name,
          databaseId: entity.Id.toString(),
          entityName: entity.Name,
          incorporationJurisdiction: entity.IncorporationJurisdiction,
          entityType: entity.EntityType,
          entityCode: entity.Code,
          chartId: entity.ChartId.toString(),
          businessType: entity.BusinessType,
          taxResidenceJurisdiction: entity.TaxResidenceJurisdiction,
          subNational: entity.SubNational,
          sicCode: entity.BusinessSICCode,
          entityTaxList: entity.EntityTaxList.map((entityTax) => {
            return {
              taxCharactherizationId:
                entityTax.TaxCharacterizationId.toString(),
              name: entityTax.Name,
              description: entityTax?.Description,
              isChecked: entityTax.IsChecked,
              IsDefault: entityTax.IsDefault,
            };
          }),
        };
      }
    );

    const ownerships: OwnerShip[] = entityOwnershipResponseData.data.flatMap(
      (entity) => {
        return entity.EntityOwnerList.map((owner) => {
          return {
            ownershipId: entity.Name + owner.OwnerName,
            ownerId: owner.OwnerName,
            ownedId: entity.Name,
            ownershipPercentage: owner.OwnerPercentage,
            ownerName: owner.OwnerName,
            ownershipName: owner.OwnerName,
            ownedName: entity.Name,
          };
        });
      }
    );

    appStore.dispatch(EntitySliceActions.setEntities(entities));
    appStore.dispatch(EntitySliceActions.setOwnerships(ownerships));

    PageControlUtils.LoaderTurnOff();
  };

  static getTpEntitiesAndOwnershisByChartId = async (chartId: string) => {
    let entityOwnershipResponseData:
      | AxiosResponse<GetTpEntityListByChartIdResponseType[], any>
      | { data: GetTpEntityListByChartIdResponseType[] } = {
      data: [] as GetTpEntityListByChartIdResponseType[],
    };

    try {
      PageControlUtils.LoaderTurnOn();

      entityOwnershipResponseData =
        chartId === "00"
          ? {
              data: [] as GetTpEntityListByChartIdResponseType[],
            }
          : (await EntityApi.getEntityTpViewListByChartId(chartId)) ?? {
              data: [] as GetTpEntityListByChartIdResponseType[],
            };
    }
    catch (error) {
      entityOwnershipResponseData = {
        data: [] as GetTpEntityListByChartIdResponseType[],
      };
    }
     finally {
      const entities: Entity[] = entityOwnershipResponseData.data.map(
        (entity) => {
          return {
            entityId: entity.Name,
            databaseId: entity.Id.toString(),
            entityName: entity.Name,
            incorporationJurisdiction: entity.IncorporationJurisdiction,
            entityType: entity.EntityType,
            entityCode: entity.Code,
            chartId: entity.ChartId.toString(),
            businessType: entity.BusinessType,
            taxResidenceJurisdiction: entity.TaxResidenceJurisdiction,
            subNational: entity.SubNational,
            sicCode: entity.BusinessSICCode,
            countryControlRemark: entity.CountryControlRemark,
          };
        }
      );

      const ownerships: OwnerShip[] = entityOwnershipResponseData.data.flatMap(
        (entity) => {
          return entity.EntityOwnerList.map((owner) => {
            return {
              ownershipId: `${owner.EntityId}_${owner.OwnerId}`,
              ownerId: entity.Name,
              ownedId: owner.OwnerName,
              ownershipPercentage: owner.OwnerPercentage,
              ownerName: entity.Name,
              ownershipName: entity.Name,
              ownedName: owner.OwnerName,
            };
          });
        }
      );

      appStore.dispatch(EntitySliceActions.setEntities(entities));
      appStore.dispatch(EntitySliceActions.setOwnerships(ownerships));

      PageControlUtils.LoaderTurnOff();
    }
  };

  static getEntityNamesAndIds(
    entities: Entity[] = appStore.getState().entity.entities
  ) {
    return entities.map((entity) => {
      return {
        entityId: entity.entityId,
        entityName: entity.entityName,
      };
    });
  }

  static resetEntitiesAndOwnerships() {
    appStore.dispatch(EntitySliceActions.resetEntitiesAndOwnerships());
  }

  static async getEntityDefaultTctList(): Promise<EntityTax[]> {
    const entityDefaultTctListResponseData =
      await EntityApi.getEntityDefaultTctList();

    const entityDefaultTctList: EntityTax[] =
      entityDefaultTctListResponseData.data.map((entityTct) => {
        return {
          taxCharactherizationId: entityTct.Id.toString(),
          name: entityTct.Name,
          description: entityTct.Description,
          isChecked: false,
          IsDefault: entityTct.IsDefault,
        };
      });

    return entityDefaultTctList;
  }

  static getEntities() {
    return appStore.getState().entity.entities;
  }
  static getChart(chartId: string) {
    return appStore.getState().chart?.chartList?.find(x=>x.chartId===chartId);
  }
  
  static getGraph() {
    return appStore.getState().graph;
  }

  static getOwnerships() {
    return appStore.getState().entity.ownerships;
  }
  // static getEntitiesAndCount(lowerIndex: number, upperIndex: number) {
  //   const entities = appStore.getState().entity.entities;

  //   // Later on, make an API call here and store the result in the store, for now, we are just fetching the entities from the store
  //   return {
  //     entities: entities.slice(lowerIndex, upperIndex),
  //     count: entities.length,
  //   };
  // }

  static addOrUpdateEntityAndOwnerships(
    addedEntity: Entity,
    addedOwnerships: OwnerShip[],
    selectedChartId: string,
    operationType: "add" | "update" = "add"
  ) {
    const addEntityRequestBody: AddEntityRequestType = {
      Id: operationType === "add" ? 0 : parseInt(addedEntity.databaseId!),
      Code: addedEntity.entityCode ?? "",
      Name: addedEntity.entityName,
      IncorporationJurisdiction: addedEntity.incorporationJurisdiction,
      SubNational: addedEntity.subNational ?? "",
      BusinessType: addedEntity.businessType ?? "",
      BusinessSICCode: addedEntity.sicCode ?? "",
      TaxResidenceJurisdiction: addedEntity.taxResidenceJurisdiction ?? "",
      ChartId: parseInt(selectedChartId),
      EntityOwnerDTOList: addedOwnerships.map((ownership) => {
        return {
          OwnerName: ownership.ownerName ?? ownership.ownerId,
          OwnerPercentage: ownership.ownershipPercentage,
        };
      }),
      EntityTaxDTOList:
        addedEntity?.entityTaxList?.map((entityTax) => {
          return {
            TaxCharacterizationId: parseInt(entityTax.taxCharactherizationId),
            Name: entityTax.name,
            Description: entityTax?.description,
            IsChecked: entityTax.isChecked,
          };
        }) ?? [],
    };

    const apiResponse =
      EntityApi.updateEntityAndOwnership(addEntityRequestBody);

    return apiResponse;
  }

  static async deleteEntity(entity: Entity) {
    const apiResponse = await EntityApi.deleteEntity(
      entity.chartId,
      entity.databaseId!
    ).then((response) => {
      if (response.status === 200 && response.data.ChildList.length === 0) {
        appStore.dispatch(EntitySliceActions.deleteEntities([entity]));
        appStore.dispatch(
          EntitySliceActions.deleteEntitiesFromOwnershipList([entity])
        );
      }
      return response;
    });

    return apiResponse;
  }

  // Old
  // static syncTpView(chartId: string) {
  //   try {
  //     return EntityApi.syncTpView(chartId);
  //   } catch (err) {
  //     return;
  //   }
  // }

  // New 
  static syncTpView(chartId: string) {
    return EntityApi.syncTpView(chartId).catch((err) => {
      console.error("Error during syncTpView:", err); // Log the error
      return; // Silently handle the error, returning undefined
    });
  }
  

  static setNewlyAddedEntityDatabaseIds(databaseIds: string[]) {
    appStore.dispatch(
      EntitySliceActions.setNewlyAddedEntityDatabaseIds(databaseIds)
    );
  }

  static addEntity(entity: Entity) {
    appStore.dispatch(EntitySliceActions.addEntity(entity));
  }

  static getOwnedOwnerships(entity: Entity) {
    const allOwnerships = appStore.getState().entity.ownerships;

    const filteredOwnerships = allOwnerships.filter(
      (ownership) => ownership.ownedId === entity.entityId
    );

    return filteredOwnerships;
  }

  static getOwnedOwnershipsForTpView(entity: Entity) {
    const allOwnerships = appStore.getState().entity.ownerships;

    const filteredOwnerships = allOwnerships.filter(
      (ownership) => ownership.ownerId === entity?.entityId
    );

    return filteredOwnerships;
  }

  static addOwnerships(ownerships: OwnerShip[]) {
    appStore.dispatch(EntitySliceActions.addOwnerships(ownerships));
  }

  static updateEntity(entity: Entity) {
    appStore.dispatch(EntitySliceActions.updateEntity(entity));
  }

  static setNewlyAddedEntityAndOwnership(
    entity: Entity,
    ownerships: OwnerShip[]
  ) {
    appStore.dispatch(
      EntitySliceActions.setNewlyAddedEntityAndOwnership({
        entity,
        ownerships,
      })
    );
  }

  static resetNewlyAddedEntityAndOwnership() {
    appStore.dispatch(EntitySliceActions.resetNewlyAddedEntityAndOwnership());
  }

  static async updateOwnerships(
    updatedOwnerships: OwnerShip[],
    ownedEntity: Entity
  ) {
    const ownedOwnerships = this.getOwnedOwnerships(ownedEntity);
    // Remove all the ownerships that are in ownedOwnership from the store and add the updated ownerships to the store
    appStore.dispatch(EntitySliceActions.removeOwnerships(ownedOwnerships));
    appStore.dispatch(EntitySliceActions.addOwnerships(updatedOwnerships));
  }

  static async SetSelectedEntityIntoGraph(payload: NodeType) {
    appStore.dispatch(EntitySliceActions.setSelectedEntityFromGraph(payload));
  }

  static getOwnerInfo(entity: Entity): OwnerInfoDisplayType[] {
    const allOwnerships = appStore.getState().entity.ownerships;

    const filteredOwnerships = allOwnerships.filter(
      (ownership) => ownership.ownedId === entity?.entityId
    );

    const ownerInfo = filteredOwnerships.map((ownership) => {
      return {
        ownerId: ownership.ownerId,
        ownerName: ownership.ownerName ?? ownership.ownerId,
        ownershipPercentage: ownership.ownershipPercentage,
      };
    });
    return ownerInfo;
  }

  static getTpViewOwnerInfo(entity: Entity): OwnerInfoDisplayType[] {
    const allOwnerships = appStore.getState().entity.ownerships;

    const filteredOwnerships = allOwnerships.filter(
      (ownership) => ownership.ownerId === entity?.entityId
    );

    const ownerInfo = filteredOwnerships.map((ownership) => {
      return {
        ownerId: ownership.ownedId,
        ownerName: ownership.ownedName ?? ownership.ownedId,
        ownershipPercentage: ownership.ownershipPercentage,
      };
    });
    return ownerInfo;
  }
}
