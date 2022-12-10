import Link from "next/link";
import styles from "../../styles/button.module.css";

function Button(props) {
  if (props.link) {
    return (
      <Link href={props.link} className={styles.btn}>
        {props.children}
      </Link>
    );
  } else {
    return (
      <button className={styles.btn} onClick={props.onClick}>
        {props.children}
      </button>
    );
  }
}

export default Button;
