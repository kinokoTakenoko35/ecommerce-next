import fetchApi from "../utils/fetch-api";
import getAllProductsQuery from "../utils/queries/get-all-product";
import { normalizeProduct } from "../utils/normalize";
import { ProductConnection } from "../schema";
import { Product } from "../../common/types/product";

// products情報を取得するタイプを宣言
type ReturnType = {
  products: ProductConnection;
};

// fetchApiで取得したデータをProductのデータとして返す関数
const getAllProducts = async (): Promise<Product[]> => {
  // data = ReturnType
  const { data } = await fetchApi<ReturnType>({ query: getAllProductsQuery });

  // products nodeを参照するproducts変数を宣言
  // null or undefindの場合はから配列を返す
  const products: any =
    data.products.edges.map(({ node: product }) => {
      normalizeProduct(product);
    }) ?? [];

  return products;
};

export default getAllProducts;
