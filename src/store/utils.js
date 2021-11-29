export const setActionType = (moduleName) => (actionName) =>
  `${moduleName}/${actionName}`;

export const statusType = {
  idle: 'idle',
  loading: 'loading',
  success: 'success',
  fail: 'fail',
};
