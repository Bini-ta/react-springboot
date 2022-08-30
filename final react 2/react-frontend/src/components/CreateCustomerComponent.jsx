import React, { Component } from 'react'
import CustomerService from '../services/CustomerService';

class CreateCustomerComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            errors: {},
            id: this.props.match.params.id,
            firstName: '',
            lastName:'',
            phoneNumber: '',
            address: '',
            state:'',
            zipcode:''
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changePhoneNumberHandler = this.changePhoneNumberHandler.bind(this);
        this.changeAddressHandler = this.changeAddressHandler.bind(this);
        this.changeStateHandler = this.changeStateHandler.bind(this);
        this.changeZipCodeHandler = this.changeZipCodeHandler.bind(this);
        this.saveOrUpdateCustomer = this.saveOrUpdateCustomer.bind(this);
    }

    componentDidMount(){

        if(this.state.id === '_add'){
            return
        }else{
            CustomerService.getCustomerById(this.state.id).then( (res) =>{
                let customer = res.data;
                this.setState({
                    firstName: customer.firstName,
                    lastName: customer.lastName,
                    phoneNumber: customer.phoneNumber,
                    address : customer.customerAddress,
                    state: customer.customerState,
                    zipcode: customer.customerZipcode
                });
            });
        }        
    }
    saveOrUpdateCustomer = (e) => {
        e.preventDefault();
        console.log("hello")
        if(this.handleValidation()){
            console.log("hi")
            let customer = {firstName: this.state.firstName, lastName: this.state.lastName, phoneNumber: this.state.phoneNumber, customerAddres: this.state.address, customerState:this.state.state, zipCode:this.state.zipcode};
            console.log('customer => ' + JSON.stringify(customer));

            if(this.state.id === '_add'){
                CustomerService.createCustomer(customer).then(res =>{
                    this.props.history.push('/customers');
                });
            }else{
                CustomerService.updateCustomer(customer).then( res => {
                    this.props.history.push('/customers');
                });
            }
        }
    }

    handleValidation() {
        
        let cname = this.state.firstName;
        let clastname=this.state.lastName;
        let cphone = this.state.phoneNumber;
        let caddress = this.state.address
        let errors = {};
        let formIsValid = true;


        if (!cphone) {
            formIsValid = false;
            errors["phoneNumber"] = "Phone Number cannot be empty";
        }
        else if (typeof cphone !== "undefined") {
            if (!cphone.match(/^\d{10}$/)) {
              formIsValid = false;
              errors["phoneNumber"] = "Enter a valid Phone Number";
            }
        }

        if (!cname) {
            formIsValid = false;
            errors["firstName"] = "Name cannot be empty";
        }
        
        else if (typeof cname !== "undefined") {
          if (!cname.match(/^[a-zA-Z]+$/)) {
            formIsValid = false;
            errors["firstName"] = "Enter a valid Name";
          }
        }
        console.log(cname);
        if (!clastname) {
            formIsValid = false;
            errors["lastName"] = "Name cannot be empty";
        }
        
        else if (typeof clastname !== "undefined") {
          if (!clastname.match(/^[a-zA-Z]+$/)) {
            formIsValid = false;
            errors["lastName"] = "Enter a valid Name";
          }
        }
        console.log(cname);







        if (!caddress) {
            formIsValid = false;
            errors["address"] = "Address cannot be empty";
        }
    
    
        this.setState({ errors: errors });
        return formIsValid;


       
      }
    
    
    changeFirstNameHandler= (event) => {
        this.setState({firstName: event.target.value});
    }
    changeLastNameHandler= (event) => {
        this.setState({lastName: event.target.value});
    }

    changePhoneNumberHandler= (event) => {
        this.setState({phoneNumber: event.target.value});
    }

    changeStateHandler=(event) =>{
        this.setState({state: event.target.value});
    }
    changeZipCodeHandler=(event) =>{
        this.setState({zipcode: event.target.value});
    }

    changeAddressHandler= (event) => {
        this.setState({address: event.target.value});
    }

    cancel(){
        this.props.history.push('/customers');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Customer</h3>
        }else{
            return <h3 className="text-center">Update Customer</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Customer First Name: </label>
                                            <input placeholder="Customer First Name" ref="name" name="firstName" className="form-control" 
                                                value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                            <span style={{ color: "red" }}>{this.state.errors["firstName"]}</span>
                                        </div>
                                        <div className = "form-group">
                                            <label> Customer Last Name: </label>
                                            <input placeholder="Customer Last Name" ref="name" name="lastName" className="form-control" 
                                                value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                            <span style={{ color: "red" }}>{this.state.errors["lastName"]}</span>
                                        </div>
                                        <div className = "form-group">
                                            <label> Customer Phone Number: </label>
                                            <input placeholder="Customer Phone Number" name="phoneNumber" className="form-control" 
                                                value={this.state.phoneNumber} onChange={this.changePhoneNumberHandler}/>
                                            <span style={{ color: "red" }}>{this.state.errors["phoneNumber"]}</span>
                                        </div>
                                        <div className = "form-group">
                                            <label> Customer Address: </label>
                                            <input placeholder="Customer Address" name="address" className="form-control" 
                                                value={this.state.address} onChange={this.changeAddressHandler}/>
                                            <span style={{ color: "red" }}>{this.state.errors["address"]}</span>
                                        </div>
                                        <div className = "form-group">
                                            <label> Customer State: </label>
                                            <input placeholder="Customer State" name="state" className="form-control" 
                                                value={this.state.state} onChange={this.changeStateHandler}/>
                                            <span style={{ color: "red" }}>{this.state.errors["state"]}</span>
                                        </div>
                                        <div className = "form-group">
                                            <label> Customer ZipCode: </label>
                                            <input placeholder="Customer ZipCode" name="state" className="form-control" 
                                                value={this.state.zipCode} onChange={this.changeZipCodeHandler}/>
                                            <span style={{ color: "red" }}>{this.state.errors["ZipCode"]}</span>
                                        </div>
                                        <button className="btn btn-success" onClick={this.saveOrUpdateCustomer}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateCustomerComponent
