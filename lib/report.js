import fs from "fs";
import path from "path";
import { writeJsFile, writeJsonFile } from "./file.js";
import {
  TEMPLATEDIR,
  REPORTFILENAME,
  REPORTJSPRE,
  DIAGNOSISREPORTFILENAME,
} from "./constant.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 输出分析报告
export const writeReport = function (dir, content, templatePath = "") {
  try {
    // 创建目录
    fs.mkdirSync(path.join(process.cwd(), `/${dir}`));
    // 复制报告模版
    if (templatePath && templatePath != "") {
      fs.writeFileSync(
        path.join(process.cwd(), `/${dir}/${REPORTFILENAME}.html`),
        fs.readFileSync(path.join(process.cwd(), `${templatePath}`))
      );
    } else {
      fs.writeFileSync(
        path.join(process.cwd(), `/${dir}/${REPORTFILENAME}.html`),
        fs.readFileSync(
          path.join(__dirname, `../${TEMPLATEDIR}/${REPORTFILENAME}.html`)
        )
      );
    }
    // 分析结果写入文件
    writeJsFile(REPORTJSPRE, content, `${dir}/${REPORTFILENAME}`);
    writeJsonFile(content, `${dir}/${REPORTFILENAME}`);
  } catch (e) {
    throw e;
  }
};
// 输出诊断报告
export const writeDiagnosisReport = function (dir, content) {
  try {
    writeJsonFile(content, `${dir}/${DIAGNOSISREPORTFILENAME}`);
  } catch (e) {
    throw e;
  }
};
