import { Tab } from "cx/widgets";
import Search from "../search/index.js";
import Admin from "../admin/index.js";

export default (
    <cx>
        <h2 putInto="header">One Drive Management</h2>

        <div putInto="main">
            
                <Tab tab="search" value-bind="$page.tab" mod="classic">Search</Tab>
                <Tab tab="admin" value-bind="$page.tab" mod="classic">Admin</Tab>

            <div style="border: 1px solid lightgray; background: white; align-items: left; justify-content: space-around;">
            
            <div visible-expr="{$page.tab}=='search'">
                <Search />
            </div>
            <div visible-expr="{$page.tab}=='admin'">
                <Admin />
            </div>         

            </div>
           

        </div>
    </cx>
);
