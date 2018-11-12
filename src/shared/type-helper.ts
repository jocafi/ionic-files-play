/**
 * Created by Joao Araujo (jocafi) on November 2018
 *
 * The class TypeHelper was implemented to overcome some weakness of enum structures in TypeScript.
 *
 * <h2>How to use it?</h2>
 *
 * 1) Declare all the keys like the example below:
 *
 *  public static STATUS_ID = "STATUS_ID";
 *  public static STATUS_NAME = "STATUS_NAME";
 *  public static STATUS_ERROR = "STATUS_ERROR";
 *
 * 2) Override the keys like the example below:
 *
 *  public static KEY_VALUES: string[][] = [
 *  [TypeHelper.STATUS_ID, "ID"],
 *  [TypeHelper.STATUS_NAME, "Status"],
 *  [TypeHelper.STATUS_ERROR, "Error"]
 *  ];
 *
 */
export abstract class TypeHelper {
  // Override the static variable below:
  public static KEY_VALUES: string[][];

  /**
   * Get the array of key/values for this type.
   *
   * <p/> The keys are stored in the first column and the values in the second.
   */
  public static getKeyValues(): string[][] {
    return this.KEY_VALUES;
  }

  /**
   * Get the value associated to the given key.
   * @param key key
   */
  public static getValue(key: string): string {
    const value = this.KEY_VALUES.find(obj => obj[0] === key);
    return value[1];
  }

}
