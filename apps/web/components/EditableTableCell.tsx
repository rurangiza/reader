import { Input } from "@repo/ui/components/input";
import { useEffect, useState } from "react";

export function EditableTableCell({ initialValue }: { initialValue: string }) {
  const [value, setValue] = useState(initialValue);
  const isEditable = false;

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <Input
      className={`pl-0 border-0 shadow-none focus-visible:ring-0 ${isEditable ? "cursor-text" : "cursor-default"}`}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      readOnly={!isEditable}
      value={value}
    ></Input>
  );
}
