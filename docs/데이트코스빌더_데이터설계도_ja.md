# デートコースビルダー — データ設計図

> 製品定義書（画面・機能）と対になるドキュメント。ここでは **「データをどのような形で保存するか」** を整理する。
> 22画面すべてがこのデータ構造の上で動作する。

---

## 全体像（ひと目で）

```
AppData (アプリに保存されるすべて)
├ courses: Course[]              自分のコース一覧
│    └ Course
│        ├ items: CourseItem[]   配置された枠（タイムラインのブロック）
│        │    └ CourseItem { place: Place, memo }  ※個別の時刻は持たない(順序で表現)
│        └ hotel: Place | null   ホテル (任意、タイムラインの外)
├ favorites: Place[]             お気に入りの場所（保存した場所）
├ anniversaries: Anniversary[]   記念日一覧
├ todos: Todo[]                  やること一覧
└ girlfriendInfo: GirlfriendInfo[]  彼女に関する情報一覧
```

**押さえるべき核となる考え方は2つだけ:**
1. **型 = たい焼きの型（鋳型）**。形を定義するもので、型そのものには実データを持たない。
2. **配列([]) = 型で作ったものを入れる箱。** 同じ型(Place)で作っても、入れる箱(favorites / items)が違えば混ざらない。

---

## 型定義（6つの鋳型）

### Place — 場所ひとつ
すべての場所の基本単位。観光スポット・グルメ・カフェ・ホテル、いずれも Place である。
```typescript
type Place = {
  name: string;        // 名称 - "国立科学博物館"
  rating: number;      // 評価 - 4.5
  hours: string;       // 営業時間 - "~17時"
  priceLevel: number;  // 価格帯 - 1~4段階 (Google方式、正確な円額ではない)
  category: string;    // カテゴリ - "観光スポット"
  placeId: string;     // Googleの固有ID - これでGoogleマップのリンク・写真・詳細を再取得
  memo: string;        // ユーザーメモ - "恐竜館を必ず見る"
  photoUrl: string;    // 代表写真のURL
  lat: number;         // 緯度 (地図ピン・距離計算用)
  lng: number;         // 経度
  isManual: boolean;   // 手動で追加した場所か？ (Googleに無いポップアップ・お祭りなど)
};
```
- **大半は Google が提供する**: name・rating・hours・priceLevel・placeId・photoUrl・lat・lng は、すべて Google Places がまとめて返してくれる。こちらで用意するものはほとんどない。
- **ユーザーが作るもの**: memo、および手動追加した場所の名称・位置。
- **placeId に関する注意**: ラベル(placeId)を決めるのはこちら側だが、その値("ChIJ...")は Google が付与した固有IDである。図書館の請求記号のようなもので、このIDを使って対象の場所を再び特定する。
- **isManual**: 手動追加した場所は Google のデータを持たない（rating・placeId などが空の場合がある）ため、区別するための目印が必要になる。

### CourseItem — コース内のひと枠（タイムラインのブロック）
場所を「いつ行くか」とセットで包んだもの。画面4に並ぶ色付きブロックのひとつ。
```typescript
type CourseItem = {
  place: Place;        // どの場所か (Placeを丸ごと保持)
  memo: string;        // "恐竜館を必ず見る · 13時ごろ" — 時刻も書きたい場合はここに
};
```
- **★確定変更（画面4の大幅改修）:** 個別の時刻(startTime/endTime)を **廃止。** 順序は items 配列の並び順がそのままコースの順序となる。時刻を書きたい場合は memo に記載する（"13時ごろ"）。移動カードも設けない。
- **placed の区別:** 組み立て・編集モードの「🧺 待機（未配置）」と「タイムライン（配置済み）」を分けるため、Course に `waiting: CourseItem[]` を別途持たせる（未配置のまま保存できる）。
- **例え**: Place=俳優、CourseItem=役柄。同じ俳優が複数のドラマで異なる役柄を演じるイメージ。

### Course — コースひとつ
```typescript
type Course = {
  title: string;          // 名称 - "上野デート" (保存時に付ける)
  date: string;           // 日付 - "2026-07-11"
  startTime: string;      // デート全体の開始 - "12:00"
  endTime: string;        // 全体の終了 - "23:00"
  items: CourseItem[];    // 配置された枠
  hotel: Place | null;    // ホテル (あれば Place、なければ null)
};
```
- **2種類の時刻の区別:**
  - `Course.startTime/endTime` = **デート全体の枠**（12～23時）。画面1で設定する。フィルタやタイムライン軸の範囲として使う。
  - `CourseItem.startTime` = **その枠内での各場所の位置**（13時…）。会議に例えると「全体9～18時」に対する「各セッションの時間」。
- **hotel は items の外に別枠(`Place | null`):** ホテルはタイムライン外の空き枠に置く方針（画面設計）。そのためデータ上も items（タイムライン内）と hotel（外）を分離する。`| null` = 有る場合も無い場合もある（任意）を表す。
- **「予定/訪問済み」は保存しない:** date を今日と比較して判定する。未来=予定、過去=訪問済み。状態を保存すると毎日更新が必要になるため、date のみを保持する。

### Anniversary — 記念日
```typescript
type Anniversary = {
  title: string;    // "彼女の誕生日"
  date: string;     // "2026-07-20"
  repeat: boolean;  // 毎年繰り返す？ (誕生日=true、100日記念=false、ユーザーが選択)
};
```

### Todo — やること
```typescript
type Todo = {
  text: string;     // "誕生日プレゼントを予約する"
  done: boolean;    // チェック済みか (完了かどうか)
};
```

### GirlfriendInfo — 彼女に関する情報
```typescript
type GirlfriendInfo = {
  text: string;     // "甲殻類アレルギー"
};
```
- 画面2・3で参考情報として表示する（自動フィルタではなく、ユーザーが確認するためのもの）。

---

## アプリ全体のデータ（入れる箱）

```typescript
type AppData = {
  courses: Course[];                  // 自分のコース一覧
  favorites: Place[];                 // お気に入りの場所一覧 (保存した場所)
  anniversaries: Anniversary[];       // 記念日一覧
  todos: Todo[];                      // やること一覧
  girlfriendInfo: GirlfriendInfo[];   // 彼女に関する情報一覧
};
```

- **すべて独立している**: favorites は courses の外に別途存在する。コースをすべて削除しても、favorites・anniversaries は残る。それぞれが独立したリストである。
- **お気に入り = 「コースに入れる前の待合室」**: 場所(Place)だけが集まっている状態で、コースに入れる際に CourseItem(place+memo)として包まれる。
- **この AppData を丸ごと localStorage に保存する。**（MVP段階。保存処理は saveData/loadData として抽象化しておき、後でバックエンドに移行する際は関数の中身だけを差し替える）

---

## データフロー（画面 ↔ データ）

- **画面1 (時間)** → Course の date・startTime・endTime を設定する
- **画面2・3 (場所・グルメ)** → Google Places から Place を取得 → 追加すればコースの items へ、保存すれば favorites へ
- **手動追加** → 名称・位置を入力した Place を生成する (isManual: true)
- **画面4 (タイムライン)** → items を順番にブロックとして描画する（時間軸は背景の目盛り）。ドラッグ = 順序変更。カードをタップ（編集モード）→ memo を編集
- **画面5 (ホテル)** → 選んだホテルを Course.hotel に入れる
- **保存** → 完成した Course を AppData.courses に追加 → localStorage へ
- **お気に入り → コース**: favorites の Place を取り出し、CourseItem として包んで **waiting（待機領域）** に追加する（お気に入りタブ →「どのコースへ？」ポップアップ / 画面2・3 → 追加シート、双方向）

---

## バージョン2で追加予定（現時点では枠だけ用意）

- **Place に複数の写真** (訪問済みコースの思い出) → バックエンド/ストレージが必要
- **Course に共有情報** (誰と共有するか、公開の可否) → バックエンド
- 現在の構造を壊さず、フィールドを追加するだけで対応できる（だからこそ、今しっかり固めておくことが重要）


---

## ★ V1 確定反映（スケッチ30枚 FINAL 時点 — 仕様書と同期）

```typescript
type CourseItem = { place: Place; memo: string };   // 個別の時刻なし

type Course = {
  id: string;
  title: string;          // 保存ポップアップで自由入力 (空欄スタート)
  date: string;           // "2026-07-11" — 予定/訪問済みの自動分類基準
  startTime: string;      // 全体の枠 "12:00" (デフォルト値、画面1)
  endTime: string;        // "23:00"
  region: string;         // "上野" — コースタブのカードに表示
  items: CourseItem[];    // 配置済み (順序 = 配列の並び順)
  waiting: CourseItem[];  // 🧺 未配置の待機 (未配置のまま保存可能)
  hotel: Place | null;    // タイムライン外の別スロット
};

type Draft = {            // 下書き (複数許可)
  course: Course;         // 作りかけの状態そのまま
  lastScreen: string;     // 離脱した画面 — 再開ポイント
};

type Anniversary = { id: string; title: string; date: string; repeat: boolean };
// repeat true = 過ぎたら翌年のD-へ / false = 過ぎたら自動削除。dday は保存しない(date から計算)

type AppData = {
  courses: Course[];
  drafts: Draft[];        // ★追加
  favorites: Place[];
  myRegions: string[];    // ★追加 — 自分の地域を管理 (画面1.5のカード一覧)
  coupleDate: string;     // ★追加 — 交際開始日 (マイ情報のD+計算)
  anniversaries: Anniversary[];
  todos: Todo[];
  girlfriendInfos: { text: string }[];
};

// Place の追加フィールド: website?(公式サイト — 詳細 [🌐]、無ければボタン非表示), url(Googleマップ), isManual?(手動追加)
```
