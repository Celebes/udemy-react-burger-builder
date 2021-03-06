import React, {Component, Fragment} from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.response.use(request => {
                this.setState({error: null});
                return request;
            });
            this.resInterceptor = axios.interceptors.response.use(response => response, error => {
                this.setState({error});
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        render() {
            return (
                <Fragment>
                    <Modal show={this.state.error} handleBackdropClick={() => this.setState({error: null})}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Fragment>
            );
        }
    }
}

export default withErrorHandler;
