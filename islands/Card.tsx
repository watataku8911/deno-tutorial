/** @jsx h */
import { h } from "preact";
// import "../styles/Card.css";

type Props = {
  link: string;
  imagePath: string;
  title: string;
};

export default function Counter(props: Props) {
  return (
    <div>
      <a href={props.link} target="_blank" className={"href"}>
        <div className={"card"}>
          <div className={"image_box"}>
            <img src={props.imagePath} alt={props.title} />
          </div>
          <div>
            <h3 className={"title"}>{props.title}</h3>
          </div>
        </div>
      </a>
    </div>
  );
}
