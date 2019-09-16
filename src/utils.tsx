export default class Utils {
    static truncateString(currString: string) {
        if (!currString) return;
      
        const stringStart = currString.substring(0, 4);
        const stringEnd = currString.substring(currString.length - 4);
      
        return stringStart + '...' + stringEnd;
      }; 

      static handleErrors(response: any) {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response;
      }
}


