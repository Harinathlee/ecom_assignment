// themeReducer.ts
const initialState = {
    theme: 'light',
  };
  
  const themeReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case 'TOGGLE_THEME':
        return {
          ...state,
          theme: state.theme === 'light' ? 'dark' : 'light',
        };
      default:
        return state;
    }
  };
  
  export default themeReducer;