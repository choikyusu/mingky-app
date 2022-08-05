export const modalAction = {
  INITIALIZE: 'modal/INITIALIZE' as const,
  SET_DIALOG_STATUS: 'modal/SET_DIALOG_STATUS' as const,
};

export const modalActions = {
  initialize: () => {
    return { type: modalAction.INITIALIZE };
  },
  setDialogStatus: (payload: {
    id: string;
    data?: {
      [x: string]: any;
    };
  }) => {
    return { type: modalAction.SET_DIALOG_STATUS, payload };
  },
};
