export const kelvinToCelsius = (tempK: number) => { return tempK - 273.15; }

export const convertEpochToTime = (epochTime : number) => {
    const date = new Date(epochTime * 1000); 
    const t = ` ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    return t; 
  };

  export const convertEpochToDate = (epochTime : number) => {
    const date = new Date(epochTime * 1000); 
    const t = ` ${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
    return t; 
  };