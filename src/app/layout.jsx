import Image from 'next/image';
import Nav from './comoponents/Nav'
import Footer from './comoponents/Footer'
import "./style/global.scss"
export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
    <div className="header-container ">
        <Image src="/assets/logo/logowithoutBG.png" className="logoasd" alt="Logo" width={150} height={150} />
        </div>
        <Nav/>
        
        {children} 
         <Footer/>
      </body>
    </html>
  );
}
