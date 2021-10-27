import React, { useEffect, useState } from "react";
import axios from "axios";
import { DivCardContainer, DivCard, EditButton, TitleContainer } from "./style";

function MyPage({ user, history }) {
    const [MyData, setMyData] = useState({});
    const [PaidHistory, setPaidHistory] = useState([]);
    const [SelectedBookHistory, setSelectedBookHistory] = useState([]);

    useEffect(() => {
        axios.get("/api/users/user").then((response) => {
            if (response.data.success) {
                const data = response.data.user;
                setMyData(data);
                setPaidHistory(data.paidHistory);
                setSelectedBookHistory(data.selectedBookHistory);
                console.log(data);
            } else {
                alert("상품을 가져오는데 실패했습니다.");
            }
        });
    }, []);

    const subscriptionInfo = () => {
        if (MyData.subscription) {
            return (
                <DivCard>
                    <TitleContainer>
                        <h2 className="title">구독정보</h2>
                        <EditButton
                            onClick={() => {
                                console.log("o");
                            }}
                        >
                            구독정보 수정
                        </EditButton>
                    </TitleContainer>
                    <div>{MyData.subscriptionName}</div>
                    <div>{MyData.phone}</div>
                    <div>{MyData.address}</div>
                </DivCard>
            );
        }
    };

    const subscriptionHistory = () => {
        if (PaidHistory.length === 0) {
            return <div>구독내역이 없습니다.</div>;
        } else {
            return <div>{PaidHistory}</div>;
        }
    };

    const selectedBookHistory = () => {
        if (SelectedBookHistory.length === 0) {
            return <div>받은 책이 없습니다.</div>;
        } else {
            return <div>{SelectedBookHistory}</div>;
        }
    };

    return (
        <div>
            <DivCardContainer>
                <DivCard>
                    <TitleContainer>
                        <h2 className="title">{MyData.name}</h2>
                        <EditButton
                            onClick={() => {
                                console.log("o");
                            }}
                        >
                            개인정보 수정
                        </EditButton>
                    </TitleContainer>
                    <div>{MyData.email}</div>
                </DivCard>
                {subscriptionInfo()}
                <DivCard>
                    <h2 className="title">구독내역</h2>
                    {subscriptionHistory()}
                </DivCard>
                <DivCard>
                    <h2 className="title">받은 책 목록</h2>
                    {selectedBookHistory()}
                </DivCard>
            </DivCardContainer>
        </div>
    );
}

export default MyPage;
