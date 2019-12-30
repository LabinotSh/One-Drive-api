import { HtmlElement, TextField, Button, Grid, Pagination, Select, Icon } from "cx/widgets";
import { LookupField } from 'cx/widgets';
import { LabelsLeftLayout, LabelsTopLayout, computable } from 'cx/ui';
import SearchController from "./Controller";


export default (
    <cx>
        <div controller={SearchController}>

            <div style={{ padding: "1.5rem" }}>
                 
                 <LookupField
                    label="User"
                    style={{ marginLeft: "1rem" }}
                    value-bind="$page.user"
                    text-bind="$page.user.text"
                    //records-bind="$page.selectedusers"
                    options-bind="$page.useroptions"
                    
                                         />

                <label style={{ float: "right" }}>
                    <TextField value-bind="$page.desc" label="Description" style={{ width: '380px' }} />
                </label>

            </div>

            <div style={{ marginBottom: "2rem" }} >
                <LookupField
                label="Modified"
                value-bind="$page.modified"
                text-bind="$page.modified.text"
                options-bind="$page.user0"
                placeholder="Last 7 Days"
                style={{width:"130px", marginLeft:"0.5rem"}}
                computable = {("$page.user.text" 
                
                )} 
                />

                {/* <label>Modified</label>
                <Select value-bind="$page.users" style={{ marginLeft: "1.2rem", width: "150px" }}>
                    <option value="7">Last 7 Days</option>
                    <option value="30">Last 30 Days</option>
                    <option value="180">Last 180 Days</option>
                    <option value="custom">Custom Date</option>
                </Select> */}

                <label style={{ float: "right", marginRight: "10rem" }}><Button mod="primary" style={{ width: "5rem" }} onClick="onClick">Search</Button></label>
            </div>

            <div style={{ float: "right", marginBottom: "1rem", marginRight: "7rem" }}>
                <Button mod="primary">Export as zip</Button>
                <Button mod="primary" onClick="onLastModified" style={{ marginLeft: "1.5rem" }} onClick="findAll">Modify</Button>
            </div>

            <div style={{ padding: "1rem" }}>
                <Grid
                    records-bind="$page.records"
                    mod="bordered"
                    pageSize="10"
                    style={{ width: "100%" }}
                    columns={[
                        { header: 'Icon',
                          sortable: true, 
                          field: "icon",
                          items: (
                            <cx>
                                <i class={computable("$record.icon",
                                    (text) => {
                                        let type = text.split(".");
                                        console.log(type)
                                        switch (type[1]) {
                                            case 'pdf':
                                                return "far fa-file-pdf";
                                            case 'docx':
                                                return "far fa-file-word";
                                            case 'pptx':
                                                return "far fa-file-powerpoint";
                                            case 'jpg':
                                                return "far fa-file-image";
                                            case 'img':
                                                return "far fa-file-word";
                                            case 'xlsx':
                                                return "far fa-file-excel";
                                            case 'img':
                                                return "far fa-file-image";
                                            case 'csv':
                                                return "far fa-file-csv";
                                            default:
                                                return "far fa-file-image";
                                        }
                                    })} />
                            </cx>
                        ) 
                        }, 
                        { header: 'Document', field: 'document', sortable: true, resizable: true },
                        { header: 'Folder', field: 'folder', sortable: true, resizable: true },
                        { header: 'User', field: 'user', sortable: true, resizable: true },
                        { header: 'Last Modified', field: 'lmodified', sortable: true, resizable: true }
                    ]}

                />
                {/* <div style={{ marginBottom:"0.5rem" }}> */}
                <Pagination page-bind="$page.page1" pageCount-bind="$page.pageCount" />

                <Select value-bind="$page.pageSize" style={{ float: "right" }}>
                    <option value="5">5</option>
                    <option value={10}>10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </Select>
            </div>

        </div>
    </cx>
);