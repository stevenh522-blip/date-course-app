# デートコースビルダー — データ設計図

> ⚠️ **この文書が唯一の最新版である**（最終更新: 2026-07-16 — スケッチ30枚 FINAL 確定を反映）。
> 過去バージョンは Git 履歴を参照。変更点は別セクションに積まず、**本文を直接修正する。**
> 製品定義書（画面・機能）と対になるドキュメント。ここでは **「データをどのような形で保存するか」** を整理する。

---

## 全体像（ひと目で）

```
AppData (アプリに保存されるすべて)
├ courses: Course[]              保存されたコース
│    └ Course
│        ├ items: CourseItem[]     タイムラインに配置されたもの (順序 = 配列の順序)
│        ├ waiting: CourseItem[]   🧺 未配置の待機 (未配置のまま保存可能)
│        └ hotel: Place | null     ホテル (タイムライン外の別スロット)
├ drafts: Draft[]                下書き (作りかけ — 複数可、ホームのみ表示)
├ favorites: Place[]             お気に入り (★)
├ myRegions: string[]            自分の地域リスト (画面1.5 のカード = このリスト)
├ coupleDate: string             付き合った日 (マイ情報の D+ 計算)
├ anniversaries: Anniversary[]   記念日
├ todos: Todo[]                  やること
└ girlfriendInfos: { text: string }[]   彼女の情報
```

**重要な概念2つ:**
1. **型 = たい焼きの型**（形の定義）。型そのものには実データがない。
2. **配列([]) = 型で作ったものを入れる箱。** 同じ型(Place)で作っても、入れる箱(favorites / items)が違えば混ざらない。

---

## 型定義（最新確定版）

```typescript
type Place = {
  id: string;           // Google place_id または直接追加用の生成 id
  name: string;         // "国立科学博物館"
  category: string;     // "博物館" | "ラーメン" | "ホテル" ...
  region: string;       // "上野"
  rating: number | null;    // ⭐4.5 (直接追加なら null)
  priceLevel: string | null; // "¥¥"
  photo: string | null;      // 代表写真の URL
  website: string | null;    // 公式サイト (詳細 [🌐] — なければボタン非表示、予約リンク)
  url: string;               // Google マップのページ (詳細 [🗺️])
  memo: string;              // 自分のメモ (詳細で閲覧・編集)
  isManual: boolean;         // 直接追加かどうか
};

type CourseItem = {
  place: Place;
  memo: string;         // "恐竜館は必ず見る · 13時ごろ" — 時間を書きたければここに
};                      // ★個別の時間(startTime/endTime)なし — 順序がそのままコース順

type Course = {
  id: string;
  title: string;        // 保存ポップアップで自由入力 (空欄スタート)
  date: string;         // "2026-07-11" — 予定/訪問済みの自動分類基準 (今日と比較)
  startTime: string;    // コース全体の枠 "12:00" (画面1、デフォルト 12:00)
  endTime: string;      // "23:00" (デフォルト 23:00)
  region: string;       // "上野" — コースタブのカードに 📍表示
  items: CourseItem[];  // 配置されたもの (配列の順序 = コース順)
  waiting: CourseItem[];// 🧺 待機 (組み立て・編集の未配置エリア)
  hotel: Place | null;  // タイムライン外の別スロット
};

type Draft = {
  course: Course;       // 作りかけの状態そのまま
  lastScreen: string;   // 離れた画面 — 点線カードをタップするとここから再開
};

type Anniversary = {
  id: string;
  title: string;        // "彼女の誕生日"
  date: string;         // "2026-07-20" — D- は保存せず date から計算
  repeat: boolean;      // true = 過ぎたら来年の D- へ / false = 過ぎたら自動削除
};

type Todo = {
  id: string;
  text: string;         // "誕生日プレゼントを予約する"
  done: boolean;        // ☐/☑ トグル、完了 = ピンク☑ + 取り消し線
};

type AppData = {
  courses: Course[];
  drafts: Draft[];
  favorites: Place[];
  myRegions: string[];
  coupleDate: string;
  anniversaries: Anniversary[];
  todos: Todo[];
  girlfriendInfos: { text: string }[];
};
```

---

## データフロー（画面 ↔ データ）

- **ホームのマイノート**: anniversaries・todos・girlfriendInfos を map で表示。[+]ポップアップ=追加、タップ→✏️=編集(同じポップアップに値を入れる)、🗑️=確認後に削除、☐タップ=done トグル
- **ホームの予定コース**: courses のうち date ≥ 今日 + drafts(点線カード、最上部)
- **画面1**: Course の date・startTime・endTime を入力 (カレンダー=月移動の共通コンポーネント)
- **画面1.5**: myRegions をカードで表示 / 検索は1回限り(リストに積まれない)
- **画面2・3**: 検索結果(Place[])をカードで表示。[+]追加 → waiting に CourseItem として / ☆ → favorites トグル
- **画面4**: waiting(待機)と items(タイムライン)を描画。ドラッグ = waiting→items 移動・順序変更。カードタップ(編集)=memo 修正
- **画面5**: hotel に Place を1つ (選択方式 — 置き換え)
- **保存**: title 入力 → courses に追加、drafts から削除
- **コースタブ**: courses を date で予定/訪問済みに分類。カードに title・date・items数・📍region
- **お気に入りタブ**: favorites を [場所][グルメ][ホテル] でフィルタ(category で) / [+コースに追加]→予定+下書きリスト→そのコースの waiting へ
- **マイ情報**: coupleDate で D+ 計算 / myRegions の CRUD / 全体リセット(確認2回)
- **共有**: Course → テキスト + Google マップの経由地リンク生成

---

## よく混乱すること（メモ用）

- **お気に入り = 待合室**: Place だけが集まる。コースに入るとき CourseItem(place+memo)で包まれる。
- **D-day は保存しない**: dday のようなフィールドはない。常に date と今日を比較して計算 (保存すると昨日の D-16 が今日も 16 のまま残るバグ)。
- **予定/訪問済みも保存しない**: date ≥ 今日なら予定。フィールドではなく計算。
- **count も保存しない**: 場所の数 = items.length。(現在のダミーデータの count: 4 は items ができる前の仮の値 — 承知の上の負債)
- **ダミーデータのルール**: 必ずこの文書の型と同じ形にする。画面に表示しないフィールド(例: ホームカードの region)もデータには存在させる。
