import * as args from "./args";
import * as log from "./log";
import compile from "./compile";
import consoleCompiler from "./console";
import test from "./test";
import { exit } from "process";
import * as fs from "fs";
import { access } from "fs/promises";

async function main() {
    args.init();

    if (args.exists("--json")) {
        log.setIsAsJson(true);
    }

    if (args.exists("--logLevel")) {
        const newLogLevel = args.getValue("--logLevel");
        if (!(newLogLevel in log.LogLevel)) {
            log.error(`The log-level "${newLogLevel}" does not exist. Allowed log-levels: ${Object.keys(log.LogLevel).join(", ")}`, {
                error: "InvalidLogLevel",
                allowedLogLevels: Object.keys(log.LogLevel),
                specifiedLogLevel: newLogLevel,
            });
        } else {
            log.setLogLevel(log.LogLevel[newLogLevel]);
        }
    }

    if (args.exists("--test")) {
        log.info("The compiler was set to self-test. It will not compile any code.", { testMode: true });
        test();
        exit();
    }

    let filePath = args.getParameter(0);
    let outputDir = args.getParameter(1);

    if (filePath == null) {
        await consoleCompiler();
        exit();
    }

    try {
        await access(filePath, fs.constants.R_OK);
    } catch {
        log.error(`The specified file "${filePath}" does either not exist or is not allowed to be read.`, {
            error: "FileInputDoesNotExist",
            file: filePath,
        });
        exit(1);
    }

    log.info("Compiling...", { started: true });
    await compile(filePath, outputDir);
    log.info("Successfully compiled", { done: true });
}

main();
