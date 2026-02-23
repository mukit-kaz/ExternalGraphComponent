import { useState, useEffect } from "react";
interface CustomToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  checkedChildren?: string;
  unCheckedChildren?: string;
}

const CustomToggle: React.FC<CustomToggleProps> = ({
  checked = false,
  onChange,
  checkedChildren,
  unCheckedChildren,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  // Sync internal state with prop changes
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleToggle = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onChange?.(newCheckedState);
  };

  return (
    <div className="reg-toggle-container" onClick={handleToggle}>
      <span
        className={`reg-toggle-text ${isChecked ? "" : "toggle-text-right"}`}
      >
        {isChecked ? unCheckedChildren : checkedChildren}
      </span>

      <div
        className={`reg-toggle-button ${
          isChecked ? "reg-toggle-button-selected" : ""
        }`}
      >
        {isChecked ? checkedChildren : unCheckedChildren}
      </div>
    </div>
  );
};

export default CustomToggle;
