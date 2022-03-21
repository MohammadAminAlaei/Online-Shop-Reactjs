import {Component} from 'react';
import {Navigate} from 'react-router-dom';
import {PATHS} from 'configs/routes.config';
import {ManagerLayout} from 'layout/ManagerLayout/Manager.layout';
import {History} from '..';
import {DEFAULT_PROPS, PROP_TYPES} from './PrivateRoute.config';
import store from 'redux/store'
import {whoami} from 'redux/actions/user.action';

const TargetPage = ({Component, hasLayout}) => {

    let IS_LOGGED_IN = localStorage.getItem('IS_LOGGED_IN');
    IS_LOGGED_IN === null ? localStorage.setItem('IS_LOGGED_IN', 'false') : IS_LOGGED_IN = localStorage.getItem('IS_LOGGED_IN');

    if (IS_LOGGED_IN === 'false') {
        return <Navigate replace to={PATHS.LOGIN_PANEL_MANAGEMENT}/>
    }

    const initApp = async () => {
        try {
            // console.log('init app');
            store.dispatch(whoami());
        } catch (e) {

        }
    };

    (() => initApp())();

    return (
        <History onRender={
            props => {
                return hasLayout ? (
                        <ManagerLayout>
                            <Component {...props} />
                        </ManagerLayout>
                    ) :
                    <Component {...props} />
            }
        }/>
    )
}

class PrivateRoute extends Component {
    render() {
        const {component, hasLayout} = this.props;

        return (
            <TargetPage Component={component} hasLayout={hasLayout}/>
        );
    }
}

PrivateRoute.defaultProps = DEFAULT_PROPS;
PrivateRoute.propTypes = PROP_TYPES;

export {PrivateRoute};
