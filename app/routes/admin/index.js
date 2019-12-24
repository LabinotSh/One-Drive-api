import { TextField, TextArea, Button } from "cx/widgets";
import { LabelsLeftLayout } from "cx/ui";


export default (
    <cx>
        <div style={{ padding: "1.5rem" }}>
            <div style={{ marginBottom: "1rem" }}>
                <TextField value-bind="$page.login" label="Login" style={{ marginLeft: "4.2rem", width: "35%" }} />
            </div>
            <div style={{ marginBottom: "2rem" }}>
                <TextField value-bind="$page.password" label="Password" style={{ marginLeft: "2.6rem", width: "35%" }} />
            </div>

            <div layout={LabelsLeftLayout}>
                <TextArea label="Manage User:" value-bind="$page.manage" rows={6} style={{ marginLeft: "0.4rem", width: "360.5%" }} />
            </div>


            <div style={{ marginLeft: "40rem", marginTop: "1.5rem" }}>
                <Button mod="primary">Save</Button>
                <i class="far fa-file-word"></i>
            </div>


        </div>

    </cx>
);