// fetchApiコンポーネントファイルに移動

// 仮引数のType定義
type FetcherParams = {
  query: string;
};

// 任意のタイプを引数で受け取れる（再利用できる）ジェネリックタイプを宣言
type FetcherResult<T> = { data: T };

// 非同期宣言したGraphQLをフェッチする関数。仮引数にQueryをいれる
const fetchApi = async <T>({
  query,
}: FetcherParams): Promise<FetcherResult<T>> => {
  const url = "http://localhost:4000/graphql";

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // bodyはJSON形式で取得
    body: JSON.stringify({
      query,
    }),
  });

  // error処理を追加
  const { data, errors } = await res.json();

  // errors[0].messageの最初の式がnull or undefindだったらエラーをキャッチ
  // ?? is checking if left hand expression is null or undefind -> if it is go with right
  // || is checking if left hand expression is null, undefind, "", 0, false
  if (errors) {
    throw new Error(errors[0].message ?? errors.message);
  }
  return { data };
};
export default fetchApi;
