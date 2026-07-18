import { Link, useParams } from "react-router-dom";
import "../styles/InfoPage.scss";

const content = {
  about: {
    title: "O aplikaciji RevAI",
    paragraphs: [
      "RevAI je web aplikacija za personaliziranu preporuku automobila izrađena u sklopu diplomskog rada.",
      "Aplikacija kombinira korisničke preferencije i karakteristike automobila kako bi ponudila relevantnije preporuke i jednostavniju pretragu.",
    ],
  },
  terms: {
    title: "Uvjeti korištenja",
    paragraphs: [
      "RevAI je demonstracijska akademska aplikacija. Informacije o automobilima i preporuke služe informativnoj svrsi.",
      "Prije kupnje vozila potrebno je samostalno provjeriti cijenu, tehničke podatke i stanje automobila.",
    ],
  },
  privacy: {
    title: "Politika privatnosti",
    paragraphs: [
      "Podaci za prijavu i korisničke preferencije koriste se isključivo za rad aplikacije i izračun preporuka.",
      "Automobili spremljeni u garažu u ovoj verziji čuvaju se lokalno u korisničkom pregledniku.",
    ],
  },
};

const InfoPage = ({ page }) => {
  const params = useParams();
  const selected = content[page || params.page] || content.about;

  return (
    <main className="info-page">
      <section>
        <h1>{selected.title}</h1>
        {selected.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <Link to="/home">Povratak na početnu</Link>
      </section>
    </main>
  );
};

export default InfoPage;
