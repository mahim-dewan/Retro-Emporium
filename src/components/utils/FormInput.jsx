import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";

const FormInput = ({
  label,
  name,
  value,
  onChange,
  required,
  placeholder,
  type = "text",
}) => {
  return (
    <div className="flex-1">
      <Label htmlFor={name} className="font-semibold my-1 text-md">
        {label}
        {required && <span className="text-retro">*</span>}
      </Label>
      <Input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default FormInput;
