import { InputNumber, SelectPicker, Slider } from "rsuite";
import ArcLineIcon from "../../assets/icons/ArcLineIcon";
import { LayoutControll, TypeShape } from "../../graph/type/type";

export function ControllSlider(
  label: string,
  propertyName: string,
  controll: LayoutControll,
  setControll: React.Dispatch<React.SetStateAction<LayoutControll>>,
  min: number = 0,
  max: number = 1000
) {
  return (
    <>
      <div className="flex flex-col mb-3">
        <label className="pb-2 font-normal">{label}</label>
        <div className="flex items-center justify-between">
          <div className="w-7/12">
            <Slider
              className="custom-rs-slider"
              progress
              handleTitle={controll[propertyName]}
              min={min}
              max={max}
              value={controll[propertyName]}
              onChange={(value) => {
                setControll({ ...controll, [propertyName]: value });
              }}
            />
          </div>
          <div className="w-4/12">
            <InputNumber
              min={min}
              max={max}
              value={controll[propertyName]}
              onChange={(value) => {
                setControll({ ...controll, [propertyName]: Number(value) });
              }}
            />
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}

export function ControllCheckbox(
  label: string,
  propertyName: string,
  checked: boolean,
  onCheckboxChange
) {
  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <div className="w-7/12">
          <label className="font-normal">{label}</label>
        </div>
        <div className="w-4/12">
          <div className="flex items-center">
            <input
              className="general-toggle-button"
              type="checkbox"
              checked={checked}
              onChange={(e) => {
                onCheckboxChange(e, propertyName);
              }}
              id="id-c01"
            />
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}

type ControlSelectProps = {
  label: string;
  propertyName: string;
  controll: LayoutControll;
  setControll: React.Dispatch<React.SetStateAction<LayoutControll>>;
  data: { label: string; value: string }[];
};

export function ControllSelect(props: ControlSelectProps) {
  const { label, data, controll, propertyName, setControll } = props;

  return (
    <>
      <div className="arc-preset-selector-container flex flex-col gap-1 py-4 bg-reg-white rounded-[4px]">
        <div className="arc-preset-selector-header px-3">
          <label className="arc-preset-selector-label text-13-medium">
            {label}
          </label>
        </div>

        <div className="arc-preset-selector-button-group flex flex-row justify-center gap-1 px-3">
          {data.map((item, index) => (
            <button
              key={index}
              className={`
                graph-properties-selector-button-transition w-[5.3rem] h-[5rem] flex flex-col justify-center items-center
                 ${
                   controll[propertyName] === item.value
                     ? "bg-reg-blue-100 border border-reg-blue-300"
                     : ""
                 }`}
              onClick={() => {
                setControll({ ...controll, [propertyName]: item.value });
              }}
            >
              <ArcLineIcon arcName={item.value} />
              {item.label.charAt(0).toUpperCase() +
                item.label.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export function ShapeControllSelect(
  disableShapeControl: boolean,
  type: TypeShape,
  shapeData: any,
  updateShapeControl: (type: TypeShape, value: string) => void
) {
  return (
    <div className="flex flex-col">
      <label className="text-[12px] font-medium">
        {type.key === "default" ? "Default" : type.key}
      </label>
      <SelectPicker
        placement="auto"
        disabled={disableShapeControl}
        menuStyle={{ zIndex: 6969 }}
        className="h-8"
        data={shapeData}
        value={type.shape}
        onChange={(value) => {
          updateShapeControl(type, value);
        }}
      />
    </div>
  );
}
