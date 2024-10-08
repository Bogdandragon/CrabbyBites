import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
    colors: {
      greenBrand: {
				500: "#8ca771",		// background solid button
				600: "#738862",		// hover solid button
				700: "#616d48",		// click solid button
			},

      neutral: {
        500: "#a3a098",		// background solid button
				600: "#75736c",		// hover solid button
				700: "#54534f",		// click solid button
      },
    },
  })

export default theme;