import getAllProductsQuery from "../utils/queries/get-all-product";

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

  const data = await res.json();
  return { data };
};

// fetchApiで取得したデータをProductのデータとして返す関数
const getAllProducts = async (): Promise<any[]> => {
  const products = await fetchApi({ query: getAllProductsQuery });
  return products.data;
};

export default getAllProducts;
