var OneDriveAuth = require('onedrive-auth');
import { Controller } from "cx/ui";

export default class DefaultController extends Controller {
    init() {
       super.init();
       this.store.init("$tab.disable",true);
       this.store.set("$page.disabled" ,true);

       var onedrive = new OneDriveAuth({
        clientId: '8f14308e-dcd5-4511-bec2-96e19a934f76',
        scopes: 'onedrive.readonly wl.signin',
        redirectUri: 'http://localhost:8765/',
      });
       
    }

    onClick(){
        this.store.set("$page.visible",true);
        this.store.set("$page.disabled" ,false);
    }

    onSignin(){
        this.store.set("$tab.disable",false);
    }
    
}


