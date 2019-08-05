module.exports = {
    name: "components",
    preset: "../../jest.config.js",
    coverageDirectory: "../../coverage/libs/components",
    snapshotSerializers: [
        "jest-preset-angular/AngularSnapshotSerializer.js",
        "jest-preset-angular/HTMLCommentSerializer.js",
    ],
    setupFilesAfterEnv: ["<rootDir>/src/test-setup.ts"],
    globals: {
        "ts-jest": {
            diagnostics: false,
            tsConfig: "<rootDir>/tsconfig.spec.json",
            stringifyContentPathRegex: "\\.html$",
            astTransformers: [
                "<rootDir>/../../node_modules/jest-preset-angular/InlineHtmlStripStylesTransformer",
            ],
        },
    },
}
