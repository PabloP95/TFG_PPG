import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Button, NavItem } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
export class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            textSearch: '',
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
            console.log(this.state.textSearch);
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
                        <Label for="textSearch" hidden>textSearch</Label>
                        <Input
                            type="text"
                            style={{ 'border': this.state.errors.textSearch ? '1px solid red' : '' }}
                            value={this.state.textSearch}
                            name="textSearch" id="textSearch"
                            placeholder="Buscar"
                            onChange={this.handleChange} />
                    </FormGroup>
                    {this.props.isOpen ?
                        (
                            <Button>
                                <FontAwesomeIcon icon={faSearch} size={20} className="mt-1" />
                            </Button>
                        ) : (
                            <Button>
                                <FontAwesomeIcon icon={faSearch}
                                />
                            </Button>)}
                    <div className="pl-3 text-right text-danger">{this.state.errors.textSearch}</div>
                </Form>
            </NavItem>
        )
    }
}

export default SearchBar
