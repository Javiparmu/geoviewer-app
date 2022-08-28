export const useHomeScreenStyles = (colors) => {
    const homeStyles = {
        container: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-around',
            backgroundColor: colors.background,
        },
        mapcontainer: {
            zIndex: 500,
            flex: 1,
            borderTopWidth: 1,
            borderColor: colors.border,
            overflow: 'hidden',
        },
        map: {
            flex: 1,
            height: '70%'
        },
        bottom: {
            borderTopWidth: 1,
            borderColor: colors.border,
        },
        bottomcontainer: {
            backgroundColor: colors.card,
            borderWidth: 3,
            borderRadius: 20,
            borderColor: colors.border,
            marginVertical: 20,
            padding: 10,
            width: '80%',
            paddingVertical: 5,
            alignSelf: 'center',
        },
        checkboxcontainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        checkbox: {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            paddingVertical: 0,
        },
    }
    return homeStyles
}