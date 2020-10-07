module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "mongoose",
      settings: {
        uri: env("DATABASE_URI", "localhost"),
      },
      options: {
        ssl: env.bool("DATABASE_SSL", false),
      },
    },
  },
});
