class CodeAnalysis {
  constructor(options) {
    // 私有属性
    this._scanSource = options.scanSource; // 扫描源配置信息
    this._analysisTarget = options.analysisTarget; // 要分析的目标依赖配置
    this._blackList = options.blackList || []; // 需要标记的黑名单API配置
    this._scorePlugin = options.scorePlugin || null; // 代码评分插件配置
    this._analysisPlugins = options.analysisPlugins || []; // 代码分析插件配置
    // 公共属性
    this.pluginsQueue = []; // Targer分析插件队列
    this.browserQueue = []; // Browser分析插件队列
    this.importItemMap = {}; // importItem统计Map
    // this.apiMap = {};                                       // 未分类API统计Map（插件挂载）
    // this.typeMap = {};                                      // 类型API统计Map（插件挂载）
    // this.methodMap = {};                                    // 方法API统计Map（插件挂载）
    // this.browserMap = {};                                   // BrowserAPI统计Map（插件挂载）
    this.parseErrorInfos = []; // 解析异常信息数组
    this.diagnosisInfos = []; // 诊断日志信息数组
    this.scoreMap = {}; // 代码评分及建议Map
  }
  // API黑名单标记
  _blackTag() {}
  // 注册插件
  _installPlugins() {}
  // 链式调用检查，找出链路顶点node
  _checkPropertyAccess() {}
  // 执行分析插件队列中的checkFun函数
  _runAnalysisPlugins() {}
  // 执行分析插件队列中的afterHook函数
  _runAnalysisPluginsHook() {}
  // 分析import节点
  _findImportItems(ast) {
    let importItems = {};
    // 处理imports相关map
    function dealImports() {
      // 处理importItems
    }
    // 遍历AST寻找import节点
    function walk(node) {
      tsCompiler.forEachChild(node, walk);
      // 分析引入情况
      dealImports();
    }
    walk(ast);
    // 返回 API 导入情况
    return importItems;
  }
  // API调用分析
  _dealAST(importItems, ast) {
    const that = this;
    // 遍历AST
    function walk(node) {
      tsCompiler.forEachChild(node, walk);
      // 获取基础分析节点信息
      const { baseNode, depth, apiName } = that._checkPropertyAccess();
      // 执行分析插件
      that._runAnalysisPlugins();
    }
    walk(ast);
    // AST遍历结束，执行afterhook
    this._runAnalysisPluginsHook();
  }
  // 扫描代码文件
  _scanFiles() {
    let entrys = [];

    return entrys;
  }
  // 扫描代码文件 & 分析代码
  _scanCode() {
    const entrys = this._scanFiles(); // 扫描所有需要分析的代码文件
    // 遍历每个文件，依次（解析AST，分析import，分析API调用）
    entrys.forEach(() => {
      const { ast } = parseTs(); // 将TS代码文件解析为 AST
      const importItems = this._findImportItems(ast); // 遍历 AST 分析 import 节点
      if (Object.keys(importItems).length > 0) {
        this._dealAST(importItems, ast); // 遍历 AST 分析 API 调用
      }
    });
  }
  // 记录诊断日志
  addDiagnosisInfo() {}
  // 入口函数
  analysis() {
    // 注册插件
    this._installPlugins();
    // 扫描分析代码
    this._scanCode();
    // 黑名单标记
    this._blackTag();
    // 代码评分
    this._scorePlugin();
  }
}
