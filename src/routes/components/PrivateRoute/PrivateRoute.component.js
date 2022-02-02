import {Component} from 'react';
import {Navigate} from 'react-router-dom';
import {PATHS} from 'configs/routes.config';
import {ManagerLayout} from 'layout/ManagerLayout/Manager.layout';
import {History} from '..';
import {DEFAULT_PROPS, PROP_TYPES} from './PrivateRoute.config';

const TargetPage = ({Component, hasLayout}) => {

    let ROLL = localStorage.getItem('ROLL');
    ROLL === null ? ROLL = 'USER' : ROLL = localStorage.getItem('ROLL');

    if (ROLL === 'USER' || ROLL === 'null') {
        return <Navigate replace to={PATHS.HOME}/>
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
