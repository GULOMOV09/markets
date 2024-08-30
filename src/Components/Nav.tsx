import { fetchProductsData } from "../features/productSlice";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/hooks";

const Nav = () => {
    const dispatch = useAppDispatch();
    const [select, setSelect] = useState({
        count: 12,
        title: "Normal",
    });

    const handleChangeSelect = (event: any, option: any) => {
        const value = event.target.value;

        if (option == "count") {
            setSelect({
                ...select,
                count: value,
            });
        } else if (option == "title") {
            setSelect({
                ...select,
                title: value,
            });
        }
    };

    useEffect(() => {
        handleChange(select);
    }, [select]);

    const handleChange = (event: any) => {
        const { count, title } = event;

        if (title === "all") {
            dispatch(fetchProductsData({ limit: count, skip: 0, type: title }));
        } else if (title == "harflar") {
            dispatch(fetchProductsData({ limit: count, skip: 0, type: title }));
        } else if (title == "narxi") {
            dispatch(fetchProductsData({ limit: count, skip: 0, type: title }));
        } else {
            dispatch(fetchProductsData({ limit: count, skip: 0, type: title }));
        }
    };

    return (
        <div className="nav">
            <div className="container">
                <div className="nav_box">
                    <div className="nav_right">
                        <div className="nav_right_1">
                            <h2 className="nav_right_title">Categories:</h2>
                            <div className="nav_right_select">
                                <div className="nav_right_select">
                                    <select onChange={(event) => handleChangeSelect(event, "count")}>
                                        <option value="12">12</option>

                                        <option value="100">100</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="nav_right_2">
                            <h2 className="nav_left_title">price and cost:</h2>
                            <div className="nav_left_select">
                                <select onChange={(event) => handleChangeSelect(event, "title")}>
                                    <option value="narxi">narxi</option>

                                    <option value="harflar">harfalri</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Nav;
