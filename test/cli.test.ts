import type { ClioOptions } from "../src";
import { parseCliOptions } from "../src";

describe("Test cli", () => {
    let originalArgv;
    beforeEach(() => {
        originalArgv = process.argv;
    });
    afterEach(() => {
        jest.restoreAllMocks();
        process.argv = originalArgv;
    });
    
    it("Should work with no args", async () => {
        process.argv = [
            "node",
            "cli.js"
        ];

        const cliOptions: ClioOptions = await parseCliOptions();

        expect(cliOptions.file).toBeUndefined();
        expect(cliOptions.config).toBeUndefined();
        expect(cliOptions.quiet).toBeFalsy();
        expect(cliOptions.verbose).toBeFalsy();
    });

    it("Should parse file", async () => {
        process.argv = [
            "node",
            "cli.js",
            "lockFileLocation"
        ];

        const cliOptions: ClioOptions = await parseCliOptions();

        expect(cliOptions.file).toEqual("lockFileLocation");
        expect(cliOptions.config).toBeUndefined();
        expect(cliOptions.quiet).toBeFalsy();
        expect(cliOptions.verbose).toBeFalsy();
    });

    it("Should parse config", async () => {
        process.argv = [
            "node",
            "cli.js",
            "--config",
            "configFileLocation",
            "lockFileLocation"
        ];

        const cliOptions: ClioOptions = await parseCliOptions();

        expect(cliOptions.file).toEqual("lockFileLocation");
        expect(cliOptions.config).toEqual("configFileLocation");
        expect(cliOptions.quiet).toBeFalsy();
        expect(cliOptions.verbose).toBeFalsy();
    });

    it("Should parse quiet", async () => {
        process.argv = [
            "node",
            "cli.js",
            "--quiet"
        ];

        const cliOptions: ClioOptions = await parseCliOptions();

        expect(cliOptions.file).toBeUndefined();
        expect(cliOptions.config).toBeUndefined();
        expect(cliOptions.quiet).toBeTruthy();
        expect(cliOptions.verbose).toBeFalsy();
    });

    it("Should parse verbose", async () => {
        process.argv = [
            "node",
            "cli.js",
            "--verbose"
        ];

        const cliOptions: ClioOptions = await parseCliOptions();

        expect(cliOptions.file).toBeUndefined();
        expect(cliOptions.config).toBeUndefined();
        expect(cliOptions.quiet).toBeFalsy();
        expect(cliOptions.verbose).toBeTruthy();
    });
});
