const environments = {
    development: {
      baseURL: 'https://reqres.in',
    },
    staging: {
      baseURL: 'https://staging.reqres.in',
    },
    production: {
      baseURL: 'https://production.reqres.in',
    },
  };
  
  export const getConfig = () => {
    const env = process.env.NODE_ENV || 'development';
    return environments[env];
  };
  