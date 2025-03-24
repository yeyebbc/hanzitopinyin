// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import pinyin from "pinyin";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.chinese-to-pinyin",
    () => {
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        const selection = editor.selection;
        const text = editor.document.getText(selection);

        try {
          const pinyinResult = pinyin(text, { style: pinyin.STYLE_NORMAL })
            .map((arr) => arr[0])
            .join("");

          editor.edit((editBuilder) => {
            editBuilder.replace(selection, pinyinResult);
          });
        } catch (error) {
          vscode.window.showErrorMessage(
            "Error converting to pinyin: " + error
          );
        }
      } else {
        vscode.window.showErrorMessage("No active text editor");
      }
    }
  );
  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
