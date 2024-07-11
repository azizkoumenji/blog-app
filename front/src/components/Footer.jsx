import Logo from "../img/logo.png";

export default function Footer() {
  return (
    <footer>
      <img src={Logo} alt="Logo" />
      <span>
        Made with love using <b>React.js</b>.
      </span>
    </footer>
  );
}
