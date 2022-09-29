import Component from '@ember/component';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { computed, set } from '@ember/object';
import { getOwner } from '@ember/application';

export default Component.extend({
    selectedDatas: service('selected-datas'),
    // component_type: false,
    modeldata: A([]),
    displaydata: A([]),
    backupdata: A([]),
    category: A([]),

    init() {
        this._super(...arguments);
        console.log(this.model);
        console.log(this.category);
        console.log(this.type);
        this.set("displaydata", this.model);
        this.set("backupdata", this.model);
        this.set("category", this.category);
        this.set("selectedItems", JSON.parse(localStorage.getItem(`selected${this.type}Items`)) || A([]));


    },
    actions: {
        close() {
            this.set("component", !(this.get("component")));
        },
        select() {
            localStorage.setItem(`selected${this.type}Items`, JSON.stringify(this.selectedItems));
            this.set("displaydata", this.model);
            this.set("component", !(this.get("component")));
            this.set("selectedItems", A([]));
        },
        selectToggle(item){
            let temp = A([]);
            this.displaydata.forEach(ele => {
                if (ele.id == item.id) {
                    set(ele, "selected", !ele.selected);
                    console.log(ele);
                    if (ele.selected) {
                        if (this.selectedItems) {
                            this.selectedItems.pushObject(ele);
                        }
                        console.log(this.selectedItems);
                    }
                    else {
                        let newArray = [];
                        newArray = this.selectedItems.filter(element => {
                            if (ele.id != element.id) {
                                return element;
                            }
                        })
                        this.set("selectedItems", A(newArray));
                        // localStorage.setItem(`selected${this.type}Items`, JSON.stringify(this.selectedItems));
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
                    if (ele.type == value) {
                        return ele;
                    }
                });
            }
            this.set("displaydata", filteredData);
        },
    }
});
