import React, {Component} from 'react';
import { render } from '@testing-library/react';

class Step3_1 extends Component 
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        if(this.props.curStep!=3 || this.props.type!=1) return null;
        return <>
            <div className="row">
                <div className="col-sm-12">   
                    <form id="step3Form" onSubmit={this.props.onSubmit}>
                        <label htmlFor="url">URL from web</label>
                        <input className="form-control" name="url" type="text"/> 
                    </form>              
                </div>     
            </div>
        </>
    }
}
export default Step3_1;