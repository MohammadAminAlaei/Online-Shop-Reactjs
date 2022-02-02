import {Component} from 'react';
import {UserLayout} from 'layout/UserLayout/User.layout';
import {History} from '..';
import {DEFAULT_PROPS, PROP_TYPES} from './PublicRoute.config';

const TargetPage = ({Component, hasLayout}) => {
    return (
        <History onRender={
            props => {
                return hasLayout ? (
                        <UserLayout>
                            <Component {...props} />
                        </UserLayout>
                    ) :
                    <Component {...props} />
            }
        }/>
    )
}

class PublicRoute extends Component {
    render() {
        const {component, hasLayout} = this.props;

        return (
            <TargetPage Component={component} hasLayout={hasLayout}/>
        );
    }
}

PublicRoute.defaultProps = DEFAULT_PROPS;
PublicRoute.propTypes = PROP_TYPES;

export {PublicRoute};
