# はじめてママナビ — 開発進捗

最終更新：2026-06-16

## 現在の状態

**MVP完成・動作確認済み**

- Next.js 16.2.9 (App Router) + TypeScript + Tailwind CSS
- Node.js v24.16.0（nvm経由）
- 開発サーバー：`npm run dev` → http://localhost:3000

---

## 完成した画面（10画面）

| 画面 | URL | 状態 |
|---|---|---|
| オンボーディング | /onboarding | ✅ 完成 |
| ホーム | / | ✅ 完成 |
| 月齢別ナビ | /monthly/0〜12 | ✅ 完成（0〜12ヶ月全データ） |
| 出産前ナビ | /pregnancy | ✅ 完成（5フェーズ） |
| チェックリスト | /checklist | ✅ 完成（10カテゴリ・72項目） |
| 今日やること | /today | ✅ 完成（月齢・授乳方法で動的生成） |
| 記録 | /record | ✅ 完成（11種類） |
| 離乳食ナビ | /weaning | ✅ 完成（5段階・食材・メニュー） |
| 不安解消Q&A | /qa | ✅ 完成（13カテゴリ・検索付き） |
| ママのケア | /mama-care | ✅ 完成（10セクション） |

---

## 完成したファイル構成（42ファイル）

```
src/
├── app/           # 10画面のページコンポーネント
├── components/    # UI部品（Card, Button, Badge, Accordion, ProgressBar, BottomNav, PageHeader）
├── data/          # JSONコンテンツ（7ファイル）
├── hooks/         # useLocalStorage, useUserProfile, useRecords, useChecklist, useBabyAge
├── lib/           # dateUtils, taskEngine, messageSelector
└── types/         # TypeScript型定義
```

---

## 修正履歴

- **localStorage hydration race 修正**（2026-06-16）
  - `useLocalStorage` に `hydrated` フラグを追加
  - オンボーディングリダイレクトがlocalStorage読み込み前に発火する不具合を解消
  - 全画面で正しく遷移することを確認済み

---

## 起動方法

```bash
cd "/Users/kazuya/Desktop/アプリ開発１"
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh"
npm run dev
```

→ http://localhost:3000 をブラウザで開く

---

## 今後の追加候補

- [ ] Firebase / Supabase 接続（データの永続化・バックアップ）
- [ ] プッシュ通知（予防接種リマインダー等）
- [ ] 記録の統計グラフ（授乳間隔・体重推移）
- [ ] 夫・家族との共有機能
- [ ] 産後うつスクリーニング（EPDS）
- [ ] 自治体相談窓口リンク集
- [ ] オフライン対応（PWA化）
- [ ] 多言語対応（英語・中国語）
```
