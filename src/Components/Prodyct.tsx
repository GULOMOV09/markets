import { useDispatch } from "react-redux";
import { amountMinusProduct, amountPlusProduct, deleteFromKorzina } from "../features/productSlice";
import { useEffect } from "react";
interface ProductItem {
  id: number;
  title: string;
  brand: string;
  price: number;
  amount: number;
  rating: number;
  images: string[]; // Массив строк для изображений
}
interface ProdyctProps {
  item: ProductItem;
}

const Prodyct = ({ item }: ProdyctProps) => {
    const dispatch = useDispatch();

    const handlePlus = () => {
        dispatch(amountPlusProduct(item));
    };

    const handleMinus = () => {
        dispatch(amountMinusProduct(item));
    };

    useEffect(() => {
        if (item.amount == 0) {
            dispatch(deleteFromKorzina(item.id));
        }
    }, [item]);

    const delNote = (id:number) => {
        console.log(id, "id");
        dispatch(deleteFromKorzina(id));
    };

    return (
        <div>
            <div className="backcet">
                <div className="container">
                    <div className="backet_1">
                        <div className="backet_box">
                            <img className="backet_imgg" src={item.images[0]} alt="" />
                        </div>
                        <div className="backet_nmadr">
                            <div className="backet_title">{item.title}</div>
                            <span className="backet_spam">{item.brand}</span>

                            <span className="backet_span">{(item.price * item.amount)}$</span>
                            <span className="backet_rating">{item.rating}</span>

                            <div className="backet_backet">
                                <div className="backet_a">
                                    <span onClick={handleMinus}>-</span>
                                    <h2 className="backet_h2">{item.amount}</h2>
                                    <span onClick={handlePlus}>+</span>
                                </div>
                            </div>
                            <div className="backet_boxx">
                                <div className="backet_ocir" onClick={() => delNote(item.id)}>
                                    <h2 className="backet_ocirish">ochirish </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Prodyct;
