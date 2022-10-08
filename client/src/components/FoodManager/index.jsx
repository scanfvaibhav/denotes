import { Button } from 'primereact/button';
import React,{useState} from 'react';
import {config} from './config';
import  './style.css'
const FoodManager=()=>{

    setTimeout(function() {
        window.location.reload();
      }, 30000);

   const today = new Date();
   
   const [day,setDay]=useState(today.getDay());
   const dayConfig=config[day];
   const curHr = today.getHours();
   let defaultFoodType=3;
   let msg="Good Evening";
   if (curHr < 12) {
        defaultFoodType=1;
        msg="Good morning";
    } else if (curHr < 18) {
        msg="Good Afternoon";
        defaultFoodType=2;
    }
    const [foodType,setFoodType]=useState(defaultFoodType);

   const foodMap={
       1:{foodCode:"breakfast",
    msg:"Good morning"},
       2:{foodCode:"lunch",
    msg:"Good Afternoon"},
       3:{foodCode:"dinner","msg":"Good Evening"}
   }

    
    const foodCode=foodMap[foodType].foodCode
    const dayFood = dayConfig[foodCode].items;
    const foodList = dayFood.map((obj)=>
    <div>
    <li>{obj.name}</li>
    <li>{obj.discription}</li>
    <li>"Quantity: "{obj.quantity}</li>
    <br/>
    <br/>
    </div>
);
    const next=()=>{
        if(foodType===3){
            setFoodType(1);
            if(day+1>6){
                setDay(0);
            } else{
                setDay(day+1);
            } 
        } else{
            setFoodType(foodType+1);
        }
    }
    const previous=()=>{
        if(foodType===1){
            setFoodType(3);
            if(day-1<0){
                setDay(6);
            }
            else{
                setDay(day-1);
            } 
        }else{
            setFoodType(foodType-1);
        }
    }
    return <div> 
        <h1 className="StyledDay">{msg}</h1>
        <h2 className="StyledDay">{today.getDate()+"/"+(Number(today.getMonth())+1)+"/"+today.getFullYear()}</h2>
        <div className="StyledDay"> <button className="next" onClick={previous}>&laquo;PREVIOUS</button></div>

        <h2 className="StyledDay">{dayConfig.day}</h2>
        <h3 className="StyledDay">{foodCode}</h3>
        <div className="StyledDay">{foodList}</div>
        <div className="StyledDay"> <button className="previous" onClick={next}>NEXT&raquo;</button></div>
        <p className="StyledDay">"Thank You !!"</p>
    </div>
}
export default FoodManager;