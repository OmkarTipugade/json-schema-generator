// Schema field structure for JavaScript
export const createSchemaField = (
  id,
  name = "",
  type = "string",
  defaultValue = "",
  children = []
) => ({
  id,
  name,
  type,
  defaultValue,
  children,
});

// Field types
export const FIELD_TYPES = {
  STRING: "string",
  NUMBER: "number",
  NESTED: "nested",
  FLOAT: "float",
};
