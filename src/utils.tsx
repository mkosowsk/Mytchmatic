export default class Utils {
    static truncateString(currString: string) {
        if (!currString) return;
      
        const stringStart = currString.substring(0, 4);
        const stringEnd = currString.substring(currString.length - 4);
      
        return stringStart + '...' + stringEnd;
      };
    
}


