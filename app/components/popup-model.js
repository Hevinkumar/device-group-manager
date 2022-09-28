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
    value: "",
    selectedGroupItems: A([]),
    selectedDeviceItems: A([]),
    component_type: false,
    modeldata: null,
    displaydata: A([]),
    backupdata: A([]),
    category: A([]),
    tempData: {
        id: null,
        name: "",
        data: A([]),
        device: A([]),
        selected: false,
    },
    deviceData: {
        id: null,
        group: "",
        device: "",
        os: "",
        name: "",
        selected: null,

    },
    groups: A([]),
    selectedGroups: A([]),
    // devices:A([]),

    init() {
        this._super(...arguments)

        this.set("modeldata", this.model);

        if (this.type == "groups") {
            this.set("category", A([]));
            this.set("component_type", true);
            this.set("selectedGroups", this.selectedDatas.get("selectedGroups"));
            this.set('selectedGroupItems', JSON.parse(localStorage.getItem('selectedGroupItems')) || A([]));
            console.log(this.model);
            let temp = A([]);
            this.model.forEach(data => {
                this.set("tempData", { id: null, name: "", data: A([]), device: A([]), selected: false });
                this.tempData.id = data.id;
                this.tempData.name = data.name;
                this.tempData.device = data.device;
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
                if (!(this.category.includes(data.name))) {
                    this.category.pushObject(data.name);
                }


            })
            this.set("displaydata", temp);
            this.set("backupdata", this.displaydata);
            // console.log(this.displaydata);
            // console.log(this.category);
        }
        else {
            console.log(this.type);
            this.set('selectedDeviceItems', JSON.parse(localStorage.getItem('selectedDeviceItems')) || A([]));
            this.set("category", A([]));
            let temp = A([]);
            // let flag = false;
            // let count = 0;
            this.model.forEach(data => {
                // console.log(data);
                this.set("deviceData", { id: null, group: "", device: "", os: "", name: "", selected: null });
                this.deviceData.id = data.id;
                this.deviceData.os = data.os;
                this.deviceData.name = data.name;
                this.deviceData.device = data.device;
                this.deviceData.group = data.group;
                // console.log(this.deviceData);
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

                // console.log(temp);
                this.set("deviceData", { id: null, group: "", device: "", os: "", name: "", selected: null });
                if (!(this.category.includes(data.os))) {
                    this.category.pushObject(data.os);
                }
            });
            this.set("displaydata", temp);
            this.set("backupdata", this.displaydata);
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
        select() {
            if(this.type == "groups"){
                this.set("selectedGroupItems",A([]));
                localStorage.setItem("selectedGroupItems",JSON.stringify(this.selectedGroupItems));
                this.set("displaydata",this.model);
            }
            else{
                this.set("selectedDeviceItems",A([]));
                localStorage.setItem("selectedDeviceItems",JSON.stringify(this.selectedDeviceItems));
                this.set("displaydata",this.model);
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
            // console.log(item);
            if (this.type == "groups") {
                let temp = A([]);
                this.displaydata.forEach(ele => {
                    if (ele === item) {
                        this.set("tempData", { id: null, name: "", data: A([]), devices: A([]), selected: false });
                        this.tempData.id = item.id;
                        this.tempData.name = item.name;
                        this.tempData.device = item.device;
                        this.tempData.data.pushObject(item);
                        this.tempData.selected = !(item.selected);
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
                            // console.log(this.selectedGroupItems);

                        }
                        // e.set("selected",true);
                        temp.pushObject(this.tempData);
                        this.set("tempData", { id: null, name: "", data: A([]), devices: A([]), selected: false });
                        // console.log(temp);
                    }
                    else {
                        temp.pushObject(ele);
                    }

                })
                this.set("displaydata", temp);
                localStorage.setItem("selectedGroupItems", JSON.stringify(this.selectedGroupItems));
                // console.log(this.displaydata);
            }
            else {
                let temp = A([]);
                // console.log(this.groups);
                this.displaydata.forEach(ele => {
                    if (ele == item) {
                        this.set("deviceData", { id: null, group: "", device: "", os: "", name: "", selected: null })
                        this.deviceData.id = ele.id;
                        this.deviceData.os = ele.os;
                        this.deviceData.name = ele.name;
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
                            // console.log(newArray, "newArray");
                            this.set("selectedDeviceItems", A(newArray));
                            localStorage.setItem("selectedDeviceItems", JSON.stringify(this.selectedDeviceItems));
                            // console.log(this.selectedDeviceItems);
                        }
                        temp.pushObject(this.deviceData);
                        this.set("deviceData", { id: null, group: "", device: "", os: "", name: "", selected: null })
                    }
                    else {
                        temp.pushObject(ele);
                    }

                })
                this.set("displaydata", temp);
                localStorage.setItem("selectedDeviceItems", JSON.stringify(this.selectedDeviceItems));
                // console.log(this.groups);
            }

            // this.toggleProperty(item)
        },
        handleFilterEntry() {
            if (this.value !== '') {
                // console.log(this.value, "param")
                this.set("displaydata",this.backupdata);
                let temp = this.value;
                let filteredResults = this.displaydata.filter(i =>{
                    let name;
                    name=i.name;
                    // if (this.component_type){
                    //     name = i.name;
                    // }
                    // else{
                    //     name=i.os;
                    // }
                    return (name.toLowerCase()).indexOf(temp.toLowerCase()) !== -1;

                })
                this.set("displaydata", filteredResults);
            } else {
                this.set("displaydata", this.backupdata);
            }
        },
        handleProductFilter(e) {
            let value = e.target.value;
            // console.log(value);
            this.set("displaydata", this.backupdata);
            let filteredData;
            if (value == "") {
                filteredData = this.backupdata;

            }
            else {

                filteredData = this.displaydata.filter(ele => {
                    if (this.component_type) {
                        if (ele.name == value) {
                            return ele;
                        }
                    }
                    else {
                        if (ele.os == value) {
                            return ele;
                        }

                    }
                });
            }
            this.set("displaydata", filteredData);
        },
    }
});
