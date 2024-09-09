
const subChildSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    // child: { type: 'array', items: supersubChildSchema, minItems: 1 },
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
  required: ['id', 'name', 'child', 'allowed', 'permissions'],
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
  required: ['id', 'name', 'child', 'allowed', 'permissions'],
};

export const jsonSchema = {
  type: 'array',
  items: parentSchema,
};

export const sample = [
  {
    id: '22afc36b-4f7f-42ca-9fce-1a3012ccwe8905456d',
    name: 'Admin Section',
    allowed: ['read', 'create', 'delete', 'update'],
    permissions: ['read', 'create', 'delete', 'update'],
    child: [
      {
        id: '22afc36b-4f7f-42ca-9fce-1a301sds223cc05456d',
        name: 'Admin',
        allowed: ['read', 'create', 'delete', 'update'],
        permissions: ['read', 'create', 'delete', 'update'],
        child: [
          {
            id: '22afc36b-4f7f-42ca-9fce-1a3450das12cc05456d',
            name: 'Admin panel',
            allowed: ['read', 'create', 'delete', 'update'],
            permissions: ['read', 'create', 'delete', 'update'],
          },
        ],
      },
    ],
  },
];
