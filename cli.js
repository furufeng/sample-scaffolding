#!/usr/bin/env node

// Node CLI 应用入口文件必须有这样的文件夹
// 如果是Liunx 或者macOS 系统下还需要修改文件的读写权限为 755
// 具体就是通过 chomd 755 cli.js 实现修改

// 脚手架的工作过程：
// 1. 通过命令行交互询问用户问题
// 2. 根据用户回答的结果生成文件

const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'Project name?'
    }
])
.then(anwsers => {
    // console.log(anwsers);
    // 根据用户回答的结果生成文件

    // 模版目录
    const tmplDir = path.join(__dirname, 'templates');
    // 目标目录
    const destDir = process.cwd();

    // 将模版下的文件全部转换到目标目录
    fs.readdir(tmplDir, (err, files) => {
        if(err) throw err;
        console.log(files);
        files.forEach(file => {
            // 通过模版引擎渲染文件
            ejs.renderFile(path.join(tmplDir, file), anwsers, (err, result) => {
                if(err) throw err;

                // 将结果写入目标文件路径
                fs.writeFileSync(path.join(destDir, file), result);
            })
        })
    })
})