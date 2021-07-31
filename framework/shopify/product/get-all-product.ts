import fetchApi from "../utils/fetch-api";
import getAllProductQuery from "../utils/queries/get-all-product";
import { normalizeProduct } from "../utils/normalize";
import { ProductConnection } from "../schema";
import { Product } from "@common/types/product";

// products情報を取得するタイプを宣言
type ReturnType = {
  products: ProductConnection;
};

// fetchApiで取得したデータをProductのデータとして返す関数
const getAllProducts = async (): Promise<Product[]> => {
  const { data } = await fetchApi<ReturnType>({ query: getAllProductQuery });

  const products =
    data.products.edges.map(({ node: product }) => normalizeProduct(product)) ??
    [];
  return products;
};
export default getAllProducts;
