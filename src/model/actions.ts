import {TypeHelper} from "../shared/type-helper";

export class Action extends TypeHelper{
  public static GO_TO_APPLICATION_DIRECTORY = "GO_TO_APPLICATION_DIRECTORY";
  public static GO_TO_APPLICATION_STORAGE_DIRECTORY = "GO_TO_APPLICATION_STORAGE_DIRECTORY";
  public static GO_TO_DOCUMENTS_DIRECTORY = "GO_TO_DOCUMENTS_DIRECTORY";
  public static CREATE_JSON_FILE = "CREATE_JSON_FILE";
  public static READ_JSON_FILE = "READ_JSON_FILE";

  public static KEY_VALUES: string[][] = [
    [Action.GO_TO_APPLICATION_DIRECTORY, "Go to Application Directory"],
    [Action.GO_TO_APPLICATION_STORAGE_DIRECTORY, "Go to Application Storage Directory"],
    [Action.GO_TO_DOCUMENTS_DIRECTORY, "Go to Documents Directory"],
    [Action.CREATE_JSON_FILE, "Create Json File"],
    [Action.READ_JSON_FILE, "Read Json File"]
  ];
}
