import Input from "../atoms/Input";
import Label from "../atoms/Label";

function FieldForm(props) {
    return (
        <div style={{width:"80%"}}>
            <div>
                <Label text={props.text}/>
            </div>
            <div>
                <Input type={props.type} placeholder={props.placeholder} value={props.value} onChange={props.onChange}/>
            </div>
        </div>
      );
}

export default FieldForm;