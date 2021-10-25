import React, { useState } from "react";
import { Select, Button, Form, Input, DatePicker } from "antd";
import FileUpload from "../../utils/FileUpload";
import Axios from "axios";

const { TextArea } = Input;
const { Option } = Select;

const categories = [
    { key: 1, value: "시" },
    { key: 2, value: "소설" },
    { key: 3, value: "에세이" },
    { key: 4, value: "인문/사회/과학" },
    { key: 5, value: "예술" },
    { key: 6, value: "매거진" },
    { key: 7, value: "기타" },
];

const bindings = [
    { key: 1, value: "무선제본" },
    { key: 2, value: "떡제본" },
    { key: 3, value: "PUR제본" },
    { key: 4, value: "바인더제본" },
    { key: 5, value: "양장제본" },
    { key: 6, value: "스프링제본" },
    { key: 7, value: "사철제본" },
    { key: 8, value: "중철제본" },
    { key: 9, value: "기타" },
];

function UploadProductPage(props) {
    const [Title, setTitle] = useState("");
    const [Writer, setWriter] = useState("");
    const [Publisher, setPublisher] = useState("");
    const [Published, setPublished] = useState("");
    const [Category, setCategory] = useState("");
    const [Binding, setBinding] = useState("");
    const [Pages, setPages] = useState(0);
    const [SizeX, setSizeX] = useState(0);
    const [SizeY, setSizeY] = useState(0);
    const [Description, setDescription] = useState("");
    const [Images, setImages] = useState([]);
    const [Isbn, setIsbn] = useState("")

    const titleChangeHandler = (event) => setTitle(event.currentTarget.value);
    const writerChangeHandler = (event) => setWriter(event.currentTarget.value);
    const publisherChangeHandler = (event) => setPublisher(event.currentTarget.value);
    const dateChangeHandler = (value) => setPublished(value);
    const categoryChangeHandler = (value) => setCategory(value);
    const bindingChangeHandler = (value) => setBinding(value);
    const pagesChangeHandler = (event) => setPages(event.currentTarget.value);
    const sizeXChangeHandler = (event) => setSizeX(event.currentTarget.value);
    const sizeYChangeHandler = (event) => setSizeY(event.currentTarget.value);
    const descriptionChangeHandler = (event) => setDescription(event.currentTarget.value);
    const isbnChangeHandler = (event) => setIsbn(event.currentTarget.value);

    const updateImages = (newImages) => setImages(newImages);

    const submitHandler = (event) => {
        if (!Title || !Description || !Writer || Images.length === 0) {
            return alert("제목, 작가, 설명, 이미지는 반드시 입력해야 합니다.");
        }

        // 서버에 채운 값들을 request로 보낸다.

        const body = {
            title: Title,
            writer: Writer,
            publisher: Publisher,
            published: Published,
            category: Category,
            binding: Binding,
            pages: Pages,
            size: [SizeX, SizeY],
            description: Description,
            images: Images,
            isbn: Isbn
        };

        Axios.post("/api/product", body).then((response) => {
            if (response.data.success) {
                alert("상품 업로드 성공");
                props.history.push("/");
            } else {
                alert("상품 업로드 실패");
            }
        });
    };

    return (
        <div
            style={{ maxWidth: "700px", margin: "2rem auto", padding: "1rem" }}
        >
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <h2>상품 업로드</h2>
            </div>
            <Form onSubmit={submitHandler}>
                <FileUpload refreshFunction={updateImages} />

                <br />
                <br />
                <label>제목</label><br />
                <Input onChange={titleChangeHandler} value={Title} />
                <br />
                <br />
                <label>저자</label><br />
                <Input onChange={writerChangeHandler} value={Writer} />
                <br />
                <br />
                <label>출판사</label><br />
                <Input onChange={publisherChangeHandler} value={Publisher} />
                <br />
                <br />
                <label>출간일</label><br />
                <DatePicker onChange={dateChangeHandler} />
                <br />
                <br />
                <label>분야</label><br />
                <Select onChange={categoryChangeHandler} value={Category}>
                    {categories.map(item => (
                        <Option key={item.key} value={item.value}>{item.value}</Option>
                    ))}
                </Select>
                <br />
                <br />
                <label>제본</label><br />
                <Select onChange={bindingChangeHandler} value={Binding}>
                    {bindings.map(item => (
                        <Option key={item.key} value={item.value}>{item.value}</Option>
                    ))}
                </Select>
                <br />
                <br />
                <label>쪽수</label><br />
                <Input type="number" onChange={pagesChangeHandler} value={Pages} />
                <br />
                <br />
                <label>크기</label><br />
                <label>가로 :</label>
                <Input
                    type={"number"}
                    onChange={sizeXChangeHandler}
                    value={SizeX}
                    style={{
                        width: "30%",
                        marginRight: "1rem"
                    }}
                />
                <label>세로 :</label>
                <Input
                    type={"number"}
                    onChange={sizeYChangeHandler}
                    value={SizeY}
                    style={{
                        width: "30%"
                    }}
                />
                <br />
                <br />
                <label>설명</label>
                <TextArea
                    onChange={descriptionChangeHandler}
                    value={Description}
                />
                <br />
                <br />

                <label>ISBN</label>
                <Input onChange={isbnChangeHandler} value={Isbn} />
                <br />
                <br />

                <br />
                <br />

                <Button onClick={submitHandler}>확인</Button>
            </Form>
        </div>
    );
}

export default UploadProductPage;
