# はじめてママナビ

新米ママ向け育児サポートアプリ。妊娠後期〜赤ちゃん12ヶ月まで、時期ごとに必要な情報をナビゲートします。

## セットアップ

### 1. Node.js のインストール（まだの場合）

```bash
# Homebrewを使う場合
brew install node

# または https://nodejs.org からダウンロード
```

### 2. 依存パッケージのインストール

```bash
cd "/Users/kazuya/Desktop/アプリ開発１"
npm install
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:3000 を開いてください。

### モバイル確認

Chromeデベロッパーツール → デバイスツールバー → 幅430px に設定するとスマホ表示になります。

## 画面一覧

| 画面 | URL |
|---|---|
| ホーム | / |
| 初期登録 | /onboarding |
| 月齢別ナビ | /monthly/0 〜 /monthly/12 |
| 出産前ナビ | /pregnancy |
| チェックリスト | /checklist |
| 今日やること | /today |
| 記録 | /record |
| 離乳食ナビ | /weaning |
| Q&A | /qa |
| ママのケア | /mama-care |

## データ

`src/data/` フォルダのJSONファイルでコンテンツを管理します。
ユーザーデータはブラウザのlocalStorageに保存されます（後からFirebase/Supabaseに移行可能）。

## 技術スタック

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- localStorage（データ保存）
