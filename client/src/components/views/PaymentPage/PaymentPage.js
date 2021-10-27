import React from "react";
import { DivCardContainer, DivCard } from "./style";

function PaymentPage(props) {
    const planList = ["1", "2"];
    const plan = props.match.params.plan;

    if (!planList.includes(plan)) {
        props.history.push("/");
    }

    console.log(props);

    return (
        <DivCardContainer>
            <DivCard>
                {plan}
            </DivCard>
        </DivCardContainer>
    );
}

export default PaymentPage;
