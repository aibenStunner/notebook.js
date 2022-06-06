export interface ThemeInterface {
  colors: {
    background: {
      primary: string;
      secondary: string;
    };
    border: {
      primary: string;
      success: string;
      active: string;
    };
    text: {
      primary: string;
      secondary: string;
    };
    icon: {
      primary: string;
    };
    warning: {
      medium: string;
    };
    danger: {
      light: string;
      medium: string;
    };
    success: {
      light: string;
      medium: string;
    };
    info: {
      light: string;
      medium: string;
    };
  };
}

const sizing = {
  sizing: {
    text: {
      small: "0.9rem",
    },
  },
};

const appTheme: { dark: ThemeInterface; light: ThemeInterface } = {
  ...sizing,

  dark: {
    colors: {
      background: {
        primary: "#383838",
        secondary: "#404040",
      },
      border: {
        primary: "#212121",
        success: "#46C740",
        active: "#82b1ff",
      },
      text: {
        primary: "#d5d5d5",
        secondary: "#9e9e9e",
      },
      icon: {
        primary: "#eeeeee",
      },
      warning: {
        medium: "#FF9F43",
      },
      danger: {
        light: "#FCECEA",
        medium: "#EA5455",
      },
      success: {
        light: "#EAFBE7",
        medium: "#46C740",
      },
      info: {
        light: "#D7F2F5",
        medium: "#00CFE8",
      },
    },
  },
  light: {
    colors: {
      background: {
        primary: "#FFFFFF",
        secondary: "#EEEEEE",
      },
      border: {
        primary: "#dadada",
        success: "#46C740",
        active: "#82b1ff",
      },
      text: {
        primary: "#000000",
        secondary: "#757575",
      },
      icon: {
        primary: "#424242",
      },
      warning: {
        medium: "#FF9F43",
      },
      danger: {
        light: "#FCECEA",
        medium: "#EA5455",
      },
      success: {
        light: "#EAFBE7",
        medium: "#46C740",
      },
      info: {
        light: "#D7F2F5",
        medium: "#00CFE8",
      },
    },
  },
};

export default appTheme;
