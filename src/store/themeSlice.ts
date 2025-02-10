
// Initial state of the theme reducer
const initialState = {
  // Default theme is set to light
  theme: "light",
};

// Reducer function to handle theme state changes
const themeReducer = (state = initialState, action: any) => {
  // Switch statement to handle different action types
  switch (action.type) {
    // Action type to toggle the theme
    case "TOGGLE_THEME":
      // Return a new state object with the toggled theme
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };
    // Default case to return the current state if action type is not recognized
    default:
      return state;
  }
};

// Export the theme reducer as the default export
export default themeReducer;