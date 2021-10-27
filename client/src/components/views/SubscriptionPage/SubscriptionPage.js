import React from "react";
import {
    DivCardContainer,
    DivCard,
    Title,
    PlanDesc,
    PlanTitle,
    PlanSubTitle,
    Link,
    Price,
    PlanWraper
} from "./style";

function SubscriptionPage() {
    return (
        <div>
            <Title>구독하기</Title>
            <DivCardContainer>
                <DivCard>
                    <Link href={`/subscription/payment/1`}>
                        <PlanWraper>
                            <div>
                                <PlanTitle>가볍게</PlanTitle>
                                <PlanSubTitle>한 달에 한 권</PlanSubTitle>
                                <br />
                                <PlanDesc>
                                    4권 중 1권 선택 (미선택시 랜덤)
                                </PlanDesc>
                                <PlanDesc>무료 배송</PlanDesc>
                            </div>
                            <Price>월 15,000원</Price>
                        </PlanWraper>
                    </Link>
                </DivCard>
                <DivCard>
                    <Link href={`/subscription/payment/2`}>
                        <PlanWraper>
                            <div>
                                <PlanTitle>기본으로</PlanTitle>
                                <PlanSubTitle>한 달에 두 권</PlanSubTitle>
                                <br />
                                <PlanDesc>
                                    4권 중 2권 선택 (미선택시 랜덤)
                                </PlanDesc>
                                <PlanDesc>무료 배송</PlanDesc>
                            </div>
                            <Price>월 25,000원</Price>
                        </PlanWraper>
                    </Link>
                </DivCard>
            </DivCardContainer>
        </div>
    );
}

export default SubscriptionPage;
