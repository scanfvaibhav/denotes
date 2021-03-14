import React, { useEffect, useState } from 'react';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Checkbox} from 'primereact/checkbox';
import {RadioButton} from 'primereact/radiobutton';
import {Dropdown} from 'primereact/dropdown';
import {InputTextarea} from 'primereact/inputtextarea';
import  {getForm,saveForm}  from '../../service/BaseService';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import  "../Posts/Posts.css";
import Profile from '../Profile/Profile';

const Dform=()=>{
    const [config,setConfig] = useState(null);
    const [formData,setFormdata] = useState({});

    const updateFormdata = (_this)=>{
        let data = formData;
        data[_this.currentTarget.id] = _this.currentTarget.value;
        setFormdata(data);
    }
    useEffect(()=>{
        let hash = window.location.hash;
        getForm(this,hash).then((res)=>{
            if(res)
                setConfig(res.data?JSON.parse(res.data.formConfig):"");
        });
    });
    const submit = ()=>{
        saveForm(this,formData).then((res)=>{
            window.location.href=res.data.url;
        });
    }
    return(
        <div className="container">
        <div className="left-col">
          <div className="category">
            
        
            
          </div>
        </div>
      
        <div className="center-col">
        <div className="p-fluid p-formgrid p-grid">{
        config?config.items.map((obj)=>{
            return <div className="p-field p-col">
        <label htmlFor={obj.id}>{obj.label}</label>
        {obj.type=="text"?<InputText id={obj.id} onChange={updateFormdata} type="text"/>:obj.type=="button"?<Button id={obj.id} label={obj.label} className="p-button-raised p-button-rounded" onClick={submit}/>:null}

    </div>
        }):null
    }
</div>
        </div>
      
        <div className="right-col">
        </div>
    </div>
    
    
    )
}
export default Dform;