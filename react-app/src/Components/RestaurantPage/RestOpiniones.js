import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import axios from 'axios'
export class RestOpiniones extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opiniones: []
        }
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user'));
        axios.get('http://127.0.0.1:8000/api/restaurant/' + user.user.userable_id + '/opiniones').then(res => {
            this.setState({
                opiniones: res.data
            })
        })
    }
    render() {
        return (
            <div>
                <Row className="p-4">
                    <Col md="12" className="bg-dark text-light rounded text-center">
                        <h5>
                            Opiniones
                        </h5>
                    </Col>{
                        this.state.opiniones.length === 0 ? (<section className="p-3 ml-5"><h4 className="text-center ml-5">Aún, los clientes no han realizado ninguna opinión.</h4></section>)
                            : this.state.opiniones.length > 0 ? (
                                this.state.opiniones.map((opinion) => (
                                    <Row key={opinion.id} className="p-4 mt-3">
                                        <Col md="12" className="text-justify">
                                            <p>Nota: {opinion.nota} estrellas/5</p>
                                            <p>Opinión: {opinion.comentario}</p>
                                            <p>Fecha opinión: {
                                                ' ' + new Date(opinion.updated_at).getDate() + '/' +
                                                [new Date(opinion.updated_at).getMonth() + 1] + '/' +
                                                new Date(opinion.updated_at).getFullYear()
                                            }</p>
                                        </Col>
                                    </Row>
                                ))) : ('')
                    }
                </Row>
            </div >
        )
    }
}

export default RestOpiniones
