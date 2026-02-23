import { appStore } from "../../stores/redux-store";
import { loaderActions } from "../../stores/slices/loaderSlice";

export class PageControlUtils {
  static LoaderTurnOff() {
    appStore.dispatch(loaderActions.turnOff());
  }
  static LoaderTurnOn() {
    appStore.dispatch(loaderActions.turnOn());
  }
}
