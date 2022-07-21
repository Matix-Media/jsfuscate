import packageInfo from "../package.json";
import * as readline from "readline";
import { compileString } from "./compile";

export default async function consoleCompiler() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    console.log(
        `${packageInfo.name} v${packageInfo.version} (${packageInfo.license} © ${new Date().getFullYear()} ${packageInfo.author.name} [${
            packageInfo.author.url
        }])`,
    );

    while (true) {
        const prompt: string = await new Promise<string>((resolve) => {
            rl.question("> ", resolve);
        });

        console.log(compileString(prompt));
    }
}
