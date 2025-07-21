import { useFieldArray, useWatch } from "react-hook-form";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Card, CardContent } from "./ui/card";

export const FieldRow = ({
  index,
  nestLevel,
  control,
  register,
  setValue,
  onRemove,
  parentPath,
}) => {
  const currentPath = parentPath
    ? `${parentPath}.children.${index}`
    : `fields.${index}`;
  const childrenPath = `${currentPath}.children`;

  const {
    fields: childFields,
    append: appendChild,
    remove: removeChild,
  } = useFieldArray({
    control,
    name: childrenPath,
  });

  const fieldType = useWatch({
    control,
    name: `${currentPath}.type`,
  });

  const addNestedField = () => {
    const newField = {
      id: `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: "",
      type: "string",
      defaultValue: "",
      children: [],
    };
    appendChild(newField);
  };

  const handleTypeChange = (value) => {
    setValue(`${currentPath}.type`, value);
    if (value !== "nested") {
      setValue(`${currentPath}.defaultValue`, value === "number" ? 0 : "");
    }
  };

  const getIndentClass = (level) => {
    return level > 0 ? `ml-${Math.min(level * 6, 24)}` : "";
  };

  return (
    <div className={`${getIndentClass(nestLevel)}`}>
      <Card className="mb-4 transition-all duration-200 hover:shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center text-muted-foreground cursor-grab hover:text-foreground transition-colors">
              <GripVertical size={16} />
            </div>

            <div className="flex-1 grid grid-cols-12 gap-4 items-end">
              <div className="col-span-4">
                <Label
                  htmlFor={`${currentPath}.name`}
                  className="text-sm font-medium"
                >
                  Field Name
                </Label>
                <Input
                  {...register(`${currentPath}.name`)}
                  id={`${currentPath}.name`}
                  placeholder="Enter field name"
                  className="mt-1"
                />
              </div>

              <div className="col-span-3">
                <Label className="text-sm font-medium">Type</Label>
                <Select value={fieldType} onValueChange={handleTypeChange}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="string">String</SelectItem>
                    <SelectItem value="number">Number</SelectItem>
                    <SelectItem value="float">Float</SelectItem>
                    <SelectItem value="nested">Nested</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {fieldType !== "nested" && (
                <div className="col-span-4">
                  <Label
                    htmlFor={`${currentPath}.defaultValue`}
                    className="text-sm font-medium"
                  >
                    Default Value
                  </Label>
                  <Input
                    {...register(`${currentPath}.defaultValue`)}
                    id={`${currentPath}.defaultValue`}
                    type={fieldType === "number" ? "number" : "text"}
                    placeholder={fieldType === "number" ? "0" : "Default value"}
                    className="mt-1"
                  />
                </div>
              )}

              {fieldType === "nested" && (
                <div className="col-span-4 flex items-end">
                  <Button
                    type="button"
                    onClick={addNestedField}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Plus size={16} className="mr-2" />
                    Add Nested Field
                  </Button>
                </div>
              )}

              <div className="col-span-1 flex justify-end">
                <Button
                  type="button"
                  onClick={onRemove}
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>

        {fieldType === "nested" && childFields.length > 0 && (
          <div className="border-t bg-muted/30 p-4">
            <div className="space-y-3">
              {childFields.map((childField, childIndex) => (
                <FieldRow
                  key={childField.id}
                  field={childField}
                  index={childIndex}
                  nestLevel={nestLevel + 1}
                  control={control}
                  register={register}
                  setValue={setValue}
                  onRemove={() => removeChild(childIndex)}
                  parentPath={currentPath}
                />
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
