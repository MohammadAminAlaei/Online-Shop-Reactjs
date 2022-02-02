import PropTypes from 'prop-types';

export const DEFAULT_PROPS = {
    hasLayout: true
};

export const PROP_TYPES = {
    hasLayout: PropTypes.bool,
    component: PropTypes.func.isRequired
};
