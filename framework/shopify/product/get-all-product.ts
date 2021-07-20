import fetchApi from "../utils/fetch-api";
import getAllProductsQuery from "../utils/queries/get-all-product";

// fetchApiで取得したデータをProductのデータとして返す関数
const getAllProducts = async (): Promise<any[]> => {
  const products = await fetchApi({ query: getAllProductsQuery });
  return products.data;
};

export default getAllProducts;
