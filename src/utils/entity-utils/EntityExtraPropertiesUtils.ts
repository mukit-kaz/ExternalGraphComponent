import toast from "react-hot-toast";
import { EntityApi } from "../../apis/EntityApi";
import { appStore } from "../../stores/redux-store";
import { EntityCorporateRateSliceActions } from "../../stores/slices/entityCorporateRateSlice";
import { EntityCorporateRate } from "../../types/entity-types";
import { PageControlUtils } from "../extention/PageControlUtils";

export class EntityExtraPropertiesUtils {
  static async getEntityCorporateRateDetails() {
    try {
    PageControlUtils.LoaderTurnOn();

      const entityCorporateRateDetails =
        (await EntityApi.getEntityCorporateRateData()) ?? {
          data: [] as EntityCorporateRate[],
        };
  
      appStore.dispatch(
        EntityCorporateRateSliceActions.setEntityCorporateRate(
          entityCorporateRateDetails.data
        )
      );
  
      return entityCorporateRateDetails.data;
    } catch (error) {
      toast.error(error?.response?.Message);
    }
    finally{
      PageControlUtils.LoaderTurnOff();
    }
  }
}
