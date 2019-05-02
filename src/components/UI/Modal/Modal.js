import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const Modal = props => {
    const className = `${classes.Modal} ${props.show ? classes.Show : classes.Hide}`;
    return (
        <>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div className={className}>{props.children}</div>
        </>
    );
};

export default React.memo(Modal, (prevProps, nextProps) => {
    return prevProps.show === nextProps.show && prevProps.children === nextProps.children;
});

// alternativa

// class Modal extends Component {
//     shouldComponentUpdate(nextProps, nextState) {
//         return nextProps.show !== this.props.show;
//     }

//     render() {
//         const className = `${classes.Modal} ${this.props.show ? classes.Show : classes.Hide}`;

//         return (
//             <>
//                 <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
//                 <div className={className}>{this.props.children}</div>
//             </>
//         );
//     }
// }

// export default Modal;
