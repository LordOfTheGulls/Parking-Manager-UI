export class EnsureModuleLoadedOnce{
    constructor(parentModule: any, moduleName: string){
        if(parentModule){
            throw Error(`${moduleName} has already loaded!`);
        }
    }
}