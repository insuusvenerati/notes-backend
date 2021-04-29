require("dotenv").config({ path: `.env` });

module.exports = {
  branches: ["main", { name: "develop", prerelease: true }],
  repositoryUrl: "https://github.com/insuusvenerati/notes-backend",
  tagFormat: "${version}",
  plugins: [
    [
      "@semantic-release/changelog",
      {
        changelogFile: "CHANGELOG.MD",
      },
    ],
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/github",
    [
      "@semantic-release/npm",
      {
        npmPublish: false,
      },
    ],
    [
      "@semantic-release/git",
      {
        assets: ["package.json", "CHANGELOG.MD"],
        message:
          "chore(release): ${nextRelease.version} [CI SKIP]\n\n${nextRelease.notes}",
      },
    ],
  ],
};
