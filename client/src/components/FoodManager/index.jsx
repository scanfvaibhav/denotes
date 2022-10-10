import { Button } from 'primereact/button';
import React,{useState} from 'react';
import {config} from './config';
import  './style.css'
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { TabView, TabPanel } from 'primereact/tabview';

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
    const getFoodList=(food)=>{
        return food.map((obj)=>
        <div className="StyledDay">
            <h3><b>{obj.name}</b></h3>
            {obj.discription}
            "Quantity: "{obj.quantity}
        <br/>
        </div>
    );
    }
    const getFoodListFullMenu=(food)=>{
        return food.map((obj)=>
        <div className="StyledDay">
            <h3><b>{obj.name}</b></h3>
        </div>
    );
    }
    const foodListRenderer=(record,index)=>{
        return getFoodListFullMenu(record[index].items);
    }
    const foodList = getFoodList(dayFood);
    
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
    const FullMenu=()=>{return(<div>
        <DataTable value={config} responsiveLayout="scroll">
            <Column field="day" header="Day Name"></Column>
            <Column field="breakfast" body={(record)=>foodListRenderer(record,'breakfast')} header="Break Fast"></Column>
            <Column field="lunch" body={(record)=>foodListRenderer(record,'lunch')} header="Lunch"></Column>
            <Column field="dinner" body={(record)=>foodListRenderer(record,'dinner')} header="Dinner"></Column>
        </DataTable>
</div>)};
const getAllItems=(items)=>{
    let res=[];
    const getItems=(obj)=>{
        return [...obj.lunch.items,...obj.breakfast.items,...obj.dinner.items]
    }
    items.forEach((obj)=>{getItems(obj).forEach((obj)=>{if(obj.items){res=[...res,...obj.items]}});})
return res;
}
  const AllItems=()=>{
      return(<div>
    <DataTable value={getAllItems(config)} responsiveLayout="scroll">
        <Column field="itemId" header="Id"></Column>
        <Column field="type"  header="Type"></Column>
        <Column field="name"  header="Name"></Column>
        <Column field="description"  header="Description"></Column>
    </DataTable>
</div>)};
 const [activeIndex, setActiveIndex] = useState(0);
const TodayMenu=()=>{
    return (<div>
        <h2 className="StyledDay">{dayConfig.day}</h2>
        <h3 className="StyledDay">{foodCode}</h3>
        <div className="StyledDay"> <Card className="food-item">{foodList}</Card><br/></div>
        <div className="StyledDay"> <button className="next" onClick={previous}>&laquo; PREVIOUS</button> <button className="previous" onClick={next}> NEXT&raquo;</button></div>
    </div>);
}
    return <div> 
        <h1 className="StyledDay">{msg}</h1>
        <h2 className="StyledDay">{today.getDate()+"/"+(Number(today.getMonth())+1)+"/"+today.getFullYear()}</h2>
       

<TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
    <TabPanel header="Today Menu">
    <TodayMenu/>
    </TabPanel>
    <TabPanel header="All Menu">
    <FullMenu/>
    </TabPanel>
    <TabPanel header="All Items">
       <AllItems/>
    </TabPanel>
</TabView>
        
        
        
       
        <p className="StyledDay">"Thank You !!"</p>
    </div>
}
export default FoodManager;