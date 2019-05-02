import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        };

        constructor(props) {
            super(props);
            this.request = axios.interceptors.request.use(req => {
                this.setState(() => {
                    return { error: null };
                });
                return req;
            });
            this.response = axios.interceptors.response.use(
                res => res,
                error => {
                    this.setState(() => {
                        return { error: error };
                    });
                }
            );
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.request);
            axios.interceptors.response.eject(this.response);
        }        

        errorConfirmedHandler = () => {
            this.setState(() => {
                return { error: null };
            });
        };

        render() {
            return (
                <>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </>
            );
        }
    };
};

export default withErrorHandler;
