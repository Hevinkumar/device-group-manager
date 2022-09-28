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
    selectedGroupItems: A([]),
    selectedDeviceItems: A([]),
    component_type: false,
    modeldata: null,
    displaydata: A([]),
    tempData: {
        id: null,
        name: "",
        data: A([]),
        devices: A({}),
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
            this.set('selectedGroupItems', JSON.parse(localStorage.getItem('selectedGroupItems')) || A([]));

            // this.set("groups", A([]));
            // this.model.forEach(ele => {
            //     var temp = true;
            //     // console.log(ele);

            //     if (this.groups.length != 0) {
            //         // let temp=this.groups;

            //         this.groups.forEach(e => {
            //             if (e.name == ele.group) {
            //                 e.data.pushObject(ele);
            //                 // console.log(this.groups);
            //                 temp = false;
            //             }
            //         });
            //         // console.log(this.groups);
            //         if (temp) {
            //             this.set("groupsData", { name: "", data: A([]), selected: false });
            //             this.groupsData.name = ele.group;
            //             this.groupsData.data.pushObject(ele);
            //             this.groups.pushObject(this.groupsData);
            //             this.set("groupsData", { name: "", data: A([]), selected: false });

            //             // temp=false;

            //         }

            //     }
            //     else if (this.groups.length == 0) {
            //         this.set("groupsData", { name: "", data: A([]), selected: false });
            //         this.groupsData.name = ele.group;
            //         this.groupsData.data.pushObject(ele);
            //         this.groupsData.selected=false;
            //         this.groups.pushObject(this.groupsData);
            //         // console.log(this.groups);
            //         this.set("groupsData", { name: "", data: A([]), selected: false });

            //     }



            // });
            console.log(this.model);
            let temp = A([]);
            this.model.forEach(data => {
                this.set("tempData", { id: null, name: "", data: A([]), devices: A([]), selected: false });
                this.tempData.id = data.id;
                this.tempData.name = data.name;
                this.tempData.devices = data.device;
                this.tempData.data.pushObject(data);
                if (this.selectedGroupItems.length != 0) {
                    this.selectedGroupItems.forEach(ele => {
                        if (data.id == ele.id) {
                            this.tempData.selected = true;
                        }
                    });
                }
                else {
                    this.tempData.selected = false;
                }
                temp.pushObject(this.tempData);
                this.set("tempData", { id: null, name: "", data: A([]), devices: A([]), selected: false });

            })
            this.set("displaydata",temp);
            console.log(this.displaydata);
        }
        else {
            console.log(this.type);
            this.set('selectedDeviceItems', JSON.parse(localStorage.getItem('selectedDeviceItems')) || A([]));
            let temp = A([]);
            // let flag = false;
            // let count = 0;
            this.model.forEach(data => {
                console.log(data);
                this.set("deviceData", { id: null, group: "", device: "", os: "", username: "", selected: null });
                this.deviceData.id = data.id;
                this.deviceData.os = data.os;
                this.deviceData.username = data.username;
                this.deviceData.device = data.device;
                this.deviceData.group = data.group;
                console.log(this.deviceData);
                if (this.selectedDeviceItems.length != 0) {
                    this.selectedDeviceItems.forEach(ele => {
                        if (data.id == ele.id) {
                            this.deviceData.selected = true;
                        }
                    });
                }
                else {
                    this.deviceData.selected = false;
                }
                temp.pushObject(this.deviceData);

                console.log(temp);
                this.set("deviceData", { id: null, group: "", device: "", os: "", username: "", selected: null });
            });
            this.set("displaydata", temp);
        }



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

            if (this.type == "groups") {
            }
            // console.log(item);

            // if (this.type == "groups") {
            //     this.selectedDatas.addItem(item, this.type);
            // }
            // else {
            //     this.selectedDatas.addItem(item, this.type);
            // }
        },
        selectToggle(item) {
            console.log(item);
            if (this.type == "groups") {
                let temp = A([]);
                this.displaydata.forEach(ele => {
                    if (ele === item) {
                        this.set("tempData", { id: null, name: "", data: A([]), devices: A([]), selected: false });
                        this.tempData.id = ele.id;
                        this.tempData.name = ele.name;
                        this.tempData.devices = ele.device;
                        this.tempData.data.pushObject(ele);
                        this.tempData.selected = !(ele.selected);
                        if (this.tempData.selected) {
                            if (this.selectedGroupItems) {
                                this.selectedGroupItems.pushObject(this.tempData);
                            }
                            console.log(this.selectedGroupItems);
                        }
                        else {
                            let newArray = [];
                            newArray = this.selectedGroupItems.filter(element => {
                                if (ele.id != element.id) {
                                    return element;

                                }

                            })
                            this.set("selectedGroupItems", A(newArray));
                            localStorage.setItem("selectedGroupItems", JSON.stringify(this.selectedGroupItems));
                            console.log(this.selectedGroupItems);

                        }
                        // e.set("selected",true);
                        temp.pushObject(this.tempData);
                        this.set("tempData", { id: null, name: "", data: A([]), devices: A([]), selected: false });
                        console.log(temp);
                    }
                    else {
                        temp.pushObject(ele);
                    }

                })
                this.set("displaydata", temp);
                localStorage.setItem("selectedGroupItems", JSON.stringify(this.selectedGroupItems));
                console.log(this.displaydata);
            }
            else {
                let temp = A([]);
                // console.log(this.groups);
                this.displaydata.forEach(ele => {
                    if (ele == item) {
                        this.set("deviceData", { id: null, group: "", device: "", os: "", username: "", selected: null })

                        this.deviceData.id = ele.id;
                        this.deviceData.os = ele.os;
                        this.deviceData.username = ele.username;
                        this.deviceData.device = ele.device;
                        this.deviceData.group = ele.group;
                        this.deviceData.selected = !(ele.selected);
                        if (this.deviceData.selected) {
                            if (this.selectedDeviceItems) {
                                this.selectedDeviceItems.pushObject(this.deviceData);
                            }
                            // console.log(this.selectedDeviceItems);
                        }
                        else {
                            let newArray = [];
                            newArray = this.selectedDeviceItems.filter(element => {
                                if (ele.id != element.id) {
                                    return element;

                                }

                            })
                            console.log(newArray, "newArray");
                            this.set("selectedDeviceItems", A(newArray));
                            localStorage.setItem("selectedDeviceItems", JSON.stringify(this.selectedDeviceItems));
                            console.log(this.selectedDeviceItems);


                        }



                        temp.pushObject(this.deviceData);
                        this.set("deviceData", { id: null, group: "", device: "", os: "", username: "", selected: null })
                    }
                    else {
                        temp.pushObject(ele);
                    }

                })
                this.set("displaydata", temp);
                localStorage.setItem("selectedDeviceItems", JSON.stringify(this.selectedDeviceItems));
                console.log(this.groups);

            }

            // this.toggleProperty(item)
        }
    }
});
