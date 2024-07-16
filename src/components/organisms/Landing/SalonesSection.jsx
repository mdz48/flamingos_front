import {data} from "../../../data/data.js";
import Heading from "../../atoms/Heading.jsx";
import Salon from "../../molecules/Landing-Molecules/Salon.jsx";
export default function SalonesSection() {
  return (
    <>
    <Heading text = 'NUESTROS SALONES' className={'text-center font-bold text-4xl'}/>
    <section>
      {
        data.salones.map((salon, index) => (
        <Salon 
        services={salon.services} 
        title={salon.title} 
        image={salon.image} 
        contact = {salon.contact}
        ubication = {salon.ubication}
        key={index}/>))
      }
    </section>
    </>
  )
}
