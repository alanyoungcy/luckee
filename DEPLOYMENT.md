# 部署指南

## GitHub Pages 部署

### 方法一：自动部署（推荐）

1. **创建 GitHub 仓库**
   ```bash
   # 初始化 Git 仓库
   git init
   git add .
   git commit -m "Initial commit: $LUCKEE website"
   
   # 创建 GitHub 仓库并推送
   git remote add origin https://github.com/your-username/luckee-website.git
   git branch -M main
   git push -u origin main
   ```

2. **启用 GitHub Pages**
   - 进入 GitHub 仓库页面
   - 点击 "Settings" 标签
   - 滚动到 "Pages" 部分
   - 在 "Source" 下选择 "Deploy from a branch"
   - 选择 "main" 分支和 "/ (root)" 文件夹
   - 点击 "Save"

3. **访问网站**
   - GitHub Pages 会自动生成 URL：`https://your-username.github.io/luckee-website`
   - 部署通常需要几分钟时间

### 方法二：使用 GitHub Actions

1. **创建 `.github/workflows/deploy.yml` 文件**
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
       - uses: actions/checkout@v2
       
       - name: Deploy to GitHub Pages
         uses: peaceiris/actions-gh-pages@v3
         with:
           github_token: ${{ secrets.GITHUB_TOKEN }}
           publish_dir: ./
   ```

## Netlify 部署

1. **准备项目**
   - 确保项目已推送到 GitHub

2. **连接 Netlify**
   - 访问 [Netlify](https://netlify.com)
   - 点击 "New site from Git"
   - 选择 GitHub 并授权
   - 选择你的仓库

3. **配置部署设置**
   - Build command: 留空（静态网站）
   - Publish directory: `/`（根目录）
   - 点击 "Deploy site"

4. **自定义域名（可选）**
   - 在站点设置中添加自定义域名
   - 配置 DNS 记录

## Vercel 部署

1. **安装 Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **部署项目**
   ```bash
   vercel
   ```

3. **按提示操作**
   - 选择项目类型：Static
   - 确认部署目录：当前目录
   - 等待部署完成

## 本地测试

### 使用 Python
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### 使用 Node.js
```bash
# 安装 serve
npm install -g serve

# 启动服务器
serve -s . -l 8000
```

### 使用 PHP
```bash
php -S localhost:8000
```

### 使用 Live Server (VS Code)
1. 安装 Live Server 扩展
2. 右键点击 `index.html`
3. 选择 "Open with Live Server"

## 性能优化

### 图片优化
```bash
# 使用 ImageOptim 或类似工具压缩图片
# 确保 LOGO.png 文件大小合理
```

### 代码压缩
```bash
# 压缩 CSS
npm install -g clean-css-cli
cleancss -o styles.min.css styles.css

# 压缩 JavaScript
npm install -g uglify-js
uglifyjs script.js -o script.min.js
```

### 启用 Gzip 压缩
在服务器配置中启用 Gzip 压缩：
```nginx
# Nginx 配置示例
gzip on;
gzip_types text/css application/javascript text/html;
```

## 安全配置

### 添加安全头
```html
<!-- 在 index.html 的 head 部分添加 -->
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta http-equiv="X-Frame-Options" content="DENY">
<meta http-equiv="X-XSS-Protection" content="1; mode=block">
```

### HTTPS 配置
- GitHub Pages 自动提供 HTTPS
- Netlify 和 Vercel 也自动支持 HTTPS
- 确保所有外部资源使用 HTTPS

## 监控和分析

### Google Analytics
```html
<!-- 在 index.html 的 head 部分添加 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 性能监控
- 使用 Google PageSpeed Insights 测试性能
- 使用 WebPageTest 进行详细分析
- 监控 Core Web Vitals

## 故障排除

### 常见问题

1. **页面显示空白**
   - 检查文件路径是否正确
   - 确认所有文件都已上传
   - 查看浏览器控制台错误

2. **样式不加载**
   - 检查 CSS 文件路径
   - 确认外部字体和图标链接正常

3. **JavaScript 不工作**
   - 检查浏览器控制台错误
   - 确认 JavaScript 文件路径正确

4. **移动端显示异常**
   - 检查 viewport meta 标签
   - 测试响应式断点

### 调试技巧
```bash
# 检查文件结构
tree -I 'node_modules|.git'

# 验证 HTML
npx html-validate index.html

# 检查 CSS
npx stylelint styles.css

# 检查 JavaScript
npx eslint script.js
```

## 维护更新

### 定期检查
- 每月检查外部依赖更新
- 定期测试所有功能
- 监控网站性能

### 备份策略
- 使用 Git 进行版本控制
- 定期备份到多个位置
- 保存部署配置

---

**注意**：部署前请确保所有内容符合当地法律法规，特别是关于加密货币和金融产品的规定。 