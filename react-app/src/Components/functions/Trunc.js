function Trunc(props) {
    let x = props.x;
    let posiciones = props.posiciones ? props.posiciones : 0;
    var s = x.toString();
    var decimalLength = s.indexOf('.') + 1;
    var numStr = s.substr(0, decimalLength + posiciones);
    return Number(numStr);
}

export default Trunc;
