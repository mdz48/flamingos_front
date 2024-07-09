import {data} from "../../../data/data.js";
import Salon from "../../molecules/Landing-Molecules/Salon.jsx";
export default function SalonesSection() {
  return (
      data.salones.map((salon, index) => (<Salon text={salon.text} title={salon.title} key={index}/>))
  )
}
