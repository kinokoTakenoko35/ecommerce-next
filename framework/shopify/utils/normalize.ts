import { ImageEdge, Product as ShopifyProduct } from "../schema";
import { Product } from "../../common/types/product";

// ImageEdge配列のedgesタイプの引数を受け取り、ImageEdgeの情報から、URLをnormalize化した値を返す
const normalizeProductImages = ({ edges }: { edges: Array<ImageEdge> }) =>
  edges.map(({ node: { originalSrc: url, ...rest } }) => ({
    url: `/images/${url}`,
    ...rest,
  }));

// GraphQLからProduct情報を取得して自身のEC用の情報としてノーマライズ化する関数を定義
export function normalizeProduct(productNode: ShopifyProduct): Product {
  const {
    id,
    title: name,
    handle,
    vendor,
    description,
    images: imageConnection,
    ...rest
  } = productNode;

  const product = {
    id,
    name,
    vendor,
    description,
    path: `/${handle}`,
    slug: handle.replace(/^\/+|\/+$/g, ""),
    images: normalizeProductImages(imageConnection),
    ...rest,
  };

  return product;
}
