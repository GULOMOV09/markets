import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

export interface dataProduct {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: Dimensions;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: Review[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: Meta;
    images: string[];
    thumbnail: string;
    message?: string;
}

export interface Dimensions {
    width: number;
    height: number;
    depth: number;
}

export interface Review {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
}

export interface Meta {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
}

const Productid = () => {
    const { pathname } = useLocation();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [data, setData] = useState<dataProduct>();

    const fetchFunction = async () => {
        setLoading(true);
        try {
            const response = await fetch(import.meta.env.VITE_API_BASE_URL + pathname);
            const data = await response.json();
            setLoading(false);
            setData(data);

            console.log(data, "data");
            return data;
        } catch (err) {
            setError(true);
            console.log(err);
        }
    };

    useEffect(() => {
        fetchFunction();
    }, [pathname]);

    if (loading) {
        return <div>Kuting.....</div>;
    }
    if (error) {
        return <div>Hato!!!</div>;
    }

    if (data?.message) {
        return (
            <div className="notFound">
                {data?.message}
                <img src="notFound.png" alt="" />
            </div>
        );
    }

    if (data?.id) {
        return (
            <div className="container">
                <div className="p">
                    <div className="p_icon">
                        <div className="p_span">
                            <NavLink to={"/"}>
                                <IoArrowBack className="p_ddd" />
                            </NavLink>
                        </div>
                    </div>
                    <div className="p_img">
                        <img className="p_img1" src={data.images[0]} alt="" />
                    </div>
                    <div className="p_box">
                        <div className="p_title">{data.title}</div>
                        <div className="p_brand">{data.brand}</div>
                        <div className="p_category">{data.category}</div>
                        <div className="p_price">{data.price}$</div>
                        {/* <div className="p_price">{data.rating}</div> */}
                    </div>
                </div>
            </div>
        );
    }
};

export default Productid;
