import fetchApi from "../utils/fetch-api";
import getAllProductsQuery from "../utils/queries/get-all-product";
import { ProductConnection } from "../schema";

// products情報を取得するタイプを宣言
type ReturnType = {
  products: ProductConnection;
};

// fetchApiで取得したデータをProductのデータとして返す関数
const getAllProducts = async (): Promise<any> => {
  // data = ReturnType
  const { data } = await fetchApi<ReturnType>({ query: getAllProductsQuery });

  // normalize and return new data!
  return data.products;
};

export default getAllProducts;
