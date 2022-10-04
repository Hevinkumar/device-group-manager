import Controller from '@ember/controller';
import { A } from "@ember/array";

export default Controller.extend({
    // groupModel: false,
    // deviceModel: false,
    type: null,
    modelData: A([]),
    selectedItems: A([]),
    category:A([]),
    modelFlag:false,
    setModelData(data,type) {
        // console.log("called ::");
        let selectedItems = JSON.parse(localStorage.getItem(`selected${type}Items`)) || A([]);
        let temp = A([]);
        let category =A([]);
        data.forEach(ele => {
            this.set('tempData', {
                id: null,
                title: "",
                data: A([]),
                type: "",
                subtitle: "",
                icon: "",
                selected: false,
            });
            this.tempData.id = ele.id;
            this.tempData.title = ele.title;
            this.tempData.icon = ele.icon;
            this.tempData.type = ele.type;

            if (this.type == "groups") {
                // console.log(ele.data);
                let temp = ele.data.length
                this.tempData.subtitle = `${temp} devices`;
                this.tempData.data = ele.data;
            }
            else if (this.type == "devices") {
                this.tempData.subtitle = ele.subtitle;
                this.tempData.data = ele;
            }

            if (selectedItems.length != 0) {
                selectedItems.forEach(data => {
                    if (data.id == ele.id) {
                        this.tempData.selected = true;
                    }
                });
            }
            else {
                this.tempData.selected = false;
            }
            temp.pushObject(this.tempData);
            this.set('tempData', {
                id: null,
                title: "",
                data: A([]),
                type: "",
                subtitle: "",
                icon: "",
                selected: false,
            });
            if(!(category.includes(ele.type))) {
                category.pushObject(ele.type);
            }
        });
        return [temp,category];

    },
    actions: {
        openGroups() {
            this.set("modelData", A([]));
            this.set("type", "groups");
            let [temp,category]=this.setModelData(this.model.groups,this.type);
            this.set("modelData", A(temp));
            this.set("category",A(category));
            this.set("modelFlag",true);
        },
        openDevices() {
            this.set("modelData", A([]));
            this.set("type", "devices");
            let [temp,category]=this.setModelData(this.model.devices,this.type);
            this.set("modelData", A(temp));
            this.set("category",A(category));
            this.set("modelFlag",true);

        },
        
    }
});
