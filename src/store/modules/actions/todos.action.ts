
export const todoAction ={
    CREATE : "todo/CREATE",
    REMOVE : "todo/REMOVE",
    TOGGLE : "todo/TOGGLE",
    CHANGE_INPUT : "todo/CHANGE_INPUT"
}

export const todoActions = {
    create : function (params : { text: string}) {
        return {
          type: todoAction.CREATE,
          payload: {
            id: 0,
            text: params.text,
            done: false
          }
        };
      },
      remove : function remove(id: number) {
        return {
          type: todoAction.REMOVE,
          meta: {
            id
          }
        };
      },
      toggle : function (id: number) {
        return {
          type: todoAction.TOGGLE,
          meta: {
            id
          }
        };
      },
      changeInput : function (input: string) {
        return {
          type: todoAction.CHANGE_INPUT,
          meta: {
            input
          }
        };
      }

}