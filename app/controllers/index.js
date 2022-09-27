import Controller from '@ember/controller';

export default Controller.extend({
    groupModel:false,
    deviceModel:false,
    type:null,

    actions:{
        openGroups(){
            this.set("deviceModel",false);
            this.set("groupModel",true);
            this.set("type","groups");
        },
        openDevices(){
            this.set("groupModel",false);
            this.set("deviceModel",true);
            this.set("type","devices");

        }

    }
});
