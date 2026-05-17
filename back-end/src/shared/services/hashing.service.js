export class HashingService{
     constructor(hashingProvider){
        this.hashingProvider = hashingProvider;
     }
     async hash(str){
      const result = await this.hashingProvider.hash(str);
      return result;
     }
}