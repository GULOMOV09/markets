import { useSelector } from "react-redux";
import { selectedAllKorzinka } from "../features/productSlice";
import Prodyct from "./Prodyct";

const Basket = () => {
    const basket = useSelector(selectedAllKorzinka);

    console.log(basket.length, "basket");

    if (basket.length < 1) {
        return (
            <div className="notFound">
                <img src="notFound.png" alt="" />
                NOt FoUnD
            </div>
        );
    }
    return (
        <div>
            {basket?.map((item: any, index: any) => (
                <Prodyct key={index} item={item} />
            ))}
        </div>
    );
};

export default Basket;
