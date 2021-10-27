import React, { useEffect, useState } from "react";
import axios from "axios";
import { Icon, Col, Card, Row, Select } from "antd";
import Meta from "antd/lib/card/Meta";
import { DivCardContainer, DivCard } from "./style";

function SelectBooksPage(props) {
    const user = props.user;
    const history = props.history;

    const [MonthlyBooks, setMonthlyBooks] = useState([]);
    const [SelectedBookId, setSelectedBookId] = useState([]);
    const [SelectDisable, setSelectDisable] = useState(false);

    const selectChangeHandler = (value, props) => {
        if (!user.userData.isAuth) {
            alert("로그인이 필요합니다!");
            return history.push("/login");
        }
        if (user.userData.isAuth && !user.userData.isSubscribe) {
            alert("구독 신청이 필요합니다!");
            return history.push("/subscription");
        }

        if (value.length >= 2) {
            setSelectDisable(false);
        } else {
            setSelectDisable(true);
        }

        setSelectedBookId(value);

        const selected = value.map((bookId) => {
            for (let i = 0; i < MonthlyBooks.length; i++) {
                if (MonthlyBooks[i]._id === bookId) {
                    return MonthlyBooks[i]
                }
            }
        });

        /* 변경된 선택을 DB에 저장 */
        const body = {
            id: user.userData._id,
            email: user.userData.email,
            selected: selected,
        };

        axios.put("/api/users/book/selected", body).then((response) => {
            if (!response.data.success) {
                alert("상품 업로드 실패");
            }
        });
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

        axios.get("/api/product/monthlyBooks", body).then((response) => {
            if (response.data.success) {
                setMonthlyBooks(response.data.monthlyBooksInfo);
            } else {
                alert("상품을 가져오는데 실패했습니다.");
            }
        });
    }, []);

    useEffect(() => {
        axios.get("/api/users/book/selected").then((response) => {
            if (response.data.success) {
                const selectedBook = response.data.selected;
                const selectedBookId = selectedBook.map((book) => { return book._id });
                setSelectedBookId(selectedBookId);
            } else {
                alert("상품을 가져오는데 실패했습니다.");
            }
        });
    }, []);

    const renderCards = MonthlyBooks.map((book, index) => {
        return (
            <Col lg={6} md={8} sm={10} xs={12} key={index}>
                <a href={`/select-books/${book._id}`}>
                    <Card
                        cover={
                            <img
                                style={{ width: "100%" }}
                                src={`http://localhost:5000/${book.images[0]}`}
                                alt={`${book.title}`}
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
    MonthlyBooks.map((product, index) => {
        options.push(<Option key={product._id}>{product.title}</Option>);
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
                        value={SelectedBookId}
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
