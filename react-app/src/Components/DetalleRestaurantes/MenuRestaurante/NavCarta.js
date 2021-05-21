import React from "react";
function NavCarta() {
    return (
        <div className="container bg-light">
            <ul className="nav nav-pills nav-justified p-5" id="pills-tab" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active" id="pills-entrantes-tab" data-toggle="pill" href="#pills-entrantes" role="tab" aria-controls="pills-entrantes" aria-selected="true">Entrantes</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="pills-platosprincipales-tab" data-toggle="pill" href="#pills-platosprincipales" role="tab" aria-controls="pills-platosprincipales" aria-selected="false">Platos principales</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="pills-bebidas-tab" data-toggle="pill" href="#pills-bebidas" role="tab" aria-controls="pills-bebidas" aria-selected="false">Bebidas</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="pills-postres-tab" data-toggle="pill" href="#pills-postres" role="tab" aria-controls="pills-postres" aria-selected="false">Postres</a>
                </li>
            </ul>
        </div>
    );
}

export default NavCarta;