import ConcertForm from "../../components/form/ConcertForm";
import Navbar from "../../components/navbar/Navbar";

const NewConcert = () => {
  return (
    <div>
      <Navbar />
      <h1 className="my-4 text-center">Új koncert hozzáadása</h1>
      <ConcertForm />
    </div>
  );
};

export default NewConcert;
