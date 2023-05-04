export const books = [
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    year: 1960,
    genre: 'Classic',
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    year: 1925,
    genre: 'Classic',
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    year: 1951,
    genre: 'Coming-of-age',
  },
];

export const RepoJson = [
  {
    name: 'Onboarding',
    child: [
      {
        name: 'Sign up',
        child: [
          {
            name: 'basic info',
            create: true,
            read: false,
            update: false,
            delete: false,
          },
          {
            name: 'Proffesional details',
          },
        ],
      },
      {
        name: 'Sign in',
        child: [
          {
            name: 'Sign in with mobile number',
            create: true,
            read: false,
            update: false,
            delete: false,
          },
          {
            name: 'Sign in with email id',
          },
        ],
      },
      {
        name: 'Forgot Password',
      },
    ],
  },
  {
    name: 'Dashboard',
    child: [
      {
        name: 'To-do',
        child: [
          {
            name: 'basic information',
            create: true,
            read: false,
            update: false,
            delete: false,
          },
          {
            name: 'Proffesional',
          },
        ],
      },
      {
        name: 'Rename',
        child: [
          {
            name: 'Changed successfull',
            create: true,
            read: false,
            update: false,
            delete: false,
          },
          {
            name: 'Forgot number',
          },
        ],
      },
    ],
  },
];
