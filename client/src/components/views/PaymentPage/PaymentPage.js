import React from 'react'

function PaymentPage(props) {
    const planList = ["1", "2"];
    const plan = props.match.params.plan;
    
    if (!planList.includes(plan)) {
        props.history.push("/");
    } 

    console.log(props);

    return (
        <div>
            {plan}
        </div>
    )
}

export default PaymentPage
