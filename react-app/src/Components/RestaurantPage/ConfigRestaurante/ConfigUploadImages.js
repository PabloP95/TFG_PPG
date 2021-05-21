import React, { Component } from 'react'
import { Form, FormGroup, Input, Label } from 'reactstrap';

export class ConfigUploadImages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgRestaurante: null,
            img2: null,
        }
    }

    handleChange = (e) => {

        this.setState({
            ...this.state,
            [e.target.name]: URL.createObjectURL(e.target.files[0])
        });


    }
    render() {

        return (
            <div className="p-2">

                <Form>
                    <FormGroup>
                        <Label for="imgRestaurante">Imagen principal</Label>
                        <Input id="imgRestaurante" name="imgRestaurante" type="file" accept="image/*" onChange={this.handleChange} />
                        <img src={this.state.imgRestaurante} alt="Imagen primera" />

                    </FormGroup>

                    <FormGroup>
                        <Label for="img2">Imagen segunda</Label>
                        <Input id="img2" name="img2" type="file" onChange={this.handleChange} accept="image/*" />
                        <img src={this.state.img2} alt="Imagen segunda" />

                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default ConfigUploadImages
