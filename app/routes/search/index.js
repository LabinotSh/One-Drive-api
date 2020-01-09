import { HtmlElement, TextField, Button, Grid, Pagination, Select, Icon, DateField, Calendar, Window ,Text} from "cx/widgets";
import { LookupField } from 'cx/widgets';
import { LabelsLeftLayout, LabelsTopLayout, computable ,KeySelection} from 'cx/ui';
import SearchController from "./Controller";
import {Glyph} from 'app/components/Glyph';


export default (
    <cx>
        <div controller={SearchController}>

            <div style={{ padding: "1.5rem" }}>
                 <LookupField
                    label="User"
                    style={{ marginLeft: "1rem" }}
                    //value-bind="$page.user"
                    //text-bind="$page.user.text"
                    records-bind="$page.selectedusers"
                    options-bind="$page.useroptions"
                    multiple
                    />
                    <Glyph visible-expr="{$page.loading}" name="refresh"/>

                <label style={{ float: "right" }}>
                    <TextField value-bind="$page.desc" label="Description" style={{ width: '380px' }} />
                </label>

            </div>

            <Window
                title={{ bind: '$page.windowTitle' }}
                visible={{ bind: "$page.visible.window", defaultValue: false }}
                center
                style={{ width: "500px" , padding: ".2rem"}}
                modal
                backdrop

            >
                <Text value={{ bind: '$page.textValue1' }}></Text>
                <TextField value-bind="$page.name" style ={{margin:".9rem"}}></TextField>
                <Button mod="primary" onClick="onChangeName">Update</Button>
            </Window>

            <div style={{ marginBottom: "2rem" }} >
                <LookupField
                  label="Modified"
                  value-bind="$page.modified"
                  text-bind="$page.modified.text"
                  options-bind="$page.user0"
                  placeholder="Last 7 Days"
                  style={{width:"130px", marginLeft:"0.5rem"}}
                />
                
                <DateField label="" value-bind="$page.date" visible-bind="$page.visible.date"/>
                {/* <Calendar value-bind="$page.date" visible-bind="$page.visible.date"/> */}
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
                <Button mod="primary" onClick="onZip">Export as zip</Button>
                <Button mod="primary" onClick="onModify" style={{ marginLeft: "1.5rem" }}>Modify</Button>
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
                                                return "fas fa-file-csv";
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
                    selection={{ type: KeySelection, keyField: 'document', bind: '$page.selection' }}
                    sorters-bind="$page.sorters"

                />
                {/* <div style={{ marginBottom:"0.5rem" }}> */}
                <Pagination page-bind="$page.page" pageCount-bind="$page.pageCount" />

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