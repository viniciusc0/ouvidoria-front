type JSONValue =
    | string
    | number
    | boolean
    | JSONObject

export interface JSONObject {
    [x: string]: JSONValue;
}

