import folder from "../../assets/Folder.svg";

import styles from "./link.module.scss";

type TLinkProps = {
  href: string;
  text: string;
};

export const Link = ({ href, text, }: TLinkProps) => {
  return (
    <a
      href={href}
      className={styles.link}
      target="_blank"
    >
      <img src={folder} alt="folder icon" className={styles.icon} />
      <span className={styles.text}>{text}</span>
    </a>
  );
};
