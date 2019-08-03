module.exports = {
    name: "parachain-tracker",
    preset: "../../jest.config.js",
    coverageDirectory: "../../coverage/apps/parachain-tracker",
    snapshotSerializers: [
        "jest-preset-angular/AngularSnapshotSerializer.js",
        "jest-preset-angular/HTMLCommentSerializer.js",
    ],
    "setupFilesAfterEnv": [
        "<rootDir>/src/test-setup.ts"
    ],
    globals: {
        "ts-jest": {
            "diagnostics": false,
            "tsConfig": "<rootDir>/tsconfig.spec.json",
            "stringifyContentPathRegex": "\\.html$",
            "astTransformers": [
                "<rootDir>/../../node_modules/jest-preset-angular/InlineHtmlStripStylesTransformer"
            ]
        }
    }
}
