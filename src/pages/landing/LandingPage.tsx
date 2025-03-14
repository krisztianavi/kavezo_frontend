import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import ConcertCard from "../../components/card/ConcertCard";
import { getConcerts } from "../../services/concertService";
import { Container, Row, Col } from "react-bootstrap";
import { Concert } from "../../class/concert";
import { cancelConcert } from "../../services/concertService";

const LandingPage = () => {
    const [concerts, setConcerts] = useState<Concert[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchConcerts = async () => {
            try {
                const data = await getConcerts();
                setConcerts(data);
            } catch (error) {
                console.error("Hiba a koncertek betöltésekor:", error);
                setError("Nem sikerült betölteni a koncerteket.");
            }
        };

        fetchConcerts();
    }, []);

    const handleCancel = async (id: number) => {
        try {
            await cancelConcert(id);

            setConcerts((prevConcerts) =>
                prevConcerts.map((concert) =>
                    concert.id === id ? { ...concert, isCancelled: true } : concert
                )
            );

            alert("A koncert sikeresen le lett mondva!");
        } catch (error) {
            console.error("Hiba a koncert lemondásakor:", error);
            alert("Hiba történt a koncert lemondása során!");
        }
    };

    return (
        <>
            <Navbar />
            <Container>
                <h1 className="my-4 text-center">Koncertek</h1>
                {error && <p className="text-danger text-center">{error}</p>}

                <Row className="g-4 justify-content-center">
                    {concerts.map((concert) => (
                        <Col key={concert.id} xs={12} sm={6} md={4} lg={3} className="concert-col">
                            <ConcertCard concert={concert} onCancel={handleCancel} />
                        </Col>
                    ))}
                </Row>

            </Container>
        </>
    );
};

export default LandingPage;
