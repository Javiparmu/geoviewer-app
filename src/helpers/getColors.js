import { useTheme } from "@react-navigation/native"

export const getColors = () => {
    const { colors } = useTheme()
    return colors
}