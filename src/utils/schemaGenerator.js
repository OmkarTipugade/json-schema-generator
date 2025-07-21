export const generateJsonSchema = (fields) => {
  const properties = {};
  const required = [];

  fields.forEach(field => {
    if (!field.name.trim()) return;

    required.push(field.name);

    switch (field.type) {
      case 'string':
        properties[field.name] = {
          type: 'string',
          default: field.defaultValue || ''
        };
        break;
      case 'number':
        properties[field.name] = {
          type: 'number',
          default: field.defaultValue || 0
        };
        break;
      case 'nested':
        if (field.children && field.children.length > 0) {
          const nestedSchema = generateJsonSchema(field.children);
          properties[field.name] = nestedSchema;
        } else {
          properties[field.name] = {
            type: 'object',
            properties: {}
          };
        }
        break;
    }
  });

  return {
    type: 'object',
    properties,
    required: required.length > 0 ? required : undefined
  };
};

export const generateSampleData = (fields) => {
  const data = {};

  fields.forEach(field => {
    if (!field.name.trim()) return;

    switch (field.type) {
      case 'string':
        data[field.name] = field.defaultValue || `Example ${field.name}`;
        break;
      case 'number':
        data[field.name] = field.defaultValue !== undefined ? field.defaultValue : Math.floor(Math.random() * 100) + 1;
        break;
      case 'nested':
        if (field.children && field.children.length > 0) {
          data[field.name] = generateSampleData(field.children);
        } else {
          data[field.name] = {
            "example_nested_field": "This is a nested object"
          };
        }
        break;
    }
  });

  return data;
};