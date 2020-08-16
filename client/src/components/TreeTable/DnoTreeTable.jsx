import React, { Component } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

export default class DnoTreeTable extends Component {

    constructor(props) {
        debugger
        super(props);
        this.state = {
            nodes: [{
                key: '0-0',
                data: { brand: 'Product A', lastYearSale: '25%', thisYearSale: '20%', lastYearProfit: '$34,406.00', thisYearProfit: '$23,342' },
                children: [
                    {
                        key: '0-0-0',
                        data: { brand: 'Product A-1', lastYearSale: '20%', thisYearSale: '10%', lastYearProfit: '$24,406.00', thisYearProfit: '$13,342' },
                    },
                    {
                        key: '0-0-1',
                        data: { brand: 'Product A-2', lastYearSale: '5%', thisYearSale: '10%', lastYearProfit: '$10,000.00', thisYearProfit: '$10,000' },
                    }
                ]
            }]
        };
        this.actionTemplate = this.actionTemplate.bind(this);
    }


    actionTemplate(node, column) {
        return <div>
            <Button type="button" icon="pi pi-search" className="p-button-success" style={{marginRight: '.5em'}}></Button>
            <Button type="button" icon="pi pi-pencil" className="p-button-warning"></Button>
        </div>;
    }

    render() {
        return (
            <TreeTable value={this.state.nodes}>
                <Column field="label" header="Name" expander></Column>
                <Column body={this.actionTemplate} style={{textAlign:'center', width: '8em'}}/>
            </TreeTable>
        )
    }
}