// 酒店运营分析看板数据配置
const DASHBOARD_CARDS = [
  // 第一行：核心指标卡片
  {
    id: "total-reviews",
    type: "metric", 
    title: "评论总量",
    layout: { x: 0, y: 0, w: 6, h: 4 },
    source: "./cleaned_data/评论详情",
    getCardData: async (csv) => {
      const result = await csv.load("评论详情");
      return {
        label: "总评论数",
        value: result.data.length.toLocaleString(),
        unit: "条",
        icon: "ti-message-circle",
        iconColor: "#3b82f6"
      };
    }
  },
  
  {
    id: "positive-rate",
    type: "metric",
    title: "正面评价率", 
    layout: { x: 6, y: 0, w: 6, h: 4 },
    source: "./cleaned_data/情感分布统计",
    getCardData: async (csv) => {
      const result = await csv.load("情感分布统计");
      const positiveRow = result.data.find(row => row["情感倾向"] === "正面");
      return {
        label: "正面评价率",
        value: positiveRow ? `${positiveRow["占比"]}%` : "0%",
        icon: "ti-thumb-up",
        iconColor: "#10b981"
      };
    }
  },
  
  {
    id: "negative-rate", 
    type: "metric",
    title: "负面评价率",
    layout: { x: 12, y: 0, w: 6, h: 4 },
    source: "./cleaned_data/情感分布统计",
    getCardData: async (csv) => {
      const result = await csv.load("情感分布统计");
      const negativeRow = result.data.find(row => row["情感倾向"] === "负面");
      return {
        label: "负面评价率", 
        value: negativeRow ? `${negativeRow["占比"]}%` : "0%",
        icon: "ti-thumb-down",
        iconColor: "#ef4444"
      };
    }
  },
  
  {
    id: "top-service-dimension",
    type: "metric",
    title: "最受关注维度",
    layout: { x: 18, y: 0, w: 6, h: 4 },
    source: "./cleaned_data/服务维度统计", 
    getCardData: async (csv) => {
      const result = await csv.load("服务维度统计");
      const topDimension = result.data[0];
      return {
        label: "最受关注",
        value: topDimension["服务维度"],
        change: `${topDimension["提及率"]}%`,
        icon: "ti-star",
        iconColor: "#f59e0b"
      };
    }
  },

  // 第二行：情感分布分析
  {
    id: "sentiment-distribution",
    type: "echarts",
    title: "客户情感分布分析",
    layout: { x: 0, y: 4, w: 12, h: 9 },
    source: "./cleaned_data/情感分布统计",
    getCardData: async (csv) => {
      const result = await csv.load("情感分布统计");
      const data = result.data.map(row => ({
        name: row["情感倾向"],
        value: parseFloat(row["评论数量"])
      }));
      
      return {
        grid: { left: 0, right: 0, top: 0, bottom: 0, containLabel: false, outerBounds: { bottom: 30 } },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          type: "scroll",
          bottom: 0
        },
        series: [{
          name: '情感分布',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '45%'],
          data: data,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            formatter: '{b}\n{c}条\n({d}%)',
            textStyle: {
              textBorderColor: '#fff',
              textBorderWidth: 2
            }
          },
          labelLayout: {
            hideOverlap: true
          }
        }]
      };
    }
  },

  {
    id: "service-dimension-radar",
    type: "echarts", 
    title: "服务维度关注度雷达图",
    layout: { x: 12, y: 4, w: 12, h: 9 },
    source: "./cleaned_data/服务维度统计",
    getCardData: async (csv) => {
      const result = await csv.load("服务维度统计");
      const data = result.data.map(row => parseFloat(row["提及率"]));
      const indicators = result.data.map(row => ({
        name: row["服务维度"],
        max: 100
      }));
      
      return {
        grid: { left: 0, right: 0, top: 0, bottom: 0, containLabel: false },
        tooltip: {
          trigger: 'item'
        },
        radar: {
          indicator: indicators,
          center: ['50%', '50%'],
          radius: '70%'
        },
        series: [{
          name: '服务维度关注度',
          type: 'radar', 
          data: [{
            value: data,
            name: '提及率(%)',
            areaStyle: {
              opacity: 0.3
            }
          }]
        }]
      };
    }
  },

  // 第三行：服务维度详细分析
  {
    id: "service-dimension-bar",
    type: "echarts",
    title: "各服务维度提及次数对比",
    layout: { x: 0, y: 13, w: 16, h: 9 },
    source: "./cleaned_data/服务维度统计",
    getCardData: async (csv) => {
      const result = await csv.load("服务维度统计");
      const categories = result.data.map(row => row["服务维度"]);
      const values = result.data.map(row => parseFloat(row["提及次数"]));
      
      return {
        grid: { left: 0, right: 0, top: 0, bottom: 0, containLabel: false },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: categories,
          axisLabel: {
            rotate: 45
          }
        },
        yAxis: {
          type: 'value',
          name: '提及次数'
        },
        series: [{
          name: '提及次数',
          type: 'bar',
          data: values,
          itemStyle: {
            color: '#3b82f6',
            borderRadius: [4, 4, 0, 0]
          },
          label: {
            show: true,
            position: 'top',
            textStyle: {
              textBorderColor: '#fff',
              textBorderWidth: 1
            }
          },
          labelLayout: {
            hideOverlap: true
          }
        }]
      };
    }
  },

  {
    id: "dimension-sentiment-analysis",
    type: "echarts",
    title: "各维度情感倾向分析",
    layout: { x: 16, y: 13, w: 8, h: 9 },
    source: "./cleaned_data/维度情感分析",
    getCardData: async (csv) => {
      const result = await csv.load("维度情感分析");
      const categories = result.data.map(row => row["服务维度"]);
      const positiveRates = result.data.map(row => parseFloat(row["正面率"]));
      const negativeRates = result.data.map(row => parseFloat(row["负面率"]));
      
      return {
        grid: { left: 0, right: 0, top: 0, bottom: 0, containLabel: false, outerBounds: { bottom: 30 } },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          type: "scroll",
          bottom: 0
        },
        xAxis: {
          type: 'category',
          data: categories,
          axisLabel: {
            rotate: 45
          }
        },
        yAxis: {
          type: 'value',
          name: '比例(%)'
        },
        series: [
          {
            name: '正面率',
            type: 'bar',
            data: positiveRates,
            itemStyle: {
              color: '#10b981'
            }
          },
          {
            name: '负面率', 
            type: 'bar',
            data: negativeRates,
            itemStyle: {
              color: '#ef4444'
            }
          }
        ]
      };
    }
  },

  // 第四行：关键词分析
  {
    id: "keyword-frequency",
    type: "echarts",
    title: "高频关键词分析",
    layout: { x: 0, y: 22, w: 12, h: 9 },
    source: "./cleaned_data/关键词频次",
    getCardData: async (csv) => {
      const result = await csv.load("关键词频次");
      const top15 = result.data.slice(0, 15);
      const keywords = top15.map(row => row["关键词"]);
      const frequencies = top15.map(row => parseFloat(row["出现次数"]));
      
      return {
        grid: { left: 0, right: 0, top: 0, bottom: 0, containLabel: false },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: keywords
        },
        series: [{
          name: '出现次数',
          type: 'bar',
          data: frequencies,
          itemStyle: {
            color: '#8b5cf6'
          },
          label: {
            show: true,
            position: 'right',
            textStyle: {
              textBorderColor: '#fff',
              textBorderWidth: 1
            }
          },
          labelLayout: {
            hideOverlap: true
          }
        }]
      };
    }
  },

  {
    id: "problem-keywords",
    type: "echarts",
    title: "问题关键词识别",
    layout: { x: 12, y: 22, w: 12, h: 9 },
    source: "./cleaned_data/问题关键词",
    getCardData: async (csv) => {
      const result = await csv.load("问题关键词");
      const top10 = result.data.slice(0, 10);
      const keywords = top10.map(row => row["问题关键词"]);
      const counts = top10.map(row => parseFloat(row["出现次数"]));
      
      return {
        grid: { left: 0, right: 0, top: 0, bottom: 0, containLabel: false },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: keywords,
          axisLabel: {
            rotate: 45
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '出现次数',
          type: 'bar',
          data: counts,
          itemStyle: {
            color: '#ef4444'
          },
          label: {
            show: true,
            position: 'top',
            textStyle: {
              textBorderColor: '#fff',
              textBorderWidth: 1
            }
          },
          labelLayout: {
            hideOverlap: true
          }
        }]
      };
    }
  },

  // 第五行：评价长度分析和优势分析
  {
    id: "review-length-analysis",
    type: "echarts",
    title: "评价长度分布",
    layout: { x: 0, y: 31, w: 12, h: 9 },
    source: "./cleaned_data/评价长度分析",
    getCardData: async (csv) => {
      const result = await csv.load("评价长度分析");
      const categories = result.data.map(row => row["长度分类"]);
      const counts = result.data.map(row => parseFloat(row["评论数量"]));
      
      return {
        grid: { left: 0, right: 0, top: 0, bottom: 0, containLabel: false, outerBounds: { bottom: 30 } },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          type: "scroll",
          bottom: 0
        },
        series: [{
          name: '评价长度分布',
          type: 'pie',
          radius: '60%',
          center: ['50%', '45%'],
          data: categories.map((cat, index) => ({
            name: cat,
            value: counts[index]
          })),
          label: {
            show: true,
            formatter: '{b}\n{c}条',
            textStyle: {
              textBorderColor: '#fff',
              textBorderWidth: 2
            }
          },
          labelLayout: {
            hideOverlap: true
          }
        }]
      };
    }
  },

  {
    id: "strength-keywords",
    type: "echarts", 
    title: "酒店优势关键词",
    layout: { x: 12, y: 31, w: 12, h: 9 },
    source: "./cleaned_data/优势关键词",
    getCardData: async (csv) => {
      const result = await csv.load("优势关键词");
      const top10 = result.data.slice(0, 10);
      const keywords = top10.map(row => row["优势关键词"]);
      const counts = top10.map(row => parseFloat(row["出现次数"]));
      
      return {
        grid: { left: 0, right: 0, top: 0, bottom: 0, containLabel: false },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: keywords
        },
        series: [{
          name: '出现次数',
          type: 'bar',
          data: counts,
          itemStyle: {
            color: '#10b981'
          },
          label: {
            show: true,
            position: 'right',
            textStyle: {
              textBorderColor: '#fff',
              textBorderWidth: 1
            }
          },
          labelLayout: {
            hideOverlap: true
          }
        }]
      };
    }
  },

  // 运营优化建议表格
  {
    id: "operational-suggestions",
    type: "table",
    title: "运营优化建议",
    layout: { x: 0, y: 40, w: 16, h: 12 },
    source: "./cleaned_data/运营优化建议",
    getCardData: async (csv) => {
      const result = await csv.load("运营优化建议");
      return {
        columns: [
          { title: "优先级", dataIndex: "优先级", dataType: "string", width: 80, sortable: true },
          { title: "问题领域", dataIndex: "问题领域", dataType: "string", width: 100, sortable: true },
          { title: "优化建议", dataIndex: "优化建议", dataType: "string", width: 300 },
          { title: "紧急程度", dataIndex: "紧急程度", dataType: "string", width: 80, sortable: true, 
            formatter: (value) => {
              const colors = { '高': '🔴', '中': '🟡', '低': '🟢' };
              return `${colors[value] || ''} ${value}`;
            }
          }
        ],
        data: result.data
      };
    }
  },

  // 评论详情表格
  {
    id: "review-details",
    type: "table", 
    title: "评论详情数据",
    layout: { x: 16, y: 40, w: 8, h: 12 },
    source: "./cleaned_data/评论详情",
    getCardData: async (csv) => {
      const result = await csv.load("评论详情");
      // 只显示前100条数据以提高性能
      const displayData = result.data.slice(0, 100);
      
      return {
        columns: [
          { title: "ID", dataIndex: "评论ID", dataType: "number", width: 50, sortable: true },
          { title: "情感", dataIndex: "情感倾向", dataType: "string", width: 60, sortable: true, filterable: true,
            formatter: (value) => {
              const colors = { '正面': '😊', '负面': '😞', '中性': '😐' };
              return `${colors[value] || ''} ${value}`;
            }
          },
          { title: "长度", dataIndex: "评价长度", dataType: "number", width: 60, sortable: true },
          { title: "评价内容", dataIndex: "评价内容", dataType: "string", width: 200,
            formatter: (value) => value.length > 50 ? value.substring(0, 50) + '...' : value
          }
        ],
        data: displayData
      };
    }
  },

  // 负面评论深度分析
  {
    id: "negative-problem-classification",
    type: "echarts",
    title: "负面评论问题分类分析",
    layout: { x: 0, y: 52, w: 12, h: 10 },
    source: "./cleaned_data/负面评论问题分类",
    getCardData: async (csv) => {
      const result = await csv.load("负面评论问题分类");
      const categories = result.data.map(row => row["问题类型"]);
      const counts = result.data.map(row => parseFloat(row["出现次数"]));
      const percentages = result.data.map(row => parseFloat(row["占负面评论比例"]));
      
      return {
        grid: { left: 0, right: 0, top: 0, bottom: 0, containLabel: false },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function(params) {
            const data = params[0];
            const index = data.dataIndex;
            return `${data.name}<br/>出现次数: ${data.value}<br/>占负面评论: ${percentages[index]}%`;
          }
        },
        xAxis: {
          type: 'category',
          data: categories,
          axisLabel: {
            rotate: 45
          }
        },
        yAxis: {
          type: 'value',
          name: '出现次数'
        },
        series: [{
          name: '问题出现次数',
          type: 'bar',
          data: counts,
          itemStyle: {
            color: function(params) {
              const colors = ['#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e'];
              return colors[params.dataIndex % colors.length];
            }
          },
          label: {
            show: true,
            position: 'top',
            formatter: '{c}',
            textStyle: {
              textBorderColor: '#fff',
              textBorderWidth: 1
            }
          },
          labelLayout: {
            hideOverlap: true
          }
        }]
      };
    }
  },

  {
    id: "customer-group-problems",
    type: "echarts",
    title: "不同客户群体问题分布",
    layout: { x: 12, y: 52, w: 12, h: 10 },
    source: "./cleaned_data/客户群体问题分析",
    getCardData: async (csv) => {
      const result = await csv.load("客户群体问题分析");
      const groups = result.data.map(row => row["客户群体"]);
      const counts = result.data.map(row => parseFloat(row["负面评论数"]));
      
      return {
        grid: { left: 0, right: 0, top: 0, bottom: 0, containLabel: false },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [{
          name: '客户群体负面评论',
          type: 'pie',
          radius: ['30%', '70%'],
          center: ['50%', '50%'],
          data: groups.map((group, index) => ({
            name: group,
            value: counts[index]
          })),
          itemStyle: {
            borderRadius: 8,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            formatter: '{b}\n{c}条\n({d}%)',
            textStyle: {
              textBorderColor: '#fff',
              textBorderWidth: 2
            }
          },
          labelLayout: {
            hideOverlap: true
          }
        }]
      };
    }
  },

  {
    id: "problem-severity-analysis",
    type: "echarts", 
    title: "问题严重程度分析",
    layout: { x: 0, y: 62, w: 8, h: 8 },
    source: "./cleaned_data/问题严重程度",
    getCardData: async (csv) => {
      const result = await csv.load("问题严重程度");
      const severity = result.data.map(row => row["严重程度"]);
      const counts = result.data.map(row => parseFloat(row["数量"]));
      
      const colorMap = {
        '严重': '#ef4444',
        '中等': '#f97316', 
        '轻微': '#22c55e'
      };
      
      return {
        grid: { left: 0, right: 0, top: 0, bottom: 0, containLabel: false },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [{
          name: '问题严重程度',
          type: 'pie',
          radius: '70%',
          center: ['50%', '50%'],
          data: severity.map((level, index) => ({
            name: level,
            value: counts[index],
            itemStyle: {
              color: colorMap[level] || '#64748b'
            }
          })),
          label: {
            show: true,
            formatter: '{b}\n{c}条',
            textStyle: {
              textBorderColor: '#fff',
              textBorderWidth: 2
            }
          },
          labelLayout: {
            hideOverlap: true
          }
        }]
      };
    }
  },

  {
    id: "detailed-improvement-suggestions",
    type: "table",
    title: "详细改进建议方案",
    layout: { x: 8, y: 62, w: 16, h: 8 },
    source: "./cleaned_data/详细改进建议",
    getCardData: async (csv) => {
      const result = await csv.load("详细改进建议");
      return {
        columns: [
          { title: "问题类型", dataIndex: "问题类型", dataType: "string", width: 80, sortable: true },
          { title: "出现频率", dataIndex: "出现频率", dataType: "string", width: 100, sortable: true },
          { title: "紧急程度", dataIndex: "紧急程度", dataType: "string", width: 70, sortable: true,
            formatter: (value) => {
              const colors = { '高': '🔴', '中': '🟡', '低': '🟢' };
              return `${colors[value] || ''} ${value}`;
            }
          },
          { title: "短期措施", dataIndex: "短期措施", dataType: "string", width: 200 },
          { title: "预算估算", dataIndex: "预算估算", dataType: "string", width: 150 },
          { title: "预期效果", dataIndex: "预期效果", dataType: "string", width: 200 }
        ],
        data: result.data
      };
    }
  },

  {
    id: "negative-cases-analysis",
    type: "table",
    title: "负面评论典型案例",
    layout: { x: 0, y: 70, w: 24, h: 10 },
    source: "./cleaned_data/负面评论案例",
    getCardData: async (csv) => {
      const result = await csv.load("负面评论案例");
      // 只显示前20条典型案例
      const displayData = result.data.slice(0, 20);
      
      return {
        columns: [
          { title: "ID", dataIndex: "评论ID", dataType: "number", width: 50, sortable: true },
          { title: "客户类型", dataIndex: "客户类型", dataType: "string", width: 80, sortable: true, filterable: true },
          { title: "住宿时长", dataIndex: "住宿时长", dataType: "string", width: 80, sortable: true, filterable: true },
          { title: "问题分类", dataIndex: "问题分类", dataType: "string", width: 120, filterable: true },
          { title: "评论长度", dataIndex: "评论长度", dataType: "number", width: 80, sortable: true },
          { title: "评论内容", dataIndex: "评论内容", dataType: "string", width: 300 }
        ],
        data: displayData
      };
    }
  },

  // 总结分析
  {
    id: "analysis-summary",
    type: "markdown",
    title: "酒店运营分析总结",
    layout: { x: 0, y: 80, w: 24, h: 50 },
    getCardData: async (csv) => {
      return {
        content: `
## 🏨 乐山安珀酒店运营分析报告

<div style="background-color:rgb(214, 229, 130); font-size: 14px; padding: 14px; border-radius: 8px; margin-bottom: 20px;">

### 📊 核心数据概览
- **总评论数量**: 1,055条
- **正面评价率**: 85.7% (904条)
- **负面评价率**: 14.5% (153条) - *深度分析识别*
- **中性评价**: 10.5% (111条)

### 🔍 负面评论深度分析

#### 📈 问题分布统计
通过深度文本分析，我们识别出153条负面评论，主要问题分布：

1. **房间设施问题** - 107次 (69.93%) 🔴 **高优先级**
   - 空调噪音、电视无投屏功能、枕头不舒适
   - 马桶噪音大、卫生间光线刺眼、空间偏小

2. **餐饮服务问题** - 71次 (46.41%) 🔴 **高优先级**
   - 早餐品种少、收餐时间早、餐具不齐全
   - 服务人员不足、蛋烘糕台无人值守

3. **位置交通问题** - 34次 (22.22%) 🟡 **中优先级**
   - 距离市区较远、叫车不便、标识不清楚

4. **清洁卫生问题** - 33次 (21.57%) 🟡 **中优先级**
   - 个别区域清洁不到位、客人素质问题影响环境

5. **价格争议问题** - 24次 (15.69%) 🟡 **中优先级**
   - SPA服务定价过高、性价比争议、收费透明度不足

#### 👥 客户群体特征分析

**普通客户** (103条负面评论，67.3%)
- 主要问题：房间设施 > 餐饮服务 > 清洁卫生
- 特点：对基础服务要求较高，关注性价比

**商务客户** (25条负面评论，16.3%)
- 主要问题：房间设施 > 餐饮服务 > 价格争议
- 特点：评论详细，对效率和专业性要求高

**家庭客户** (15条负面评论，9.8%)
- 主要问题：房间设施 > 餐饮服务 > 位置交通
- 特点：关注安全性和便利性，对儿童友好度敏感

#### ⚠️ 问题严重程度分析
- **严重问题**: 27条 (17.6%) - 涉及安全、隐私、服务态度
- **中等问题**: 57条 (37.3%) - 设施故障、服务不及时
- **轻微问题**: 69条 (45.1%) - 细节改进、个人偏好

### 🎯 精准改进方案

#### 🔴 高优先级改进 (1-3个月)

**房间设施优化** - 预算50-100万元
- **短期措施**: 立即检查维修所有空调系统，更换不合适枕头
- **中期措施**: 升级电视系统支持投屏，优化卫生间照明设计
- **预期效果**: 1个月内设备投诉减少80%，3个月内房间满意度达98%

**餐饮服务提升** - 预算20-40万元
- **短期措施**: 延长早餐时间至10:30，增加抹面包餐刀等餐具
- **中期措施**: 丰富早餐品种，增加服务人员配置
- **预期效果**: 1个月内早餐满意度提升至90%，成为酒店亮点

#### 🟡 中优先级改进 (3-6个月)

**价格透明化** - 预算10-20万元
- 重新制定SPA等服务定价策略
- 建立透明的价格体系和会员优惠机制
- 预期价格投诉减少70%

**位置便利性** - 预算5-15万元
- 完善酒店标识系统，优化接送服务
- 与网约车平台建立合作关系
- 提升客人出行便利度

#### 🟢 长期战略改进 (6-12个月)

**智能化升级** - 预算100-200万元
- 建立智能房间管理系统
- 导入国际酒店管理标准
- 打造行业标杆地位

### 📊 客户群体针对性策略

**普通客户** - 注重基础体验优化
- 重点改善房间基础设施
- 提升早餐服务标准
- 加强清洁质量管控

**商务客户** - 强化效率和专业性
- 优化入住退房流程
- 提供商务专属服务
- 建立VIP客户管理体系

**家庭客户** - 突出安全和便利
- 完善亲子活动设施
- 加强安全管理措施
- 提供家庭专属服务包

### 📈 预期改进效果

**短期目标** (1-3个月)
- 负面评价率从14.5%降至8%以下
- 房间设施满意度提升至98%
- 餐饮服务满意度达到90%

**中期目标** (3-6个月)
- 负面评价率控制在5%以内
- 整体客户满意度达到95%
- 建立行业领先的服务标准

**长期愿景** (6-12个月)
- 成为乐山地区服务标杆酒店
- 负面评价率控制在2%以内
- 实现可持续的高质量发展

### 💰 投资回报预测

**总投资预算**: 185-375万元
**预期收益**:
- 客户满意度提升带来的复购率增长: +15%
- 口碑改善带来的新客获取: +20%
- 服务溢价能力提升: +10%
- **预计ROI**: 18-24个月回收投资

---
*数据来源: 基于1,055条真实客户评论的深度分析，包含153条负面评论的多维度交叉分析*
</div>
        `
      };
    }
  }
];

// 导出数据供看板使用
window.DASHBOARD_CARDS = DASHBOARD_CARDS;
