import Service from '@ember/service';
import { A } from '@ember/array';
import EmberObject from '@ember/object';

let Selected = EmberObject.extend({
    init(id, item, selected) {
        this.set("id", this.id);
        this.set("item", this.item);
        this.set("selected", this.selected);

    }

})

export default Service.extend({

    selectedGroups: A([]),
    selectedDevices: A([]),

    init() {
        this._super(...arguments);
        this.set('selectedGroups', JSON.parse(localStorage.getItem('selectedGroups')) || A([]));
        this.set("selectedDevices", JSON.parse(localStorage.getItem("selectedDevices")) || A([]));
    },
    addItem(item, type) {
        let selected = Selected.create({
            id: item.id,
            item: item,
            selected: true,
        });
        if (type == "groups") {
            this.selectedGroups.pushObject(selected);
            localStorage.setItem("selectedGroups", JSON.stringify(this.selectedGroups));
        }
        else {
            this.selectedDevices.pushObject(selected);
            localStorage.setItem("selectedDevices", JSON.stringify(this.selectedDevices));

        }
    },
    removeItem(item, type) {
        if (type == "groups") {
            // this.selectedGroups.pushObject(selected);
            let removedData = this.selectedGroups.filter(ele => {
                if (ele.item !== item) {
                    return ele;
                };
            })
            this.set("selectedGroups", A(removedData));
            localStorage.setItem("selectedGroups", JSON.stringify(this.selectedGroups));
        }
        else {
            let removedData = this.selectedGroups.filter(ele => {
                if (ele.item !== item) {
                    return ele;
                };
            })
            this.set("selectedGroups", A(removedData));
            localStorage.setItem("selectedDevices", JSON.stringify(this.selectedDevices));

        }


    }
});
