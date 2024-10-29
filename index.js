#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");
const { program } = require("commander");

const configFilePath = path.resolve(__dirname, "config.json");

// 读取配置文件中的模板路径
async function getSourceDir() {
  try {
    const config = await fs.readJson(configFilePath);
    return config.sourceDir;
  } catch (err) {
    console.error("Error reading config file:", err);
    return null;
  }
}

// 保存模板路径到配置文件
async function saveSourceDir(sourceDir) {
  try {
    await fs.writeJson(configFilePath, { sourceDir });
    console.log(`Template directory set to ${sourceDir}`);
  } catch (err) {
    console.error("Error writing config file:", err);
  }
}

// 复制文件的函数
async function copyFiles(sourceDir, targetDir, overwrite = false) {
  try {
    await fs.ensureDir(targetDir);
    await fs.copy(sourceDir, targetDir, { overwrite });
    console.log(`Pasted boilerplate files from ${sourceDir} to ${targetDir}`);

    const now = new Date();
    const formattedDate = new Intl.DateTimeFormat("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(now);

    const logMessage = `Files pasted from ${sourceDir} to ${targetDir} at ${formattedDate}\n`;
    await fs.appendFile("paste.log", logMessage);
  } catch (err) {
    console.error("Error pasting files:", err);
  }
}

// 设置命令行参数
program
  .version("1.0.0")
  .description(
    "Boilerplate Copier is a powerful tool for copying and pasting boilerplate files, suitable for various scenarios that require reusing code snippets. It can help you break free from tedious copy-paste work and improve development efficiency."
  );

// 复制模板路径命令
program
  .command("copy <sourceDir>")
  .description("Copy the template source directory")
  .action(async (sourceDir) => {
    await saveSourceDir(path.resolve(sourceDir));
  });

// 粘贴文件命令
program
  .command("paste <targetDir>")
  .description("Paste boilerplate files to the target directory")
  .option("-o, --overwrite", "Overwrite existing files")
  .action(async (targetDir, options) => {
    const sourceDir = await getSourceDir();
    if (!sourceDir) {
      console.error("Source directory not set. Use 'copy' command to set it.");
      return;
    }
    await copyFiles(sourceDir, path.resolve(targetDir), options.overwrite);
  });

// 查看粘贴日志命令
program
  .command("log")
  .description("View the paste log")
  .action(async () => {
    try {
      const logContent = await fs.readFile("paste.log", "utf8");
      console.log("Paste Log:\n", logContent);
    } catch (err) {
      console.error("Error reading log file:", err);
    }
  });

// 解析命令行参数
program.parse(process.argv);
