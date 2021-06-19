import React, { Component } from 'react'
import { Form, FormGroup, Input, Button, NavItem } from 'reactstrap'
import { FaSearch } from 'react-icons/fa'
import axios from 'axios'
export class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textSearch: '',
            restauranteBusquedaNavBar: [],
            errors: {
                textSearch: ''
            }
        }
    }

    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.validate()) {
            axios.get('http://localhost:8000/api/restaurants/search/' + this.state.textSearch).then(res => {
                this.setState({
                    restauranteBusquedaNavBar: res.data
                });
                localStorage.setItem('busquedaNavBar', JSON.stringify(res.data));
                window.location = '/restaurantes'
            }).catch(error => {
                if (error.response && error.response.status === 422) {
                    localStorage.removeItem('busquedaNavBar');
                    window.location = '/restaurantes'
                }
            })
        }
    }




    validate() {
        let errors = {};
        let allOK = true;

        if (typeof this.state.textSearch !== 'undefined') {
            let regex = new RegExp(/select/i);
            if (regex.test(this.state.textSearch)) {
                allOK = false;
                errors['textSearch'] = 'Texto proporcionado no válido';
            }
        }

        this.setState({ errors });
        return allOK;
    }
    render() {
        return (
            <NavItem className="mt-sm-auto mr-sm-auto">
                <Form inline onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Input
                            type="text"
                            style={{ 'border': this.state.errors.textSearch ? '1px solid red' : '' }}
                            value={this.state.textSearch}
                            name="textSearch" id="textSearch"
                            placeholder="Buscar"
                            onChange={this.handleChange}
                            className="mr-2" />
                    </FormGroup>
                    {
                        this.props.isOpen ? (<Button className="mr-2" ><FaSearch /></Button>) : (<Button><FaSearch /></Button>)
                    }
                    <div className="pl-3 text-right text-danger">{this.state.errors.textSearch}</div>
                </Form>
            </NavItem>
        )
    }

}
export default SearchBar;
