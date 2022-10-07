import Component from '@ember/component';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { computed, set } from '@ember/object';
// import { getOwner } from '@ember/application';

export default Component.extend({
    selectedDatas: service('selected-datas'),
    // component_type: false,
    modeldata: A([]),
    displaydata: A([]),
    backupdata: A([]),
    category: A([]),
    viewData:A([]),


    init() {
        this._super(...arguments);
        this.set("displaydata", this.model);
        this.set("backupdata", this.model);
        this.set("category", this.category);
        this.set("selectedItems", JSON.parse(localStorage.getItem(`selected${this.type}Items`)) || A([]));
        if (this.type == "groups") {
            this.set("groupComponent", true);
        }
        else {
            this.set("deviceComponent", true);
        };
        let self = this
        function closeComponent(event) {
            if (event.key == "Escape") {
                self.set("modelFlag", false);
                window.removeEventListener('keyup', closeComponent)
            }

        }
        this.set("closeComponent", closeComponent);
        if (this.modelFlag) {
            window.addEventListener('keyup', closeComponent);
        }

        if (this.model.length > 25) {
            this.set("viewDataInitial", this.model.slice(0, 30));
        }
        else {
            this.set("viewDataInitial", this.model);
        }
        // console.log(this.displaydata);
        this.set("displaydata",this.viewDataInitial);


    },
    actions: {
        close() {
            this.set("modelFlag", !(this.modelFlag));
            window.removeEventListener('keyup', this.closeComponent);
            // if (this.groupComponent){
            //     this.set("groupComponent" ,!(this.get("groupComponent")));
            // };
            // if (this.deviceComponent){
            //     this.set("deviceComponent" ,!(this.get("deviceComponent")));
            // }
        },
        select() {
            localStorage.setItem(`selected${this.type}Items`, JSON.stringify(this.selectedItems));
            this.set("displaydata", this.model);
            this.set("modelFlag", !(this.get("modelFlag")));
            this.set("selectedItems", A([]));
            window.removeEventListener('keyup', this.closeComponent);
            // if (this.groupComponent){
            //     this.set("groupComponent" ,!(this.get("groupComponent")));
            // };
            // if (this.deviceComponent){
            //     this.set("deviceComponent" ,!(this.get("deviceComponent")));
            // }
        },
        selectToggle(item){
            let temp = A([]);
            this.displaydata.forEach(ele => {
                if (ele.id == item.id) {
                    set(ele, "selected", !ele.selected);
                    // console.log(ele);
                    if (ele.selected) {
                        if (this.selectedItems) {
                            this.selectedItems.pushObject(ele);
                        }
                        // console.log(this.selectedItems);
                    }
                    else {
                        let newArray = [];
                        newArray = this.selectedItems.filter(element => {
                            if (ele.id != element.id) {
                                return element;
                            }
                        })
                        this.set("selectedItems", A(newArray));
                    }
                    temp.pushObject(ele);
                }
                else {
                    temp.pushObject(ele);
                }

            })
            this.set("displaydata", temp);
        },
    
        handleFilterEntry() {
            if (this.value !== '') {
                this.set("displaydata", this.backupdata);
                let temp = this.value;
                let filteredResults = this.displaydata.filter(i => {
                    let name;
                    name = i.title;
                    return (name.toLowerCase()).indexOf(temp.toLowerCase()) !== -1;

                })
                this.set("displaydata", filteredResults);
            } else {
                this.set("displaydata", this.viewDataInitial);
            }
        },
        handleProductFilter(e) {
            let value = e.target.value;
            // console.log(value);
            this.set("displaydata", this.backupdata);
            let filteredData;
            if (value == "") {
                filteredData = this.viewDataInitial;
            }
            else {
                filteredData = this.displaydata.filter(ele => {
                    if (ele.type == value) {
                        return ele;
                    }
                });
            }
            this.set("displaydata", filteredData);
        },
    }
});
