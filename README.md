# 手势交互汉字拆分与字帖

Flask 单页应用：前端静态资源 + `/api/split_char`（火山方舟）+ `/api/assets` 字帖底图。

## 环境变量

| 变量 | 说明 |
|------|------|
| `ARK_API_KEY` | **必填**，火山方舟 API Key |
| `HANZI_ASSET_DIR` | 可选，字帖背景 PNG 目录，默认项目下 `assets/` |

## 本地运行

```bash
python -m venv .venv
.venv\Scripts\activate   # Windows
# source .venv/bin/activate  # Linux/macOS
pip install -r requirements.txt
set ARK_API_KEY=你的密钥   # Windows cmd
# export ARK_API_KEY=...   # Linux/macOS
python app.py
```

浏览器访问 `http://127.0.0.1:5000`。

## Windows 服务器部署（Waitress）

Gunicorn 在 Windows 上不便使用，本项目用 [Waitress](https://docs.pylonsproject.org/projects/waitress/) 作为 WSGI 服务器（Windows / Linux 均可）。

```powershell
cd D:\path\to\app
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
$env:ARK_API_KEY="你的密钥"
waitress-serve --listen=0.0.0.0:8000 app:app
```

浏览器或反向代理访问 `http://服务器IP:8000`。前面可接 IIS 反向代理或 Nginx（Linux）等，将流量转到 `127.0.0.1:8000`。

**Linux 上也可用同样命令**：`waitress-serve --listen=0.0.0.0:8000 app:app`（激活虚拟环境并设置 `ARK_API_KEY` 后执行）。若你更习惯 Gunicorn，也可在 Linux 上单独 `pip install gunicorn` 后使用 `gunicorn -w 2 -b 0.0.0.0:8000 app:app`。

## 目录说明

- `app.py` — Flask 入口
- `templates/` — `index.html`
- `static/` — `gestures.js`、`style.css`
- `assets/` — 可选，放入字帖用 PNG，通过 `/api/assets` 列出

## 前端依赖（CDN）

页面使用 jsDelivr 加载 MediaPipe Hands、html-to-image。**服务器需能访问外网 CDN**，否则手势与导出截图需改成本地资源。

## 发布包

使用仓库内 `pack_release.ps1` 生成 `hanzi-gesture-app.zip`（不含 `__pycache__`、不含 `.venv`），上传服务器解压后按上文配置运行。
