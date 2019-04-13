export var baseEntities = ["Boolean", "Int", "String", "Float", "ID"];
export var filteredTypes = ["DateTime"];

export function instanceOf(classes: any[], t: any) {
    for (let c of classes) {
        if (t instanceof c) {
            return true;
        }
    }
    return false;
}