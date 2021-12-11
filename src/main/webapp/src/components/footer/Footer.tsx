import React from 'react';
import '../../App.css';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';


function Footer() {
  return (
    <footer>
      <div className="appFooter">
        <h5>
          Sviluppato da Giovanni Nicoletti
        </h5>
        <div className="iconContainer">
          <a href="https://github.com/giovanni-nic-kuama" target="_blank" rel="noreferrer">
            <GitHubIcon className="icon"/>
          </a>
          <a href="https://www.linkedin.com/in/giovanni-nicoletti/" target="_blank" rel="noreferrer">
            <LinkedInIcon className="icon"/>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer;