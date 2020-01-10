import { TextField, TextArea, Button } from "cx/widgets";
import { LabelsLeftLayout } from "cx/ui";
import DefaultController from "./Controller";


export default (
    <cx>
        <div controller={DefaultController}>
        <div style={{ padding: "1.5rem" }}>
   
            <div style={{marginLeft:"20rem", marginBottom:".7rem"}}>
            <Button mod="primary" onClick="onClick">Sign in to One Drive</Button>
            </div>
            {/* <div style={{ marginBottom: "1rem" }}>
                <TextField value-bind="$page.login" label="Login" style={{ marginLeft: "4.2rem", width: "35%" }} />
            </div>
            <div style={{ marginBottom: "2rem" }}>
                <TextField value-bind="$page.password" label="Password" style={{ marginLeft: "2.6rem", width: "35%" }} />
            </div> */}
             
            <div layout={LabelsLeftLayout}>
                <TextArea label="Manage User:" value-bind="$page.manage" rows={6} style={{ marginLeft: "0.4rem", width: "360.5%" }} 
                disabled-bind="$page.disabled" />
            </div>


            <div style={{ marginLeft: "40rem", marginTop: "1.5rem" }} visible-bind="$page.visible">
                <Button mod="primary" onClick="onSignin">Save</Button>
            </div>
            


        </div>
        </div>

    </cx>
);