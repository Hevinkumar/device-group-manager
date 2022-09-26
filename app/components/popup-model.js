import Component from '@ember/component';

export default Component.extend({

    modeldata:this.model,

    init(){
        if (this.type == "groups"){
            this.model.forEach(ele => {
                // if(ele.group == )
                
            });
        }


    },

    actions:{
        close(event){
            // let model = document.querySelector(".popup-model");
            // model.style.display="none";
            if(this.model == "devices"){
                console.log("inside if ");
                this.set("deviceModel", !this.get("deviceModel"));
            }
            else{
                this.set("groupModel",!this.get("groupModel"));
            }
        }
    }
});
