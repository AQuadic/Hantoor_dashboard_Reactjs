import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

interface DashboardInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
  type?: string;
}

const DashboardInput: React.FC<DashboardInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
  type = "text",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col border px-5 py-2 rounded-2xl max-h-[64px] flex-1 relative">
      <label>{label}</label>
      <input
        type={inputType}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="focus:outline-none focus:border-none text-sm" 
      />

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute rtl:left-4 ltr:right-4 bottom-4"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );
};

export default DashboardInput;
