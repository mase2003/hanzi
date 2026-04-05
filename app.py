import json
import os
import re
from pathlib import Path

import requests
from flask import Flask, jsonify, render_template, request, send_file, abort


class ReverseProxied:
    """配合 Nginx 子路径：proxy_set_header X-Script-Name /hanzi;"""

    def __init__(self, app):
        self.app = app

    def __call__(self, environ, start_response):
        script = (environ.get("HTTP_X_SCRIPT_NAME") or "").rstrip("/")
        if script:
            environ["SCRIPT_NAME"] = script
        return self.app(environ, start_response)


app = Flask(__name__)
app.wsgi_app = ReverseProxied(app.wsgi_app)
_APP_DIR = Path(__file__).resolve().parent
ASSET_DIR = Path(os.environ.get("HANZI_ASSET_DIR", str(_APP_DIR / "assets")))


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/assets", methods=["GET"])
def list_assets():
    if not ASSET_DIR.exists():
        return jsonify({"ok": True, "files": []})
    files = []
    for p in sorted(ASSET_DIR.glob("*.png")):
        root = (request.script_root or "").rstrip("/")
        files.append(
            {"name": p.name, "url": f"{root}/api/asset/{p.name}" if root else f"/api/asset/{p.name}"}
        )
    return jsonify({"ok": True, "files": files})


@app.route("/api/asset/<path:name>", methods=["GET"])
def get_asset(name: str):
    p = (ASSET_DIR / name).resolve()
    try:
        p.relative_to(ASSET_DIR.resolve())
    except Exception:
        abort(403)
    if not p.exists() or not p.is_file():
        abort(404)
    return send_file(p)


@app.route("/api/split_char", methods=["POST"])
def split_char():
    """
    使用火山方舟 Ark Responses API 拆解单个汉字为偏旁部首。
    前端传入: {"char": "学"}
    返回: {"ok": true, "parts": ["⺍","子","冖"]}
    """
    data = request.get_json(silent=True) or {}
    ch = (data.get("char") or "").strip()
    mode = (data.get("mode") or "radical").strip().lower()
    if mode not in {"radical", "stroke"}:
        mode = "radical"
    if not ch:
        return jsonify({"ok": False, "error": "缺少 char 参数"}), 400

    api_key = os.environ.get("ARK_API_KEY")
    if not api_key:
        return jsonify({"ok": False, "error": "服务器未配置方舟 API 密钥(ARK_API_KEY)"}), 500

    url = "https://ark.cn-beijing.volces.com/api/v3/responses"
    model = "doubao-seed-1-8-251228"

    if mode == "stroke":
        system_prompt = (
            "你是一个专业的汉字笔画拆解助手。"
            "任务：给定一个单个汉字，只输出该字对应的基础笔画符号数组。"
            "要求：\n"
            "1. 仅输出 JSON 数组字符串。\n"
            "2. 笔画符号仅可来自以下集合："
            "丶 一 丨 丿 ㇏ ㇀ 𠃍 ㇇ 乛 𠃌 ㇊ ㇍ ㇅ ⺄ ㇈ ㇌ ㇋ 𠄎 ㇎ 𠄌 𠃊 亅 ㇄ 乚 ㄣ ㇉ ㄑ 𠃋 ㇁ ㇂ ㇃。\n"
            "3. 禁止输出解释、Markdown、代码块。\n"
            "4. 无法拆分时输出 [\"原字\"]。"
        )
    else:
        system_prompt = (
            "你是一个专业的汉字拆解助手。"
            "任务：给定一个单个汉字，只输出它的主要偏旁部首或结构部件列表。"
            "要求：\n"
            "1. 仅输出 JSON 数组字符串，例如：[\"氵\",\"青\"]。\n"
            "2. 部件优先使用常见偏旁（如 氵刂艹），也可使用能表示结构的单字（如 清→氵青，别→另刂）。可参考：丿乛亻勹冂冖冫刂匚卩阝厶囗土艹屮巛巾彳彡扌攵斤方无日月木欠止歹殳比毛氏气氵灬爫父爻爿片牙牜犭玄王瓜瓦甘生用田疋疒癶白皮皿目矛矢石礻禸禾穴立竹米纟缶罒羊羽老而耒耳聿肉臣自至臼舌舛舟色虫血行衤襾见角讠等。\n"
            "3. 笔画符号仅可来自以下集合：丿 (撇) 乛 (横钩) 亻 (单人旁) 勹 (包字头) 冂 (同字框) 冖 (秃宝盖) 冫 (两点水) 刂 (立刀旁) 匚 (三框) 卩 (单耳旁) 阝 (双耳旁) 厶 (厶) 囗 (国字框) 土 (土) 艹 (草字头) 屮 (屮) 巛 (巛) 巾 (巾) 彳 (双人旁) 彡 (三撇) 扌 (提手旁) 攵 (反文) 斤 (斤) 方 (方) 无 (无) 日 (日) 曰 (曰) 月 (月) 木 (木) 欠 (欠) 止 (止) 歹 (歹) 殳 (殳) 比 (比) 毛 (毛) 氏 (氏) 气 (气) 氵 (三点水) 灬 (四点底) 爫 (爪字头) 父 (父) 爻 (爻) 爿 (爿) 片 (片) 牙 (牙) 牜 (牛字旁) 犭 (反犬旁) 玄 (玄) 王 (王字旁) 瓜 (瓜) 瓦 (瓦) 甘 (甘) 生 (生) 用 (用) 田 (田) 疋 (疋) 疒 (病字头) 癶 (登字头) 白 (白) 皮 (皮) 皿 (皿) 目 (目) 矛 (矛) 矢 (矢) 石 (石) 礻 (示字旁) 禸 (禸) 禾 (禾) 穴 (穴宝盖) 立 (立) 竹 (竹) 米 (米) 纟 (绞丝旁→繁：糹) 缶 (缶) 罒 (四字头) 羊 (羊) 羽 (羽) 老 (老) 而 (而) 耒 (耒) 耳 (耳) 聿 (聿) 肉 (肉) 臣 (臣) 自 (自) 至 (至) 臼 (臼) 舌 (舌) 舛 (舛) 舟 (舟) 色 (色) 虫 (虫) 血 (血) 行 (行) 衤 (衣字旁) 襾 (襾) 见 (见→繁：見) 角 (角) 讠 (言字旁→繁：訁)`\n"
            "4. 禁止输出解释、拼音、Markdown、代码块。\n"
            "5. 尽量 2～5 个部件；无法拆分时只输出原字数组，例如：[\"学\"]。\n"
        )

    def extract_text_from_response(obj: dict) -> str:
        output = obj.get("output")
        if isinstance(output, list) and output:
            texts: list[str] = []
            for item in output:
                content = item.get("content")
                if isinstance(content, list):
                    for c in content:
                        if not isinstance(c, dict):
                            continue
                        t = c.get("text") or c.get("output_text") or c.get("content")
                        if isinstance(t, str) and t.strip():
                            texts.append(t.strip())
            if texts:
                return "\n".join(texts).strip()

        choices = obj.get("choices")
        if isinstance(choices, list) and choices:
            msg = choices[0].get("message", {})
            c = msg.get("content")
            if isinstance(c, str):
                return c.strip()

        found: list[str] = []

        def walk(x):
            if isinstance(x, dict):
                for v in x.values():
                    walk(v)
            elif isinstance(x, list):
                for v in x:
                    walk(v)
            elif isinstance(x, str):
                s = x.strip()
                if s:
                    found.append(s)

        walk(obj)
        return "\n".join(found[:20]).strip()

    def extract_json_array(text: str) -> list[str] | None:
        m = re.search(r"\[[\s\S]*?\]", text)
        if not m:
            return None
        snippet = m.group(0)
        try:
            val = json.loads(snippet)
            if not isinstance(val, list):
                return None
            return [str(x) for x in val if str(x).strip()]
        except Exception:
            return None

    def call_once(prompt_text: str, temperature: float) -> list[str] | None:
        payload = {
            "model": model,
            "input": [
                {
                    "role": "user",
                    "content": [{"type": "input_text", "text": prompt_text}],
                }
            ],
            "temperature": temperature,
        }
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        }
        resp = requests.post(url, headers=headers, json=payload, timeout=20)
        resp.raise_for_status()
        content = extract_text_from_response(resp.json())
        return extract_json_array(content)

    try:
        parts = call_once(f"{system_prompt}\n请拆解：{ch}", temperature=0.2)
        if not parts:
            parts = call_once(
                f"只输出 JSON 数组字符串，不要任何其它字符。无法拆分则输出：[\"{ch}\"]。原字：{ch}",
                temperature=0.0,
            )
        parts = parts or [ch]
        parts = [p for p in parts if str(p).strip()]
        if not parts:
            parts = [ch]
        return jsonify({"ok": True, "parts": parts, "mode": mode})
    except requests.RequestException as e:
        return jsonify({"ok": False, "error": f"调用模型失败: {e}"}), 502
    except Exception as e:
        return jsonify({"ok": False, "error": f"服务器内部错误: {e}"}), 500


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)

