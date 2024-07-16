import Heading from "../../atoms/Heading.jsx";
import Paragraph from "../../atoms/Paragraph.jsx";


export default function Salon(props) {
    return (
        <div className="container mx-auto flex flex-wrap justify-center items-center py-8">
            <div className="w-full sm:w-1/3 p-4">
                <img src={props.image} alt="" className="w-full h-auto object-cover"/>
            </div>
            <div className="w-full sm:w-2/3 p-4">
                <div>
                    <Heading text={props.title} className={"text-2xl font-bold text-center text-gray-800 mb-4"}/>
                </div>
                <div>
                    <Paragraph text={props.services}/>
                    <Paragraph text={props.ubication}/>
                    <Paragraph text={props.contact}/>
                </div>
            </div>
        </div>
    )
}