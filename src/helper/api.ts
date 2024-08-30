import axiosClient from "./axiosClient.js";

const apiProduct = {
    getProduct(skip: any, limit: any) {
        const url = `/products/?skip=${skip}&limit=${limit}`;
        return axiosClient.get(url);
    },
    getSingleProduct(id: any) {
        const url = `product/${id}`;
        return axiosClient.get(url);
    },
    getSearch(keyword: any) {
        const url = `/products/search?q=${keyword}`;
        return axiosClient.get(url);
    },
};
export default apiProduct;
