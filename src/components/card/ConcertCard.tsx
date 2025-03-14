import { Card, Button } from "react-bootstrap";
import { Concert } from "../../class/concert";
import './ConcertCard.css';

interface Props {
    concert: Concert;
    onCancel: (id: number) => void;
}

const ConcertCard = ({ concert, onCancel }: Props) => {

    const handleInfoClick = async () => {

        const artistName = concert.artist.replace(" ", "+");
        const url = `https://ws.audioscrobbler.com/2.0/?method=artist.getInfo&artist=${artistName}&api_key=85111352d97ac62106a98474e4b82588&format=json`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.error) {
                alert("Sajnos még nincs elég információnk az előadóról.");
            } else {
                window.open(`https://www.last.fm/music/${concert.artist.replace(" ", "+")}`, "_blank");
            }
        } catch (error) {
            alert("Hiba történt az előadó információinak lekérésekor.");
        }
    };

    return (
        <Card className={`m-2 ${concert.isCancelled ? "border-danger" : ""}`} style={{ width: "16rem", maxWidth: "110%" }}>
            <Card.Body>
                <Card.Title>{concert.artist}</Card.Title>
                <Card.Text>
                    <strong>Időpont:</strong> {new Date(concert.stime).toLocaleString()} <br />
                    <strong>Időtartam:</strong> {concert.duration} perc
                </Card.Text>

                <Button
                    variant={concert.isCancelled ? "secondary" : "danger"}
                    onClick={() => onCancel(concert.id)}
                    disabled={concert.isCancelled}
                >
                    {concert.isCancelled ? "Lemondva" : "Lemondás"}
                </Button>

                <div className="mt-3">
                    <Button
                        variant="link"
                        onClick={handleInfoClick}
                        className="about"
                        style={{ padding: 0, textDecoration: 'none' }}
                    >
                        Ki is az előadó?
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ConcertCard;
