import React, { useEffect, useState } from "react";
import axios from "axios";
import { Icon, Col, Card, Row, Select } from "antd";
import Meta from "antd/lib/card/Meta";
import { DivCardContainer, DivCard } from "./style";

function SelectBooksPage(props) {
    const [monthlyBooks, setMonthlyBooks] = useState([]);
    const [SelectDisable, setSelectDisable] = useState(false);

    const user = props.user;
    const history = props.history;

    const selectChangeHandler = (value, props) => {
        if (!user.userData.isAuth) {
            alert("로그인이 필요합니다!")
            return history.push("/login")
        };
        if (user.userData.isAuth && !user.userData.subscription) {
            alert("구독 신청이 필요합니다!")
            return history.push("/subscription")
        };

        if (value.length >= 2) {
            setSelectDisable(false);
        } else {
            setSelectDisable(true);
        }

        {
            /* 변경된 선택을 DB에 저장 */
        }
    };

    const focusHandler = () => {
        setSelectDisable(true);
    };

    const blurHandler = () => {
        setSelectDisable(false);
    };

    const { Option } = Select;

    useEffect(() => {
        let body = {
            skip: 0,
            limit: 4,
        };

        axios.post("/api/product/monthlyBooks", body).then((response) => {
            if (response.data.success) {
                setMonthlyBooks(response.data.monthlyBooksInfo);
            } else {
                alert("상품을 가져오는데 실패했습니다.");
            }
        });
    }, []);

    const renderCards = monthlyBooks.map((book, index) => {
        return (
            <Col lg={6} md={8} sm={10} xs={12} key={index}>
                <a href={`/select-books/${book._id}`}>
                    <Card
                        cover={
                            <img
                                style={{ width: "100%" }}
                                src={`http://localhost:5000/${book.images[0]}`}
                            />
                        }
                        hoverable={true}
                    >
                        <Meta
                            title={book.title}
                            description={`${book.writer}`}
                        />
                    </Card>
                </a>
            </Col>
        );
    });

    const options = [];
    monthlyBooks.map((product, index) => {
        options.push(<Option key={index}>{product.title}</Option>);
    });

    return (
        <DivCardContainer>
            <DivCard>
                <h2 className="card-title">
                    내가 다음 달에 받을 책 <Icon type="book" />
                </h2>
                <div style={{ textAlign: "center" }}>
                    <Select
                        mode="tags"
                        size="large"
                        style={{ width: "100%" }}
                        placeholder="받고 싶은 책을 선택해주세요."
                        onChange={selectChangeHandler}
                        maxTagCount={2}
                        open={SelectDisable}
                        onFocus={focusHandler}
                        onBlur={blurHandler}
                    >
                        {options}
                    </Select>
                </div>
            </DivCard>
            <br />
            <br />
            <DivCard>
                <div style={{ textAlign: "left" }}>
                    <h2 className="card-title">
                        이달의 책들 <Icon type="book" />
                    </h2>
                </div>
                <Row
                    align="top"
                    gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 32]}
                >
                    {renderCards}
                </Row>
            </DivCard>
        </DivCardContainer>
    );
}

export default SelectBooksPage;
