import React, { useEffect, useState } from "react";
import axios from "axios";
import { DivCardContainer, DivCard } from "./style";

function MyPage({ user, history }) {
    console.log(user.userData);
    const [MyData, setMyData] = useState({});

    useEffect(() => {
        axios.get("/api/users/user").then((response) => {
            if (response.data.success) {
                setMyData(response.data.user);
            } else {
                alert("상품을 가져오는데 실패했습니다.");
            }
        });
    }, [])

    return (
        <div>
            <DivCardContainer>
                <DivCard>
                    <h2 className="name">
                        {MyData.name}
                    </h2>
                    <div>
                        {MyData.email}
                    </div>
                    <div>
                        {MyData.address}
                    </div>
                </DivCard>
            </DivCardContainer>
        </div>
    );
}

export default MyPage;
