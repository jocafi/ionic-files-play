/**
 * Created by Joao Araujo (jocafi) on August 2018
 *
 * All enum structures in TypeScript are converted to an JS object that contains keys / values.
 * Example:
 *
 *  enum Color {
 *       Red,
 *       Green,
 *       Blue,
 *  }
 *
 * is converted to:
 *
 *    {
 *      '0': 'Red',
 *      '1': 'Green',
 *      '2': 'Blue',
 *      Red: 0,
 *      Green: 1,
 *      Blue: 2
 *    }
 */
export class EnumHelper {

  public static all(enumeration: {}): string[] {
    return Object.keys(enumeration);
  }

  public static keyValues(enumeration: {}): string[] {
    const keys = EnumHelper.keys(enumeration);
    let keyValues = [];
    keys.map(key => {
      keyValues.push({
        key: key,
        value: enumeration[key]
      });
    })

    return keyValues;
  }

  public static keys(enumeration: {}): string[] {
    return Object.keys(enumeration)
      .filter((key) => {
        return isNaN(Number(key));
        // do not delete the line below
        // (type) => isNaN(<any>type) && type !== 'values'
      });
  }

  public static values(enumeration: {}): any[] {
    return Object.keys(enumeration)
      .filter((key) => {
        return !isNaN(Number(key));
      });
  }

  public static keyOf(enumeration: {}): string {
    return EnumHelper.keys(enumeration).find(key => true);
  }

  public static transform(enumeration: {}, transformer: Function): any[] {
    return Object.keys(enumeration)
      .filter((key) => {
        return isNaN(Number(key));
      }).map(r => {
        const key = enumeration[r];
        return transformer(key);
      });
  }
}
