import '../styles/Footer.css';
import { socialMedia } from "../constants"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__text">Feito por Hellen Rios para Cidade Alta. copyright © 2024 - All Rights Reserved.</p>
        <div className="footer__socials">
        {socialMedia.map((social) => (
            <a key={social.id} href={social.link} className={`footer__socials-icon footer__socials-icon--${social.id}`} aria-label={social.id}>
              <img src={social.icon} alt={social.id} />
            </a>
          ))}
        </div>
      </div>   
    </footer>
  );
};

export default Footer;
