module.exports = {
    name: "parachain-tracker",
    preset: "../../jest.config.js",
    coverageDirectory: "../../coverage/apps/parachain-tracker",
    snapshotSerializers: [
        "jest-preset-angular/AngularSnapshotSerializer.js",
        "jest-preset-angular/HTMLCommentSerializer.js",
    ],
}
