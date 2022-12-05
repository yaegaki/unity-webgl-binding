import { module as m, stringToPointer } from "./binding"
import { Pointer } from "./types"

export function buildFunctionVoid_Void(funcPtr: Pointer) {
    return () => m!.dynCall_v(funcPtr)
}

export function buildFunctionVoid_Int(funcPtr: Pointer) {
    return (arg1: number) => m!.dynCall_vi(funcPtr, arg1)
}

export function buildFunctionVoid_IntInt(funcPtr: Pointer) {
    return (arg1: number, arg2: number) => m!.dynCall_vii(funcPtr, arg1, arg2)
}

export function buildFunctionVoid_IntIntInt(funcPtr: Pointer) {
    return (arg1: number, arg2: number) => m!.dynCall_vii(funcPtr, arg1, arg2)
}

export function buildFunctionVoid_IntString(funcPtr: Pointer) {
    return (arg1: number, arg2: string) => {
        const arg2Str = stringToPointer(arg2)
        try {
            m!.dynCall_vii(funcPtr, arg1, arg2Str)
        }
        finally {
            m!._free(arg2Str)
        }
    }
}

export function buildFunctionInt_Void(funcPtr: Pointer) {
    return () => m!.dynCall_i(funcPtr)
}
