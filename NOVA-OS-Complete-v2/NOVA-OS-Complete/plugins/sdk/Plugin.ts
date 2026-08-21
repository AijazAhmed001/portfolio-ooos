export type NovaPlugin={id:string;name:string;version:string;activate:(context:unknown)=>void|Promise<void>};
