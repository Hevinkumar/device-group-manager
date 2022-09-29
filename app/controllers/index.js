import Controller from '@ember/controller';
import {A} from "@ember/array";

export default Controller.extend({
    groupModel:false,
    deviceModel:false,
    type:null,
    modelData:A([]),
    tempData: {
        id: null,
        title: "",
        data: A([]),
        subtitle: "",
        icon:"",
        selected: false,
    },
    selectedItems:A([]),

    actions:{
        openGroups(){
            // this.model.set("popupGroups",true);
            this.set("modelData",A([]));
            this.set("deviceModel",false);
            this.set("groupModel",true);
            this.set("type","groups");
            this.set('selectedItems', JSON.parse(localStorage.getItem('selectedGroupItems')) || A([]));
            this.model.groups.forEach()
        },
        openDevices(){
            // this.model.set("popupDevices",true);
            this.set("modelData",A([]));
            this.set("groupModel",false);
            this.set("deviceModel",true);
            this.set("type","devices");

        }

    }
});
