import {PartialState, NavigationState} from '@react-navigation/native';

function getActiveRouteName(
  state: (NavigationState | PartialState<NavigationState>) | undefined,
) {
  if (!state) {
    return undefined;
  }

  const route =
    typeof state.index === 'number' ? state.routes[state.index] : undefined;

  if (route && route.state) {
    return getActiveRouteName(route.state);
  }

  return route ? route.name : undefined;
}

export {getActiveRouteName};
