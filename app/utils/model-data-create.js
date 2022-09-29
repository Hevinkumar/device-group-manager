import {A} from '@ember/array';

export default function modelDataCreate(modelData,type) {
//   let tempData: {
//     id: null,
//     title: "",
//     data: A([]),
//     subtitle: "",
//     icon:"",
//     selected: false,
// },
  let selectedItems =A([]);
  if (type == "groups"){
    selectedItems = JSON.parse(localStorage.getItem('selectedGroupItems')) || A([]);
  }
  else if(typr == "devices"){
    selectedItems = JSON.parse(localStorage.getItem('selectedDeviceItems')) || A([]);

  }
  

  modelData.forEach(element => {


    
  });
}
