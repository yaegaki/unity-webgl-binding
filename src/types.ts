export type Pointer = number

export type Heap<ArrayType> = {
    set(data: ArrayType, ptr: Pointer): void
    subarray(start: Pointer, end: Pointer): ArrayType
}

export type Module = {
    _malloc(size: number): Pointer
    _free(ptr: Pointer): void

    HEAP8: Heap<Int8Array>

    dynCall_v(funcPtr: Pointer): void
    dynCall_vi(funcPtr: Pointer, arg1: number): void
    dynCall_vii(funcPtr: Pointer, arg1: number, arg2: number): void

    dynCall_i: (funcPtr: Pointer) => number
}

export type HelperFunctions = {
    lengthBytesUTF8: (str: string) => number
    stringToUTF8: (str: string, buffer: Pointer, bufferSize: number) => void
    Pointer_stringify: (ptr: Pointer) => string
}
