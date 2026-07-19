# TiMo Design System — Implementation Spec

このドキュメントは、TiMoブランドファミリー(dig-vault / fillma / Panora)共通のデザインシステムをClaude Codeに実装させるための設計書です。そのままプロンプトとしてClaude Codeに渡してください。

---

## 0. ブランドコンセプト(背景・なぜこの色/形なのか)

TiMoは「藍染めデニム(生地)× 真鍮の金具(hardware)」を核とした配色コンセプト。ヴィンテージ古着を掘る行為(dig-vault)と、道具を作る行為(fillma/Panora)の両方に通底する、着る人自身のルーツに基づいた色選び。

- **生地(indigo)**: 画面の大部分を占めるベース。落ち着き・土台
- **金具(gold)**: 押せる/機能を持つ場所だけに使う点的アクセント。面としては使わない

ロゴは手描きの王冠(crown)+筆記体の"TiMo"サイン。単色(黒/白)のみで存在し、ブランドカラーを背負わない。

---

## 1. カラートークン

### ニュートラル(テーマ依存)
```
--color-bg            light: #FFFFFF   dark: #14161C
--color-surface        light: #F4F3EF   dark: #20263A
--color-border         light: #E4E2DA   dark: #2A2B2E
--color-text-primary   light: #2A2A26   dark: #EDEDEF
--color-text-secondary light: #8A8A82   dark: #8C9BC0
```

### ブランドトークン(テーマ非依存の固定値)
```
--indigo-raw     #2C3A66   生地・primary surface(カード、ヘッダー、ロゴのインク色として使用可)
--indigo-faded   #8C9BC0   生地の副色(サブテキスト、境界線、控えめな強調)
--gold-base      #F0C33D   金具・primaryアクション(通常のボタン)
--gold-deep      #B98E0E   金具・pressed/hover/active状態
--gold-light     #F8E09B   金具・ハイライト(バッジ背景、選択状態の縁取り)
```

### 意味付け(コンポーネントが参照する役割名)
```
--color-accent-primary        = gold-base
--color-accent-primary-active = gold-deep
--color-accent-subtle         = gold-light
--color-brand-surface         = indigo-raw
--color-brand-surface-muted   = indigo-faded
```

**ルール**: gold系は「面」として広く使わない。ボタン・アイコン・バッジなど"機能を持つ点"のみに使用する。indigo系は逆に「面」として自由に使ってよい。

---

## 2. タイポグラフィ

- **筆記体(cursive/script)**: ロゴの"TiMo"サインと、保存完了などの"署名"的な一瞬の演出にのみ使用。ボタンラベル・本文・ナビゲーションには絶対に使わない。
- **UIフォント**: クセのないニュートラルなサンセリフ(system-ui / -apple-system スタック、日本語は角ゴシック系)を本文・見出し・ボタン・ラベル全般に使用。
- **モノスペース(任意)**: アイテムコードや保存時刻など"データ"的な表示に使ってもよい(必須ではない)。
- **スケール例**: 11 / 12 / 14 / 16 / 20 / 28px

---

## 3. 形状・余白

- **ボタン**: 完全な丸み(pill形状、border-radius: 9999px相当)。横paddingは広め(20–26px)にしてタップ領域を確保する。
- **カード/コンテナ**: 10–12px角丸
- **バッジ**: 16–20px角丸(pill寄り)
- **余白の基本単位**: 4px刻み(4/8/12/16/20/24/32...)

---

## 4. ロゴ使用ルール

- 王冠アイコン + 筆記体"TiMo"は常にセットで使用(公式ロックアップとしては分離しない)
- 色は黒 or 白の単色のみ。ブランドカラー(indigo/gold)で塗らない。グラデーションや影も付けない
- 王冠アイコンのみを取り出して、判定・承認マークなどの小さな再利用アイコンとして使ってよい。その場合もcurrentColor(周囲のインク色)を使い、gold/indigoで着色しない

---

## 5. モーション・抑制

- 装飾的なモーションは1フロー内で1箇所に絞る(例: 保存完了時のみ軽い演出を入れる)
- グロー・ネオン的な光彩効果、フラットな面へのグラデーションは使わない
- `prefers-reduced-motion` を尊重する

---

## 6. ダークモード

- すべてのコンポーネントは上記の意味付けトークン経由で色を参照し、ハードコードされたHEX値を直接使わない
- ダークモードでは `indigo-raw` は背景ではなく「surface(カードなど)」の役割にまわり、ベース背景は `#14161C` を使う

---

## 7. アプリ別テーマの考え方

- dig-vault(TiMo本体) / fillma / Panora は、上記の役割名(トークン名)を共通スキーマとして共有する
- 各アプリは機能上必要な場合に限り、副次的なアクセントを1つだけ追加してよい(例: dig-vaultの判定ラベルGRAB/BUY/HOLD/PASS/TRYに意味色を割り当てるなど)。ただし indigo × gold の組み合わせが常に画面の主役であること

---

## Claude Codeへ渡すプロンプト例

```
TiMoブランドファミリー共通のデザイントークンとベースコンポーネントを実装してください。

1. CSS変数(または該当フレームワークのテーマ設定ファイル)として、以下のトークンをlight/dark両テーマ分定義する:
   - color-bg, color-surface, color-border, color-text-primary, color-text-secondary
   - indigo-raw(#2C3A66), indigo-faded(#8C9BC0)
   - gold-base(#F0C33D), gold-deep(#B98E0E), gold-light(#F8E09B)
   - 意味付けトークン: color-accent-primary, color-accent-primary-active, color-accent-subtle,
     color-brand-surface, color-brand-surface-muted

2. 以下のベースコンポーネントを、上記トークンのみを参照する形で実装する(ハードコードされた色を使わない):
   - Button(pill形状、通常/hover/pressed状態でgold-base→gold-deepに切り替わる)
   - Badge(gold-lightを背景に使った控えめな強調表示)
   - Card(indigo-rawまたはcolor-surfaceを背景に使う、角丸10-12px)

3. フォントは本文・ボタン・ラベルにはニュートラルなサンセリフのみを使用し、
   筆記体フォントはロゴ表示コンポーネントと「保存完了」等の一瞬の演出用コンポーネントにのみ許可する
   (通常のUIテキストに筆記体を使わせない、という制約をコンポーネント設計に反映する)。

4. 角丸・余白は4px刻みのスケールに統一し、ボタンのpaddingは横20-26pxを確保する。

5. light/darkの切り替えは data-theme 属性またはCSSのmedia queryで実装し、
   すべてのコンポーネントがテーマ変更時に自動で追従するようにする。
```
