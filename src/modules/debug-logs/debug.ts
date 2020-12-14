import debug, { Debugger } from 'debug'

export const LogRoute: Debugger = debug('info:route')
export const LogError = debug('info:error')
export const LogDatabase = debug('info:database')
export const LogInfo = debug('info:')
