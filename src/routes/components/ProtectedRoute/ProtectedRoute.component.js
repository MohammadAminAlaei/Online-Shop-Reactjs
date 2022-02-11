import {Component} from 'react';
import {Navigate} from 'react-router-dom';
import {PATHS} from 'configs/routes.config';
import {ManagerLayout} from 'layout/ManagerLayout/Manager.layout';
import {History} from '..';
import {DEFAULT_PROPS, PROP_TYPES} from './ProtectedRoute.config';

const TargetPage = ({Component, hasLayout}) => {

    let IS_LOGGED_IN = localStorage.getItem('IS_LOGGED_IN');
    IS_LOGGED_IN === null ? localStorage.setItem('IS_LOGGED_IN', 'false') : IS_LOGGED_IN = localStorage.getItem('IS_LOGGED_IN');

    if (IS_LOGGED_IN === 'true') {
        return <Navigate replace to={PATHS.COMMODITY_MANAGEMENT}/>
    }


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

class ProtectedRoute extends Component {
    render() {
        const {component, hasLayout} = this.props;

        return (
            <TargetPage Component={component} hasLayout={hasLayout}/>
        );
    }
}

ProtectedRoute.defaultProps = DEFAULT_PROPS;
ProtectedRoute.propTypes = PROP_TYPES;

export {ProtectedRoute};
