import { ModalName } from "../../enums/modalName";
import { appStore } from "../../stores/redux-store";
import { importEntitiesModalsliceActions } from "../../stores/slices/entitiesModalSlice";
import { ModalStoreType } from "../../types/modal-types";

export class ModalControlUtils {
  static setModal(modalPayload: ModalStoreType) {
    appStore.dispatch(importEntitiesModalsliceActions.addModal(modalPayload));
  }

  static updateModalType(modalName: ModalName, data?: any) {
    if (data) {
      appStore.dispatch(
        importEntitiesModalsliceActions.addModal({
          data: data,
          type: modalName,
        })
      );
    } else {
      appStore.dispatch(
        importEntitiesModalsliceActions.updateModalType(modalName)
      );
    }
  }

  static removeModal() {
    appStore.dispatch(importEntitiesModalsliceActions.removeModal());
  }
}
