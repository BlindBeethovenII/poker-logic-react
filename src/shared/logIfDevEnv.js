// log if dev env
const logIfDevEnv = (msg) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(msg);
  }
};

export default logIfDevEnv;
