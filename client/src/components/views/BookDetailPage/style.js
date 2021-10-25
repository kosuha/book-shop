import styled from "styled-components";

export const DivCardContainer = styled.div`
    width: 75%;
    margin: 3rem auto;

    @media (max-width: 900px) {
        width: 85%;
        margin: 2rem auto;
    }

    @media (max-width: 800px) {
        width: 90%;
        margin: 1rem auto;
    }
`;

export const DivCard = styled.div`
    padding: 2.5rem;
    border-radius: 0.5rem;
    box-shadow: 0.1rem 0.1rem 1rem 0rem rgb(0, 0, 0, 0.1);
    display: flex;
    flex-direction: row;

    @media (max-width: 800px) {
        padding: 1rem;
        border-radius: 0.2rem;
        flex-direction: column;
    }
`;

export const DivImageContainer = styled.div`
    margin: 1rem;

    @media (max-width: 800px) {
        margin: auto;
        width: 90%;
    }
`;

export const Img = styled.img`
    width: 20rem;

    @media (max-width: 800px) {
        width: 100%;
    }
`;

export const DivTableContainer = styled.div`
    width: 100%;
    margin: 1rem;

    @media (max-width: 800px) {
        margin: auto;
        margin-top: 3rem;
    }
`;

export const DivDescriptionContainer = styled.div`
    margin: 1rem;
    margin-top: 2rem;
`;
