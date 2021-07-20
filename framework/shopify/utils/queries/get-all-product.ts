// GrapfQLサーバーからプロダクトの情報を取得
const productConnection = `
pageInfo {
    hasNextPage
    hasPreviousPage
}
edges {
    node {
    id
    title
    vendor
    handle
    description
    priceRange {
        minVariantPrice {
        amount
        currencyCode
        }
    }
    images(first: 1) {
        pageInfo {
        hasNextPage
        hasPreviousPage
        }
        edges {
        node {
            originalSrc
            altText
            width
            height
        }
        }
    }
    }
}
`;

const getAllProductsQuery = `
    query getAllProducts($first: int = 250){
        products(first: $first){
            ${productConnection}
        }
    }
`;

export default getAllProductsQuery;
