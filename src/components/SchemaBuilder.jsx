import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Plus, Download, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { FieldRow } from "./FieldRow";
import {
  generateJsonSchema,
  generateSampleData,
} from "../utils/schemaGenerator";

export const SchemaBuilder = ({ onSchemaChange }) => {
  const { control, register, watch, reset, setValue } = useForm({
    defaultValues: {
      fields: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "fields",
  });

  const watchedFields = watch("fields");

  React.useEffect(() => {
    const schema = generateJsonSchema(watchedFields);
    const sampleData = generateSampleData(watchedFields);
    onSchemaChange(schema, sampleData);
  }, [watchedFields, onSchemaChange]);

  const addField = () => {
    const newField = {
      id: `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: "",
      type: "string",
      defaultValue: "",
      children: [],
    };
    append(newField);
  };

  const exportSchema = () => {
    const schema = generateJsonSchema(watchedFields);
    const blob = new Blob([JSON.stringify(schema, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "schema.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearSchema = () => {
    reset({
      fields: [
        {
          id: "field_1",
          name: "example",
          type: "string",
          defaultValue: "Sample value",
          children: [],
        },
      ],
    });
  };

  return (
    <div className="h-full flex flex-col">
      <Card className="flex-shrink-0 border-b rounded-none">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Schema Builder</CardTitle>
              <CardDescription>
                Define your JSON schema by adding and configuring fields
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={clearSchema}
                variant="outline"
                size="sm"
              >
                <RotateCcw size={16} className="mr-2" />
                Reset
              </Button>
              <Button type="button" onClick={exportSchema} size="sm">
                <Download size={16} className="mr-2" />
                Export Schema
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="flex-1 overflow-auto p-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-4">
            {fields.map((field, index) => (
              <FieldRow
                key={field.id}
                field={field}
                index={index}
                nestLevel={0}
                control={control}
                register={register}
                setValue={setValue}
                onRemove={() => remove(index)}
                parentPath=""
              />
            ))}
          </div>

          <Card className="mt-6 border-dashed">
            <CardContent className="p-6">
              <Button
                type="button"
                onClick={addField}
                variant="ghost"
                className="w-full h-12 text-muted-foreground hover:text-foreground"
              >
                <Plus size={20} className="mr-2" />
                Add New Field
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
