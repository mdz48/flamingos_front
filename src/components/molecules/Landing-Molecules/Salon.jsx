import Heading from "../../atoms/Heading.jsx";
import Paragraph from "../../atoms/Paragraph.jsx";


export default function Salon({text, title}) {
    return (
        <div className="container mx-auto flex flex-wrap justify-center items-center py-8">
            <div className="w-full sm:w-1/3 p-4">
                <img src="alberca.jpg" alt="" className="w-full h-auto object-cover"/>
            </div>
            <div className="w-full sm:w-2/3 p-4">
                <div>
                    <Heading text={title} className={"text-2xl font-bold text-center text-gray-800 mb-4"}/>
                </div>
                <div>
                    <Paragraph text={text}/>
                </div>
            </div>
        </div>
    )
}