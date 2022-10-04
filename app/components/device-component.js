import Component from '@ember/component';
import { A } from '@ember/array';
// import { inject as service } from '@ember/service';
import { computed, set } from '@ember/object';

export default Component.extend({

    didRender(){
        let overflow =this.$(".title");
        let sub_title =this.$(".sub-title");
        for(let i =0 ;i < overflow.length;i++){
            if(overflow[i].innerText.length > 15){
                overflow[i].parentNode.classList.add("show-tooltip-up");
            }
            if(sub_title[i].innerText.length > 12){
                sub_title[i].parentNode.classList.add("show-tooltip-down");
            }
        }
    },

    actions:{
        selectToggleItem(item){
            this.selectToggle(item);
        }
    }
});
