import { ChartApi } from "../../apis/ChartApi";
import { updateCompanydataProps } from "../../helpers/companydataHelper";
import { appStore } from "../../stores/redux-store";
import { ChartSliceActions } from "../../stores/slices/chartSlice";
import { EntityChartType } from "../../types/entityChartTypes";
import { PageControlUtils } from "../extention/PageControlUtils";

export class ChartControlUtils {
  static async getChartList() {
    PageControlUtils.LoaderTurnOn();

    const chartData = (await ChartApi.getChartList()) ?? {
      data: [] as EntityChartType[],
    };

    const chartList = chartData.data.map((chart) => {
      return {
        chartId: chart.Id?.toString(),
        chartName: chart.Name,
      } as EntityChartType;
    });

    appStore.dispatch(ChartSliceActions.setChartList(chartList));

    PageControlUtils.LoaderTurnOff();

    return chartList;
  }

  static setSelectedChartId(chartId: string) {
    appStore.dispatch(ChartSliceActions.setSelectedChartId(chartId));
    
    if(chartId && chartId!=="00")
    updateCompanydataProps({chartId:chartId})
  }

  static resetChartList() {
    appStore.dispatch(ChartSliceActions.setChartList([]));
  }
}
