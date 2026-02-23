// logical operators
const equals = "Is Equal";
const notEquals = "Is Not Equal";
const greaterThan = "Is Greater Than";
const lessThan = "Is Less Than";
const match = "Is Match";
// logical operators
// logical operators diplay
const equals_display = "is equal";
const notEquals_display = "not equal";
const greaterThan_display = "greater than";
const lessThan_display = "less than";
const match_display = "match";
// logical operators diplay

export const GraphFilterNames = {
  EQUALS: equals,
  NOT_EQUALS: notEquals,
  GREATER_THAN: greaterThan,
  LESS_THAN: lessThan,
} as const;

export type GraphFilterNames = typeof GraphFilterNames[keyof typeof GraphFilterNames];

export const GraphFilterForText = {
  EQUALS: equals,
  NOT_EQUALS: notEquals,
  MATCH: match,
} as const;

export type GraphFilterForText = typeof GraphFilterForText[keyof typeof GraphFilterForText];

export const GraphFilterNamesMapping: Record<GraphFilterNames, string> = {
  [GraphFilterNames.EQUALS]: equals_display,
  [GraphFilterNames.NOT_EQUALS]: notEquals_display,
  [GraphFilterNames.GREATER_THAN]: greaterThan_display,
  [GraphFilterNames.LESS_THAN]: lessThan_display,
};

export const GraphFilterNamesForStringMapping: Record<
  GraphFilterForText,
  string
> = {
  [GraphFilterForText.EQUALS]: equals_display,
  [GraphFilterForText.NOT_EQUALS]: notEquals_display,
  [GraphFilterForText.MATCH]: match_display,
};

export const GraphFilterType = {
  ID: "entityCode",
  EntityName: "name",
  IncorporationJurisdiction: "incorporationJurisdiction",
  SubNational: "subNational",
  // TaxCharacterization="taxCharList",
  // Ownership="ownership",
  OwnershipPercentage: "ownershipPercentage",
  Type: "businessType",
  TaxResidence: "taxResidenceJurisdiction",
} as const;

export type GraphFilterType = typeof GraphFilterType[keyof typeof GraphFilterType];

export const GraphFilterTypeNamesMapping: Record<GraphFilterType, string> = {
  [GraphFilterType.ID]: "id",
  [GraphFilterType.EntityName]: "entity name",
  [GraphFilterType.IncorporationJurisdiction]: "incorporation jurisdiction",
  [GraphFilterType.SubNational]: "sub-national",
  // [GraphFilterType.TaxCharacterization]: "tax characterization",
  // [GraphFilterType.Ownership]: "ownership",
  [GraphFilterType.OwnershipPercentage]: "ownership %",
  [GraphFilterType.Type]: "type",
  [GraphFilterType.TaxResidence]: "tax residence",
};

// dropdown value and lable
export function GetFilterLogic() {
  type GraphFilterNamesKeyType = keyof typeof GraphFilterNames;
  const filterTypesKeys = Object.keys(
    GraphFilterNames
  ) as GraphFilterNamesKeyType[];

  return filterTypesKeys.map((filterTypesKey) => {
    const enumValue = GraphFilterNames[filterTypesKey];
    return {
      label: `${GraphFilterNamesMapping[enumValue as GraphFilterNames]}`,
      value: enumValue,
    };
  });
}
export function GetFilterLogicForText() {
  type GraphFilterNamesKeyType = keyof typeof GraphFilterForText;
  const filterTypesKeys = Object.keys(
    GraphFilterForText
  ) as GraphFilterNamesKeyType[];

  return filterTypesKeys.map((filterTypesKey) => {
    const enumValue = GraphFilterForText[filterTypesKey];
    return {
      label: `${
        GraphFilterNamesForStringMapping[enumValue as GraphFilterForText]
      }`,
      value: enumValue,
    };
  });
}
export function GetFilterType() {
  type GraphFilterTypeKeysType = keyof typeof GraphFilterType;

  const filterKeys: GraphFilterTypeKeysType[] = Object.keys(
    GraphFilterType
  ) as GraphFilterTypeKeysType[];

  return filterKeys.map((filterTypesKey) => {
    const enumValue = GraphFilterType[filterTypesKey] as GraphFilterType;
    return {
      label: `${GraphFilterTypeNamesMapping[enumValue]}`,
      value: enumValue,
    };
  });
}
