import Component from '@ember/component';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { getOwner } from '@ember/application';

export default Component.extend({
    selectedDatas: service('selected-datas'),
    // selectedDatas:computed(function() {
    //     return getOwner(this).lookup('service:selected-datas');
    //   }),
    selectedItems:A([]),
    component_type: false,
    modeldata: null,
    groupsData: {
        name: "",
        data: A([]),
        selected: false,
    },
    deviceData: {
        id: null,
        group: "",
        device: "",
        os: "",
        username: "",
        selected: null,

    },
    groups: A([]),
    selectedGroups: A([]),
    // devices:A([]),

    init() {
        this._super(...arguments)

        // console.log(this.model);
        this.set("modeldata", this.model);
        // var hr_dep, dev;

        if (this.type == "groups") {
            this.set("component_type", true);
            this.set("selectedGroups", this.selectedDatas.get("selectedGroups"));
            this.set('selectedGroups', JSON.parse(localStorage.getItem('groupdata')) || A([]));
            this.set("groups", A([]));
            this.model.forEach(ele => {
                var temp = true;
                // console.log(ele);

                if (this.groups.length != 0) {
                    // let temp=this.groups;

                    this.groups.forEach(e => {
                        if (e.name == ele.group) {
                            e.data.pushObject(ele);
                            // console.log(this.groups);
                            temp = false;
                        }
                    });
                    // console.log(this.groups);
                    if (temp) {
                        this.set("groupsData", { name: "", data: A([]), selected: false });
                        this.groupsData.name = ele.group;
                        this.groupsData.data.pushObject(ele);
                        this.groups.pushObject(this.groupsData);
                        this.set("groupsData", { name: "", data: A([]), selected: false });

                        // temp=false;

                    }

                }
                else if (this.groups.length == 0) {
                    this.set("groupsData", { name: "", data: A([]), selected: false });
                    this.groupsData.name = ele.group;
                    this.groupsData.data.pushObject(ele);
                    this.groups.pushObject(this.groupsData);
                    // console.log(this.groups);
                    this.set("groupsData", { name: "", data: A([]), selected: false });

                }



            });
        }
        else {
            this.set("groups", A([]));
            let temp = A([]);
            this.model.forEach(ele => {
                this.set("deviceData", { id: null, group: "", device: "", os: "", username: "", selected: null })

                this.deviceData.id = ele.id;
                this.deviceData.os = ele.os;
                this.deviceData.username = ele.username;
                this.deviceData.device = ele.device;
                this.deviceData.group = ele.group;
                this.deviceData.selected = false;
                temp.pushObject(this.deviceData);
                this.set("deviceData", { id: null, group: "", device: "", os: "", username: "", selected: null })
            })
            this.set("groups", temp);
            this.set("selectedGroups", this.selectedDatas.get("selectedDatas"));

        }
        // console.log(this.devices);


    },

    actions: {
        close() {
            if (this.type == "devices") {
                this.set("deviceModel", !this.get("deviceModel"));
            }
            else {
                this.set("groupModel", !this.get("groupModel"));
            }
        },
        select(item) {
            console.log(item);

            if (this.type == "groups") {
                this.selectedDatas.addItem(item, this.type);
            }
            else {
                this.selectedDatas.addItem(item, this.type);
            }
        },
        selectToggle(item) {
            console.log(item);
            if (this.type == "groups") {
                let temp = A([]);
                this.groups.forEach(ele => {
                    if (ele === item) {
                        this.set("groupsData", { name: "", data: A([]), selected: false });
                        this.groupsData.name = ele.name;
                        this.groupsData.data = ele.data;
                        this.groupsData.selected = !(ele.selected);
                        if(this.groupsData.selected){
                            if(this.selectedItems){
                                this.selectedItems.pushObject(this.groupsData);
                            }
                            console.log(this.selectedItems);
                        }
                        else{
                            let newArray=[];
                            newArray=this.selectedItems.filter(element =>{
                                if(ele != element){
                                    return element;

                                }

                            })
                            this.set("selectedItems",A(newArray));
                            console.log(this.selectedItems);

                        }
                        // e.set("selected",true);
                        temp.pushObject(this.groupsData);
                        this.set("groupsData", { name: "", data: A([]), selected: false });
                        console.log(temp);
                    }
                    else {
                        temp.pushObject(ele);
                    }

                })
                this.set("groups", temp);
                console.log(this.groups);
            }
            else {
                let temp = A([]);
                // console.log(this.groups);
                this.groups.forEach(ele => {
                    if (ele === item) {
                        this.set("deviceData", { id: null, group: "", device: "", os: "", username: "", selected: null })

                        this.deviceData.id = ele.id;
                        this.deviceData.os = ele.os;
                        this.deviceData.username = ele.username;
                        this.deviceData.device = ele.device;
                        this.deviceData.group = ele.group;
                        this.deviceData.selected = !(ele.selected);

                        if(this.deviceData.selected){
                            if(this.selectedItems){
                                this.selectedItems.pushObject(this.deviceData);
                            }
                            console.log(this.selectedItems);
                        }
                        else{
                            let newArray=[];
                            newArray=this.selectedItems.filter(element =>{
                                if(ele != element){
                                    return element;

                                }

                            })
                            this.set("selectedItems",A(newArray));
                            console.log(this.selectedItems);

                        }

                        temp.pushObject(this.deviceData);
                        this.set("deviceData", { id: null, group: "", device: "", os: "", username: "", selected: null })
                    }
                    else {
                        temp.pushObject(ele);
                    }

                })
                this.set("groups", temp);
                // console.log(this.groups);

            }

            // this.toggleProperty(item)
        }
    }
});
