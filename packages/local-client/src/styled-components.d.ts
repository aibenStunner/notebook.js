import { ThemeInterface } from "./_shared/appTheme";

declare module "styled-components" {
  interface DefaultTheme extends ThemeInterface {}
}
