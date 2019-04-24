export var baseEntities = ["Boolean", "Int", "String", "Float", "ID"];
export var filteredTypes = ["DateTime"];

export function instanceOf(classes: string[], t: any) {
    for (let c of classes) {
        if (t.constructor.name === c) {
            return true;
        }
    }
    return false;
}