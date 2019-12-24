import {Route, Section, Sandbox, PureContainer} from "cx/widgets";
import {FirstVisibleChildLayout} from "cx/ui";

import AppLayout from "../layout";

import Default from "./default";

import Search from "./search";
import Admin from "./admin";

export default () => <cx>
    <PureContainer outerLayout={AppLayout}>
    <Sandbox
        key-bind="url"
        storage-bind="pages"
        layout={FirstVisibleChildLayout}
    >
        <Route route="~/" url-bind="url">
            <Default/>
        </Route>
        <Route route="~/search" url-bind="url">
            <Search />
        </Route>
        <Route route="~/admin" url-bind="url">
            <Admin />
        </Route>
        
        <Section title="Page Not Found" mod="card">
            This page doesn't exists. Please check your URL.
        </Section>
    </Sandbox>
    </PureContainer>
</cx>;
