import React from "react";
import "./Footer.scss";

function Footer() {
  return (
    <div className="footer">
      <p>
        Copyright &copy; {new Date().getFullYear()}. Made by{" "}
        <a href="https://ioanzaharia.com" target="blank">
          Ioan Zaharia
        </a>
      </p>
    </div>
  );
}

export default Footer;
