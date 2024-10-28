import Image from 'next/image';
import Nav from './components/Nav'; // Corrigez le chemin ici
import Footer from '../app/components/Footer'; // Corrigez le chemin ici

import './style/global.scss';

export const metadata = {
  title: "ASD-Portefolio", // Mettez votre titre ici
  description: "Description de votre page", // Mettez votre description ici
  icons: {
    icon: "/assets/favicon.ico", // Mettez à jour le chemin de votre favicon
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
      
        <div className="header-container">
          <Image 
            src="/assets/logo/logowithoutBG.png" 
            className="logoasd" 
            alt="Logo" 
            width={150} 
            height={150} 
          />
        </div>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
