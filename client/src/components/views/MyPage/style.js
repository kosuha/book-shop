import styled from "styled-components";

export const DivCardContainer = styled.div`
    width: 75%;
    max-width: 50rem;
    margin: 3rem auto;

    @media (max-width: 767px) {
        width: 80%;
        margin: 1rem auto;
    }
`;

export const DivCard = styled.div`
    margin-bottom: 2.5rem;
    padding: 2.5rem;
    border-radius: 0.5rem;
    box-shadow: 0.1rem 0.1rem 1rem 0rem rgb(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;

    @media (max-width: 767px) {
        padding: 1rem;
        border-radius: 0.2rem;
        margin-bottom: 1rem;
    }
`;

export const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

export const EditButton = styled.button`
    border: none;
    background-color: rgba(0, 0, 0, 0);
`;

export const NameInput = styled.input`
    border: none;
    border-bottom: 1px solid black;
    background-color: rgba(0, 0, 0, 0);
    font-size: 1.5em;
    margin-bottom: 0.38em;
    margin-left: 0;
    margin-right: 0;
`;
