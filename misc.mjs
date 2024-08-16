import { exec as exec_, spawn as spawn_ } from "child_process";
import { promisify } from "util";
//import { stat, readFile, writeFile, copyFile as copyFile_, unlink } from "fs/promises";

const exec__ = promisify(exec_);

export function sleep(ms, returnVal) {
  return new Promise((resolve) => setTimeout(resolve, ms, returnVal));
}

export async function exec(cmd, opts) {
  const { err, stderr, stdout } = await exec__(cmd, { shell: true, ...opts });
  if (err) throw err;
  return { stderr, stdout };
}

export const spawn = (cmd, opts) =>
  new Promise((resolve, reject) => {
    const cp = spawn_(cmd, { shell: true, stdio: "inherit", ...opts });
    const err = [];

    cp.on("error", (e) => err.push(e.toString()));

    cp.on("close", () => {
      if (err.length) reject(err);
      else resolve();
    });
  });
