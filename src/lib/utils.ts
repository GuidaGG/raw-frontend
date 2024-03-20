import type { Project } from "./types";

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
      
      if (json.hasOwnProperty(key)) {
      
        result[key] = flattenJson(json[key]);
      }
    }
  
    return result;
  }

  export const hasValue = (jsonObj: any, value: string) => {

    for (var key in jsonObj) {
      if (jsonObj.hasOwnProperty(key)) {
          if (typeof jsonObj[key] === 'object') {
            if (hasValue(jsonObj[key], value)) { 
              return true; 
            }
          } else {
            if(jsonObj[key] === value){
              return true;
            }
          }
      }
    }
    return false;
  };

  export const getYear = (date: string) => new Date(date).getFullYear();

  export const formatDate = (date: string) => {
    const d = new Date(date)
    return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
  }

  export const transformPlaylist = (inputArray: Project[]) => {
    return inputArray.flatMap((item) => item.audioFiles.map((track) => (
        {
            title: track.title,
            artist: item.collaborations,
            project: item.slug,
            file: track.audioFile
 
        }))
            )
    };