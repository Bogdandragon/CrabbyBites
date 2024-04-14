import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
    colors: {
      greenBrand: {
		500: "#b4d1a0",		// background solid button
		600: "#8ca771",		// hover solid button
		700: "#738862",		// click solid button
      },
    },
  })

export default theme;