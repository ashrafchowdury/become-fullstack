const client = require("./redis");

const hashSetPipeline = async () => {};

const hashGetPipeline = async (data, redisKey) => {
  const result = await Promise.all(
    data.map((key) => {
      return client.hgetall(`${redisKey}:${key._id}`);
    })
  );

  return result;
};

module.exports = { hashGetPipeline };
