# Split or Stay 上线指南

全程免费，大约需要 40 分钟。按顺序做即可，每一步都只需要点网页、复制粘贴。

## 文件说明

| 文件 | 用途 |
|---|---|
| `index.html` `app.js` `styles.css` | 用户看到的应用 |
| `config.js` | **唯一需要你修改的文件**（密钥、联系邮箱、冷启动数字） |
| `admin.html` `admin.js` | 管理后台，只有你能登录 |
| `privacy.html` `terms.html` | 日英双语隐私政策和服务条款 |
| `supabase/schema.sql` | 数据库结构、权限、防刷票规则 |
| `supabase/seed.sql` | 6 条初始问题（美国 2、日本 2、全球 2） |
| `og.png` `icon-*.png` `manifest.webmanifest` | 分享预览图、App 图标、添加到主屏幕 |

---

## 第 1 步：建数据库（Supabase，约 15 分钟）

1. 打开 https://supabase.com ，用 GitHub 账号注册登录。
2. 点 **New project**：
   - Name：`split-or-stay`
   - Database Password：点生成，存到你的密码管理器
   - **Region：选 Northeast Asia (Tokyo)**（隐私政策里写的是东京，必须一致）
3. 等项目创建完成（1–2 分钟），左侧点 **SQL Editor** → **New query**：
   - 打开 `supabase/schema.sql`，全部复制粘贴进去，点 **Run**，看到 `Success` 即可
   - 再新建一个 query，粘贴 `supabase/seed.sql`，点 **Run**
4. 左侧 **Authentication** → **Sign In / Providers**，打开 **Allow anonymous sign-ins**，保存。
5. 左侧 **Project Settings** → **API Keys**（或页面顶部 **Connect**）：
   - 复制 **Project URL**（形如 `https://xxxx.supabase.co`）
   - 复制 **anon public** 密钥（新版界面叫 **Publishable key**）
   - ⚠️ 不要复制 `service_role` / `secret` 密钥，那个绝对不能放进网页

## 第 2 步：填配置（2 分钟）

打开 `config.js`，修改：

```js
supabaseUrl: "https://xxxx.supabase.co",   // 第 1 步复制的 URL
supabaseAnonKey: "eyJ...或 sb_publishable_...", // 第 1 步复制的 anon/publishable 密钥
contactEmail: "你的联系邮箱",
```

联系邮箱会公开显示在首页和条款里，用来接收删除请求。建议新建一个专用邮箱，比如 `splitorstay.app@gmail.com`，不要用个人邮箱。

## 第 3 步：上传到 GitHub（5 分钟）

1. https://github.com/new 新建仓库，名字 `split-or-stay`，选 **Public** 或 **Private** 都可以。
2. 在仓库页面点 **uploading an existing file**，把整个文件夹里的所有文件（包括 `supabase` 文件夹）拖进去，点 **Commit changes**。

（会用命令行的话也可以 `git init && git add . && git commit -m init && git push`。）

## 第 4 步：部署（Vercel，5 分钟）

1. 打开 https://vercel.com ，用 GitHub 登录。
2. **Add New → Project** → 选 `split-or-stay` 仓库 → **Import**。
3. Framework Preset 选 **Other**，其他都不用改 → **Deploy**。
4. 完成后会得到网址，比如 `split-or-stay-abc.vercel.app`。想要更短的名字：**Settings → Domains** 里改成 `splitorstay.vercel.app`（如果没被占用）。

之后你在 GitHub 上改任何文件，Vercel 都会自动重新上线。

## 第 5 步：把网址填回去（3 分钟）

1. **Supabase → Authentication → URL Configuration**：
   - Site URL：`https://你的网址.vercel.app`
   - Redirect URLs 添加：`https://你的网址.vercel.app/admin.html`
2. **GitHub 上编辑 `index.html`**，把两处 `YOUR-SITE.vercel.app` 换成你的网址（这是分享到 X / LINE 时的预览图地址）。

## 第 6 步：开通管理后台（3 分钟）

1. 手机或电脑打开 `https://你的网址.vercel.app/admin.html`
2. 输入你的邮箱 → 收邮件 → 点链接回到后台
3. 页面会显示一行 SQL，形如 `insert into public.admins (user_id) values ('...');`
4. 复制它，到 Supabase **SQL Editor** 运行，然后刷新后台页面

后台能看到：活跃用户、新用户、提问人数、投票人数、近 14 天趋势、美日劝分对比、被举报的内容。被 3 个不同用户举报的问题会自动隐藏，等你决定恢复还是删除。

> 后台地址不会出现在应用里，也已设置为不被搜索引擎收录。没有加进 `admins` 表的人即使登录也看不到任何数据。

## 第 7 步：自己测一遍（5 分钟）

用两台设备（或手机 + 电脑无痕窗口）：
- [ ] A 发一个问题，公开范围选日本
- [ ] B 把地区切到日本，能刷到这个问题，投票并留言
- [ ] A 在「Mine」里能看到票数、美日对比和评论
- [ ] 输入含「死にたい」的问题 → 不会发布，显示求助热线
- [ ] iPhone Safari 打开 → 分享 → **添加到主屏幕**，图标正常

---

## 上线前确认清单

- [ ] `config.js` 里的联系邮箱是你会看的
- [ ] Supabase 项目区域是 **Tokyo**
- [ ] 隐私政策和条款读过一遍；正式推广或开始收费前，建议请熟悉 IT 的律师看一下
- [ ] 公司副业规定确认过
- [ ] 想去掉冷启动数字时：`config.js` 里 `coldStartBase` 三个数改成 0

## 推美国之前（可选，推荐）

匿名账号理论上可以被脚本批量创建来刷票。用户量起来之前影响不大，推美国或上 Product Hunt 之前建议开启人机验证：

1. https://dash.cloudflare.com → **Turnstile** → Add site，填你的网址，得到 Site Key 和 Secret Key
2. Supabase → **Authentication → Attack Protection** → 开启 CAPTCHA，选 Turnstile，填 Secret Key
3. `config.js` 的 `turnstileSiteKey` 填 Site Key

## 需要知道的限制

- Supabase 免费版：项目 7 天没有任何访问会自动暂停，在后台点一下即可恢复；有用户在用就不会暂停。
- 免费额度（数据库 500MB、每月 5 万活跃用户）对早期完全够用。
- 用户清除浏览器数据后，会变成新的匿名用户，看不到以前的提问。
