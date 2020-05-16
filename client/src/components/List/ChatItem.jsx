import React from "react";

export const ChatFrom = props => (
    <div>
    {(props.my)? <p className="frmChat">
        {props.text}{props.sent==true?'/':''}{props.received==true?'/':''}{props.read==true?'/':''}
      </p>: <p className="toChat">
      {props.text}{props.sent==true?'/':''}{props.received==true?'/':''}{props.read==true?'/':''}
    </p>
    }
    </div>
 
);