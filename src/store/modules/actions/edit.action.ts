export const editAction = {
  INITIALIZE: 'edit/INITIALIZE' as const,
  SET_EDIT_ID: 'edit/SET_EDIT_ID' as const,
  SET_CONTENTS: 'edit/SET_CONTENTS' as const,
};

export const editActions = {
  initialize: () => {
    return { type: editAction.INITIALIZE };
  },
  setEditId: (payload: { editId: string }) => {
    return { type: editAction.SET_EDIT_ID, payload };
  },
  setContents: (payload: { contents: string }) => {
    return { type: editAction.SET_CONTENTS, payload };
  },
};
