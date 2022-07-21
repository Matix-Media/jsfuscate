import * as log from "./log";
import string from "./string";
import { exit } from "process";
import { access, mkdir, readFile, writeFile } from "fs/promises";
import * as path from "path";
import * as dependencyTree from "dependency-tree";

export function compileString(s: string) {
    return string(s);
}

export function compileCode(code: string) {
    return `(new Function(` + string(code) + `))();`;
    //return `(()=>{})[${string("constructor")}](${string(code)})()`;
}

export default async function compile(filePath: string, outputDir: string) {
    const filePathDir = path.resolve(path.parse(filePath).dir);
    outputDir = path.resolve(outputDir);

    try {
        try {
            await access(outputDir);
        } catch {
            await mkdir(outputDir);
        }
    } catch {
        log.error(`Could not create output dir "${outputDir}".`, { error: "OutputDirCreationFailed", outputDir: outputDir });
        exit(1);
    }

    let fileDependencies: Array<string>;
    try {
        fileDependencies = [...new Set(dependencyTree.toList({ filename: filePath, directory: filePathDir }))] as Array<string>;
    } catch (err) {
        log.error(`Could not resolve dependencies: ${err.message}`, { error: "DependencyResolutionError", subError: err });
    }

    let currentIndex = 0;
    for (const dependency of fileDependencies) {
        log.info(`Compiling [${currentIndex}/${fileDependencies.length}] "${dependency}"...`, {
            compiling: dependency,
            current: currentIndex,
            total: fileDependencies.length,
        });

        let fileContent: string;
        try {
            fileContent = await readFile(dependency, { encoding: "utf-8" });
        } catch {
            log.info(`Could not read file "${dependency}".`, { error: "FileReadError", file: dependency });
            exit(1);
        }

        const compiled = compileCode(fileContent);

        log.debug(`filePathDir = "${filePathDir}"`, { filePathDir });
        log.debug(`path.join("${outputDir}", dependency.substring(${filePathDir.length}) "${dependency.substring(filePathDir.length)}")`, {
            outputDir,
            filePathDirLength: filePathDir.length,
            subDependencyPath: dependency.substring(filePathDir.length),
        });
        const compiledFilePath = path.join(outputDir, dependency.substring(filePathDir.length));

        try {
            await writeFile(compiledFilePath, compiled);
        } catch {
            log.error(`Could not save compiled file "${compiledFilePath}".`, { error: "FileWriteError", file: compiledFilePath });
        }
        currentIndex++;
    }
}
