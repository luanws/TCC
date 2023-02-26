export type ThemeTypes = 'light' | 'dark'

export interface Theme {
    colors: Colors
}

export interface Colors {
    primary: string
    primaryLight: string
    primaryDark: string

    accent: string
    accentLight: string
    accentDark: string

    background: string
    containerBackground: string
    divider: string
    unfocused: string
    unfocusedIcon: string
    focused: string
    disabled: string
    placeholder: string
    
    title: string
    text1: string
    text2: string
    text3: string
    link: string
    
    success: string
    info: string
    warning: string
    danger: string

    successContainer: string
    infoContainer: string
    warningContainer: string
    dangerContainer: string
    
    icon: string
    
    actionBar: {
        background: string
        text: string
    }

    statusBar: {
        background: string
        icons: 'light' | 'dark'
    }

    navigationDrawer: {
        activeBackground: string
        activeContent: string
        content: string
    }

    navigationBar: {
        background: string
        border: string
    }
}