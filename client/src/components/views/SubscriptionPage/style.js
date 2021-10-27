import styled from "styled-components";

export const DivCardContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    margin: 3rem auto;
`;

export const DivCard = styled.div`
    width: 20%;
    height: 25rem;
    min-width: 20rem;
    margin: 1rem;
    padding: 0rem;
    border-radius: 0.5rem;
    box-shadow: 0.1rem 0.1rem 1rem 0rem rgb(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
`;

export const PlanWraper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const Title = styled.h1`
    font-weight: 900;
    font-size: 2rem;
    text-align: center;
    margin-top: 3rem;
`;

export const PlanTitle = styled.div`
    font-weight: 700;
    font-size: 1.3rem;
    color: rgb(0, 0, 0);
    padding-bottom: 0.5rem;
`;

export const PlanSubTitle = styled.div`
    font-weight: 400;
    font-size: 1rem;
    color: rgb(0, 0, 0, 0.5);
`;

export const PlanDesc = styled.div`
    font-weight: 400;
    font-size: 1rem;
    color: rgb(0, 0, 0);
    padding-bottom: 0.3rem;
`;

export const Link = styled.a`
    margin: 0rem;
    padding: 2.5rem;
    height: 100%;
`;

export const Price = styled.div`
    font-weight: 700;
    font-size: 1.5rem;
    color: rgb(0, 0, 0);
`;
