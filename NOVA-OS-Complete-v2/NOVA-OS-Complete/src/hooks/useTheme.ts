import {useNovaStore} from '../store/useNovaStore';export function useTheme(){return useNovaStore(s=>({theme:s.theme,accent:s.accent,setTheme:s.setTheme,setAccent:s.setAccent}))}
