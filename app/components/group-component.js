import Component from '@ember/component';
import { A } from '@ember/array';
// import { inject as service } from '@ember/service';
import { computed, set } from '@ember/object';

export default Component.extend({
    init(){
        this._super(...arguments);
        
       
    },
    didRender(){
        let title =this.$(".title");
        let sub_title =this.$(".sub-title");
        for(let i =0 ;i < title.length;i++){
            // console.log(title[i]);
            if(title[i].innerText.length > 20){
                title[i].parentNode.classList.add("show-tooltip-up");
            }
            if(sub_title[i].innerText.length > 18){
                sub_title[i].parentNode.classList.add("show-tooltip-down");
            }
        }
        // console.log(title);
        if(this.displaydata.length > 25){
            this.set("display_overflow",true);
        }
        else{
            this.set("display_overflow",false);
        }
        

    },

    actions:{
        selectToggleItem(item){
            this.selectToggle(item);
        }
    }
});
