import Component from '@ember/component';
import { A } from '@ember/array';
// import { inject as service } from '@ember/service';
import { computed, set, get } from '@ember/object';

export default Component.extend({
    // loading :true,
    init() {
        this._super(...arguments);
        this.set("loading",false);
        if(this.displaydata.length > 25){
            this.set("display_overflow",true);
        }
        else{
            this.set("display_overflow",false);
        }
    },

    didRender() {
        
        if(this.displaydata.length > 25){
            this.set("display_overflow",true);
        }
        else{
            this.set("display_overflow",false);
        }
        let overflow = this.$(".title");
        let sub_title = this.$(".sub-title");
        for (let i = 0; i < overflow.length; i++) {
            if (overflow[i].innerText.length > 20) {
                overflow[i].parentNode.classList.add("show-tooltip-up");
            }
            if (sub_title[i].innerText.length > 18) {
                sub_title[i].parentNode.classList.add("show-tooltip-down");
            }
        }
        var myDiv = this.$(".popup-model-content");
        let self = this;
        function addData() {
            // console.log(self.viewData);
            let modelLength = self.model.length;
            let displaydataLength = self.displaydata.length;
            // console.log(modelLength, displaydataLength);
            if (displaydataLength < modelLength) {
                if (displaydataLength + 10 <= modelLength) {
                    setTimeout(function () {
                        for (let i = displaydataLength; i <= (displaydataLength + 10); i++) {
                            if (!(self.displaydata.includes(self.model[i-1]))){
                                self.displaydata.pushObject(self.model[i-1]);
                            }   
                        }
                        // console.log(self.viewData);
                        self.set("loading",false);
                        // console.log(modelLength, displaydataLength);
                    }, 1000);
                }
                else if (modelLength <= displaydataLength + 10) {
                    let temp = modelLength - displaydataLength;
                    // console.log(temp);
                    setTimeout(function () {
                        for (let i = displaydataLength; i <= (displaydataLength + temp); i++) {
                            // set(this, "view", display[i]);
                            if (!(self.displaydata.includes(self.model[i-1]))){
                                self.displaydata.pushObject(self.model[i-1]);
                            }
                        }
                        self.set("loading",false);

                    }, 1000);

                }
            }
        }
        let flag = true;
        myDiv.scroll(function () {
            // self.set("loading",true);
            let scroll = Math.round((((myDiv.scrollTop() + myDiv[0].offsetHeight) / myDiv[0].scrollHeight)) * 100);
            let scrollHeight = Math.round((myDiv[0].scrollHeight / myDiv[0].scrollHeight)) * 100
            if (self.model.length != self.displaydata.length){
                // console.log("inside scroll");
                if (scroll == scrollHeight) {
                    self.set("loading",true);
                    
                    addData();
                }
            }
        });
    },

    actions: {
        selectToggleItem(item) {
            this.selectToggle(item);
        }
    }
});
