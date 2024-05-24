const subChildSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    allowed: {
      type: 'array',
      items: {
        type: 'string',
        enum: ['read', 'create', 'delete', 'update'],
      },
      minItems: 0,
    },
    permissions: {
      type: 'array',
      items: {
        type: 'string',
        enum: ['read', 'create', 'delete', 'update'],
      },
      minItems: 0,
    },
  },
  required: ['id', 'name', 'allowed', 'permissions'],
};

const childSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    child: { type: 'array', items: subChildSchema, minItems: 1 },
    allowed: {
      type: 'array',
      items: {
        type: 'string',
        enum: ['read', 'create', 'delete', 'update'],
      },
      minItems: 0,
    },
    permissions: {
      type: 'array',
      items: {
        type: 'string',
        enum: ['read', 'create', 'delete', 'update'],
      },
      minItems: 0,
    },
  },
  required: ['id', 'name', 'child'],
};

const parentSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    child: { type: 'array', items: childSchema, minItems: 1 },
    allowed: {
      type: 'array',
      items: {
        type: 'string',
        enum: ['read', 'create', 'delete', 'update'],
      },
      minItems: 0,
    },
    permissions: {
      type: 'array',
      items: {
        type: 'string',
        enum: ['read', 'create', 'delete', 'update'],
      },
      minItems: 0,
    },
  },
  required: ['id', 'name', 'child'],
};

export const jsonSchema = {
  type: 'array',
  items: parentSchema,
};
