// log if dev env
const logIfDevEnv = (msg) => {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    console.log(msg);
  }
};

export default logIfDevEnv;
