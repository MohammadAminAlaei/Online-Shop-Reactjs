import {Component} from 'react';
import {Navigate} from 'react-router-dom';
import {PATHS} from 'configs/routes.config';
import {ManagerLayout} from 'layout/ManagerLayout/Manager.layout';
import {History} from '..';
import {DEFAULT_PROPS, PROP_TYPES} from './ProtectedRoute.config';

const TargetPage = ({Component, hasLayout}) => {

    let ROLL = localStorage.getItem('ROLL');
    ROLL === null ? ROLL = 'USER' : ROLL = localStorage.getItem('ROLL');

    if (ROLL === 'MANAGER') {
        return <Navigate replace to={PATHS.INVENTORY_MANAGEMENT}/>
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
