import React, {Component} from 'react';
import { render } from '@testing-library/react';

class Step3_2 extends Component 
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        if(this.props.curStep!=3 || this.props.type!=2) return null;
        return <>
            <div className="row">
                <div className="col-sm-12">
                    <form /*id="form" method="post" action="upload_file" encType="multipart/form-data"*/ id="step3Form" onSubmit={this.props.onSubmit}>
                        <label htmlFor="picture">Upload from computer</label>
                        <input className="form-control" name="picture" type="file"/>                  
                    </form>
                </div>
            </div>
        </>
    }
}
export default Step3_2;