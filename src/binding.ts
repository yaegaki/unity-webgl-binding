import { HelperFunctions, Module, Pointer } from "./types";

export let module: Module | null = null
export let helperFunctions: HelperFunctions | null
let bindingFunctionMap = new Map<string, any>()

declare global {
    // Function called from *.jslib to retrieve binding functions
    var __unity_getBinding: any
}

globalThis['__unity_getBinding'] = (m: Module, f: HelperFunctions, name: string) => {
    if (module === null) {
        module = m
        helperFunctions = f
    }

    const func = bindingFunctionMap.get(name)
    if (func == null) {
        console.error(`missing binding function for ${name}`)
    }

    return func
}

export function bindFunction(name: string, func: any) {
    bindingFunctionMap.set(name, func)
}

export function pointerToInt8Array(ptr: Pointer, length: number): Int8Array {
    return module!.HEAP8.subarray(ptr, ptr + length)
}

export function arrayToPointer(array: Int8Array): Pointer {
    const ptr = module!._malloc(array.length)
    module!.HEAP8.set(array, ptr)
    return ptr
}

export function pointerToString(ptr: Pointer): string {
    return helperFunctions!.Pointer_stringify(ptr)
}

export function stringToPointer(str: string): Pointer {
    const bufferSize = helperFunctions!.lengthBytesUTF8(str) + 1
    const buffer = module!._malloc(bufferSize)
    helperFunctions!.stringToUTF8(str, buffer, bufferSize)
    return buffer
}
