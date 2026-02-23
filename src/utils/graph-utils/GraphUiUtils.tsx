import MathSigns from "../../assets/icons/MathSigns";
import { GraphFilterForText, GraphFilterNames } from "../../enums/graph-filter-type-enums";
import { dropdownType } from "../../graph/filter/graphFilterComponent";

export function createIconMapForFilters(filterOptions: dropdownType[]) {
    const iconMap = new Map<string, string | JSX.Element>();

    filterOptions.forEach((filterOption) => {
        switch (filterOption.value) {
            case GraphFilterForText.EQUALS:
                iconMap.set(filterOption.value, <MathSigns className="w-3 h-3 text-reg-gray-600" symbolName={GraphFilterForText.EQUALS} />);
                break;
            case GraphFilterForText.NOT_EQUALS:
                iconMap.set(filterOption.value, <MathSigns className="w-3 h-3 text-reg-gray-600" symbolName={GraphFilterForText.NOT_EQUALS} />);
                break;
            case GraphFilterForText.MATCH:
                iconMap.set(filterOption.value, <MathSigns className="w-5 h-5 text-reg-gray-600" symbolName={GraphFilterForText.MATCH} />);
                break;
            case GraphFilterNames.GREATER_THAN:
                iconMap.set(filterOption.value, <MathSigns className="w-3 h-3 text-reg-gray-600" symbolName={GraphFilterNames.GREATER_THAN} />);
                break;
            case GraphFilterNames.LESS_THAN:
                iconMap.set(filterOption.value, <MathSigns className="w-3 h-3 text-reg-gray-600" symbolName={GraphFilterNames.LESS_THAN} />);
                break;
            default:
                break;
        }
    });

    return iconMap;
}