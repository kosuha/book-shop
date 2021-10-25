import React, { useEffect, useState } from "react";
import axios from "axios";
import { Descriptions as Desc } from "antd";
import {
    DivCardContainer,
    DivCard,
    DivImageContainer,
    Img,
    DivTableContainer,
    DivDescriptionContainer,
} from "./style";

function BookDetailPage(props) {
    const [Book, setBook] = useState({});
    const [Size, setSize] = useState([0, 0]);
    const [Published, setPublished] = useState("");
    const bookId = props.match.params.bookId;

    useEffect(() => {
        axios
            .get(`/api/product/books_by_id?id=${bookId}&type=single`)
            .then((response) => {
                if (response.data.success) {
                    console.log(response.data.book[0]);
                    setBook(response.data.book[0]);
                    setSize(response.data.book[0].size);
                    setPublished(response.data.book[0].published.slice(0, 10));
                } else {
                    alert("상세정보 로딩 실패");
                }
            });
    }, []);

    return (
        <DivCardContainer>
            <DivCard>
                <DivImageContainer>
                    <Img src={`http://localhost:5000/${Book.images}`} />
                </DivImageContainer>
                <DivTableContainer>
                    <Desc title={Book.title} bordered size={"small"} column={1}>
                        <Desc.Item label="저자">{Book.writer}</Desc.Item>
                        <Desc.Item label="출판사">{Book.publisher}</Desc.Item>
                        <Desc.Item label="출간일">{Published}</Desc.Item>
                        <Desc.Item label="분류">{Book.category}</Desc.Item>
                        <Desc.Item label="제본">{Book.binding}</Desc.Item>
                        <Desc.Item label="쪽수">{`${Book.pages} 쪽`}</Desc.Item>
                        <Desc.Item label="크기">{`${Size[0]} * ${Size[1]} (mm)`}</Desc.Item>
                        <Desc.Item label="ISBN">{Book.Isbn}</Desc.Item>
                    </Desc>
                    <DivDescriptionContainer>
                        <p>{Book.description}</p>
                    </DivDescriptionContainer>
                </DivTableContainer>
            </DivCard>
        </DivCardContainer>
    );
}

export default BookDetailPage;
