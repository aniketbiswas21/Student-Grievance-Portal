import React, {Fragment, Component} from 'react'

class Add extends Component {
   state={
       category: '',
       subject: '',
       statement: ''
   }
   changeState = (e) =>{
    this.setState({
        [e.target.id]: e.target.value
    })
   }
    submit= (e) =>{
        e.preventDefault();
        console.log(this.state);
        this.setState({
            category: '',
             subject: '',
            statement: ''
        })
    }
    render(){
     return (
        <Fragment>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"></link>
                <div className="container">
            <h1 className="text-center">ADD GRIEVANCE</h1>
            <br/>
            <form onSubmit={this.submit}>
                <div className="form-group">
                <label htmlFor="category">Category</label>
                <select className="form-control" id="category" onChange={this.changeState} value={this.state.category}>
                    <option selected>Choose..</option>
                    <option>Academics</option>
                    <option>Infrastructure</option>
                    <option>Services</option>
                    <option>Other</option>
                </select>
                </div>

                <div className="form-group">
                <label htmlFor="subject">Subject:-</label>
                <textarea className="form-control" id="subject" rows="3" onChange={this.changeState} value={this.state.subject}></textarea>
                </div>

                <div className="form-group">
                <label htmlFor="statement">Brief Description:-</label>
                <textarea className="form-control" id="statement" rows="3" onChange={this.changeState} value={this.state.statement}></textarea>
                </div>

                <div className="form-group">
                <label htmlFor="files">Attach Files (optional):-</label>
                <input type="file" className="form-control-file" id="files"/>
                </div>

                <br/>
                <button type="submit" className="btn btn-primary mb-2">Submit</button>


            </form>
            </div>
    </Fragment>
    )
}
}

export default Add;
