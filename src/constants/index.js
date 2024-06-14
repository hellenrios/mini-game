import github from "../assets/github.svg";
import linkedin from "../assets/linkedin.svg";
import mail from "../assets/mail.svg";

export const gameTexts = {
  title: "TypeRush",
  levelSelect: "Selecione o Nível",
  easy: "Fácil",
  intermediate: "Intermediário",
  hard: "Difícil",
  explanationTitle: "Como Jogar",
  explanationText:
    "O objetivo do jogo é seguir a sequência de caracteres exibida na tela o mais rápido possível. Selecione um nível para começar:",
  explanationLevels: [
    {
      label: "Fácil",
      description: "Você tem 30 segundos para digitar a sequência.",
    },
    {
      label: "Intermediário",
      description: "Você tem 15 segundos para digitar a sequência.",
    },
    {
      label: "Difícil",
      description: "Você tem 10 segundos para digitar a sequência.",
    },
  ],
  explanationClosing:
    "Pressione as teclas na ordem correta. Se errar, o jogo termina e sua pontuação será exibida. Boa sorte!",
};

export const socialMedia = [
  {
    id: "social-media-1",
    icon: linkedin,
    link: "https://www.linkedin.com/in/hellenrios/",
  },
  {
    id: "social-media-2",
    icon: github,
    link: "https://github.com/hellenrios",
  },
  {
    id: "social-media-3",
    icon: mail,
    link: "https://www.twitter.com/",
  },
];
