import Modal from "./Modal";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Footer() {
  // Toggle modal
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<JSX.Element>(<></>);

  const navigate = useNavigate();

  const handleModalInfo = (content: JSX.Element) => {
    setModalContent(content);
    setShowModal(true);
  }

  const sections = [
    {
      title: "Main",
      links: [
        {
          title: "How to Play",
          onClick: () => handleModalInfo(<p>How to Play</p>),
        },
        {
          title: "About the Market",
          onClick: () => handleModalInfo(<p>About the Market</p>),
        },
        {
          title: "How Games Work",
          onClick: () => handleModalInfo(<p>Our Partners</p>),
        },
      ],
    },
    {
      title: "About us",
      links: [
        {
          title: "Terms of Privacy",
          onClick: () => handleModalInfo(<p>Terms of Privacy</p>),
        },
        {
          title: "User Agreement",
          onClick: () => handleModalInfo(<p>User Agreement</p>),
        },
      ],
    },
    {
      title: "Games",
      links: [
        {
          title: "Crash",
          onClick: () => navigate("/crash"),
        },
        {
          title: "Coinflip",
          onClick: () => navigate("/coinflip"),
        },
        {
          title: "Slot",
          onClick: () => navigate("/slot"),
        },
      ],
    },
    {
      title: "Support",
      links: [
        {
          title: "Contact us",
          onClick: () => handleModalInfo(<p>Contact us</p>),
        },
        {
          title: "FAQ",
          onClick: () => handleModalInfo(<p>FAQ</p>),
        },
      ],
    }, {
      title: "Payment Forms",
      children: <div className="flex flex-col items-start gap-2">
        <img src="/images/PIX_Logo2.webp" alt="PIX" />
        <img src="/images/cards.webp" alt="cards">

        </img>
      </div>
    }
  ];

  return (
    <footer className="flex flex-col items-center justify-center w-full py-6 text-white bg-[#110F1D] ">
      <Modal open={showModal} setOpen={setShowModal}>
        {modalContent}
      </Modal>

      <div className="flex flex-col items-center justify-center gap-2 p-1">
        <Link to="/">
          <div className="flex items-center ">
            <img
              src="/images/logo.webp"
              alt="logo"
              className="w-36 h-24 object-contain"
            />

          </div>
        </Link>
        <span className="font-bold hidden md:visible">
          KANICASINO - Cases - Upgrade - Touhou
        </span>
      </div>

      <div className="flex flex-col w-10/12 mt-2">
        <div className="w-full h-[1px] bg-gray-500 opacity-10" />
        <div className="flex flex-col md:flex-row mt-4">
          {
            sections.map((section, index) => (
              <div key={index} className="flex flex-col w-full gap-2 my-2">
                <span className="font-bold text-xl">{section.title}</span>
                <div className="flex flex-col gap-1">
                  {
                    section.links && section.links.map((link, index) => (
                      <span
                        key={index}
                        onClick={link.onClick}
                        className="cursor-pointer hover:underline text-sm"
                      >
                        {link.title}
                      </span>
                    ))
                  }
                </div>
                {section.children}
              </div>
            ))
          }
        </div>
      </div>

      <div className="w-full mt-4 flex flex-col items-center justify-center gap-3">
        <div className="w-full h-[1px] bg-gray-500 opacity-10" />
        <span className="text-sm text-center">
          KaniCasino Comercio De Jogos E Skins Ltda - CNPJ: 40.981.116/0001-73 © All Rights Reserved. {new Date().getFullYear()}
        </span>
      </div>


    </footer>
  );
}

export default Footer;
