import { addToKorzinka, fetchProductsData, selectedAllCount, selectedAllProducts, selectedError, selectedLoading } from "../features/productSlice";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

interface Product {
    id: string;
    title: string;
    brand: string;
    price: number;
    images: string[];
}

const Berteg = () => {
    const dispatch = useAppDispatch();
    const [fahriddin, setFahriddin] = useState<number>(0);
    const product = useAppSelector((state: any) => selectedAllProducts(state)) as Product[];
    const loading = useAppSelector((state: any) => selectedLoading(state)) as boolean;
    const error = useAppSelector((state: any) => selectedError(state)) as any | null;
    const count = useAppSelector((state: any) => selectedAllCount(state)) as number;
    const totalSets = Math.ceil(count / 22);

    // const filternotes = item.filter(item => {
    //   return item.title.includees(Value)
    // })

    const buttons = Array.from({ length: totalSets }, (_, index) => (
        <div className="di8" key={index}>
            <button onClick={() => setFahriddin(index * 22)} className="pagination-button">
                {`Set ${index + 1}`}
            </button>
        </div>
    ));

    useEffect(() => {
        dispatch(fetchProductsData({ limit: 12, skip: fahriddin, type: "normal" }));
    }, [fahriddin, dispatch]);

    const handleKorzinka = (item: Product) => {
        dispatch(addToKorzinka(item));
    };
    if (loading) {
        return <div>Kuting</div>;
    }
    if (error) {
        return <div>404</div>;
    }

    return (
        <div className="b">
            {product?.map((item, index) => (
                <div key={index}>
                    <div className="b_bb">
                        <div className="b_div">
                            <img className="b_imgg" src={item.images[0]} alt="" />
                        </div>

                        <div className="b_nm">
                            <div className="b_title">{item.title}</div>

                            <span className="b_spam">{item.brand}</span>
                            <span className="b_spam">{item.price}$</span>
                            <div className="b_btn_box">
                                <div className="b_kkk">
                                    <button className="b_a" onClick={() => handleKorzinka(item)}>
                                        <a>sotib olish</a>
                                    </button>
                                </div>
                                <div className="b_ssss">
                                    <a href={item.id} className="span">
                                        korish
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {product?.length !== 100 && (
                <>
                    <div className="pagination">{buttons}</div>
                </>
            )}
        </div>
    );
};

export default Berteg;
