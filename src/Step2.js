import React, {Component} from 'react'

class Step2 extends Component{
    constructor(props)
    {
        super(props);
    }

    render ()
    {
        if(this.props.curStep!=2) return null;
        return <>
            <div className="form-group butForm">
                <label>
                    Name of New Image: <input name="uploadName" type="text" defaultValue={this.props.imgName} onChange={this.props.onChange}/>.png 
                </label> 
            </div>
        </>
    }
}

export default Step2;