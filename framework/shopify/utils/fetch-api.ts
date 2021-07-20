// fetchApiコンポーネントファイルに移動

// 仮引数のType定義
type FetchParams = {
  query: string;
};

// 非同期宣言したGraphQLをフェッチする関数。仮引数にQueryをいれる
const fetchApi = async ({ query }: FetchParams) => {
  const url = "https://localhost:400/graphql";

  const res = await fetch(url, {
    // リクエストメソッドPOSTに変更
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

  if (errors) {
    // errors[0].messageの最初の式がnull or undefindだったらエラーをキャッチ
    // ?? is checking if left hand expression is null or undefind -> if it is go with right
    // || is checking if left hand expression is null, undefind, "", 0, false
    throw new Error(errors[0].message ?? errors.message);
  }
  return { data };
};

export default fetchApi;
