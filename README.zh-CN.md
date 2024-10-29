# Boilerplate Copier

Boilerplate Copier 是一个强大的工具，用于复制和粘贴样板文件，适用于各种需要重复使用代码片段的场景。它可以帮助你从繁琐的复制粘贴工作中解放出来，提高开发效率。

[English](./README.md)

## 功能特点

- 简单易用的命令行界面
- 支持设置样板文件的源目录
- 可以将样板文件快速粘贴到目标目录
- 支持覆盖现有文件的选项
- 易于扩展和定制
- 支持查看粘贴日志，方便追踪文件的粘贴历史

## 安装

全局安装:

```bash
npm install -g boilerplate-copier
```

## 使用方法

1. 使用 `copy` 命令设置样板文件的源目录：

   ```bash
   copier copy <sourceDir>
   ```

2. 使用 `paste` 命令将样板文件粘贴到目标目录：

   ```bash
   copier paste <targetDir>
   ```

   可使用`--overwrite` 选项覆盖现有文件。

3. 使用 `log` 命令查看粘贴日志：

   ```bash
   copier log
   ```

   该命令将显示最近的粘贴操作记录，包括源目录、目标目录和粘贴时间。

## 开发指南

1. 克隆此仓库：

   ```
   git clone https://github.com/Gijela/Boilerplate-Copier.git
   ```

2. 安装依赖：

   ```
   cd boilerplate-copier
   npm install
   ```

3. 根据需要修改 `index.js` 和 `config.json` 文件，以适应你的项目需求。

4. 运行以下命令进行测试：

   ```
   node index.js copy /path/to/your/boilerplate
   node index.js paste /path/to/your/project
   node index.js log
   ```

5. 欢迎提交 Pull Request，贡献你的想法和改进！

## 许可证

本项目基于 [MIT 许可证](./LICENSE)发布。欢迎自由使用、修改和分发。

## 联系方式

如有任何问题或建议，请通过 [GitHub Issues](https://github.com/Gijela/Boilerplate-Copier/issues) 与我们联系。
