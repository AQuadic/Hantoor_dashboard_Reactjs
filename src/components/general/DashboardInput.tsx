import React from "react";

interface DashboardInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const DashboardInput: React.FC<DashboardInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="flex flex-col border px-5 py-2 rounded-2xl  ">
      <label>{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="focus:outline-none focus:border-none text-sm"
      />
    </div>
  );
};

export default DashboardInput;
