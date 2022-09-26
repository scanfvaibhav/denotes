import React from 'react';
import {config} from './config';
import  './style.css'
const FoodManager=()=>{

    setTimeout(function() {
        window.location.reload();
      }, 30000);
   const today = new Date();
   const day=today.getDay();
   const dayConfig=config[day];
   const curHr = today.getHours();
   const currentConfig={
       msg:"",
       foodtype:"",
   }

        if (curHr < 12) {
            currentConfig.msg='Good morning';
            currentConfig.foodtype='breakfast';
            
        } else if (curHr < 18) {
            currentConfig.msg='Good Afternoon';
            currentConfig.foodtype='lunch';
        } else {
            currentConfig.msg='Good Evening';
            currentConfig.foodtype='dinner';
        }
    const dayFood = dayConfig[currentConfig.foodtype].items;
    const foodList = dayFood.map((obj)=>
    <div>
    <li>{obj.name}</li>
    <li>{obj.discription}</li>
    <li>"Quantity: "{obj.quantity}</li>
    <br/>
    <br/>
    </div>
);
    return <div> 
        <h1 className="StyledDay">{currentConfig.msg}</h1>
        <h2 className="StyledDay">{dayConfig.day}</h2>
        <h2 className="StyledDay">{today.getDate()+"/"+(Number(today.getMonth())+1)+"/"+today.getFullYear()}</h2>
        <div className="StyledDay">{foodList}</div>
        <p className="StyledDay">"Thank You !!"</p>
    </div>
}
export default FoodManager;