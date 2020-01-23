import React, {Component} from 'react';
import { render } from '@testing-library/react';

class Step1 extends Component 
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        if(this.props.curStep!=1) return null;
        return <>
            <div className="form-group butForm">
                <label>
                    <input name="uploadType" type="radio" value="1" onChange={this.props.onChange}/> URL from web
                </label> 
                <br/>
                <label>
                    <input name="uploadType" type="radio" value="2" onChange={this.props.onChange}/> Upload from computer
                </label>
            </div>
        </>
    }
}
export default Step1;