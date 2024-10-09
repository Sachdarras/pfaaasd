import Image from 'next/image';
import Nav from '../app/comoponents/Nav'; // Corrige le chemin ici
import Footer from '../app/comoponents/Footer'; // Corrige le chemin ici
import Head from 'next/head'; // Assurez-vous d'importer Head pour les métadonnées
import './style/global.scss';

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <Head>
        <link rel="icon" href="/favicon.icoS" />
        {/* Ajoutez d'autres liens ou métadonnées ici si nécessaire */}
      </Head>
      <body>
        <div className="header-container">
          <Image src="/assets/logo/logowithoutBG.png" className="logoasd" alt="Logo" width={150} height={150} />
        </div>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
