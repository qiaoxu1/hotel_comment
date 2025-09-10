window.magicProjectConfig = {
  "version": "1.0.0",
  "type": "dashboard",
  "name": "酒店运营分析看板",
  "dataSources": [
    { "name": "优势关键词", "url": "./优势关键词.csv" },
    { "name": "住宿时长问题分析", "url": "./住宿时长问题分析.csv" },
    { "name": "关键词频次", "url": "./关键词频次.csv" },
    { "name": "客户群体问题分析", "url": "./客户群体问题分析.csv" },
    { "name": "情感分布统计", "url": "./情感分布统计.csv" },
    { "name": "服务维度统计", "url": "./服务维度统计.csv" },
    { "name": "维度情感分析", "url": "./维度情感分析.csv" },
    { "name": "评价长度分析", "url": "./评价长度分析.csv" },
    { "name": "评论详情", "url": "./评论详情.csv" },
    { "name": "详细改进建议", "url": "./详细改进建议.csv" },
    { "name": "负面评论案例", "url": "./负面评论案例.csv" },
    { "name": "负面评论问题分类", "url": "./负面评论问题分类.csv" },
    { "name": "运营优化建议", "url": "./运营优化建议.csv" },
    { "name": "问题严重程度", "url": "./问题严重程度.csv" },
    { "name": "问题关键词", "url": "./问题关键词.csv" }
  ],
  "geo": [],
};

window.magicProjectConfigure(window.magicProjectConfig);
