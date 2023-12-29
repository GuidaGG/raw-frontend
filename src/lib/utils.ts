export function flattenJson(json: any): any {
    if (typeof json !== 'object' || json === null) {
      return json;
    }
  
    if (json.hasOwnProperty('data')) {
      return flattenJson(json['data']);
    }
    
    if (json.hasOwnProperty('meta')) {
      return flattenJson(json['meta']);
    }

    if (json.hasOwnProperty('attributes')) {
        const flattenedAttributes = flattenJson(json['attributes']);
        flattenedAttributes['id'] = json['id']; // Preserve the 'id' key
        return flattenedAttributes;       
    }

    if (Array.isArray(json)) {
      return json.map((item) => flattenJson(item));
    }
  
    const result: Record<string, any> = {};
 
    for (const key in json) {
        console.log(key)
      if (json.hasOwnProperty(key)) {
      
        result[key] = flattenJson(json[key]);
      }
    }
  
    return result;
  }