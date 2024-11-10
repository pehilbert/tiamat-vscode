import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('tiamat.openChat', () => {
        const panel = vscode.window.createWebviewPanel(
            'chatbot', 
            'Chatbot',
            vscode.ViewColumn.One,
            { enableScripts: true }
        );

        panel.webview.html = getWebviewContent();

        // Send the current theme to the Webview
        panel.webview.postMessage({ type: 'set-theme', theme: vscode.window.activeColorTheme.kind });

        vscode.window.onDidChangeActiveColorTheme((theme) => {
            panel.webview.postMessage({ type: 'set-theme', theme: theme.kind });
        });
    });

    context.subscriptions.push(disposable);
}

function getWebviewContent() {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Chatbot</title>
        </head>
        <body>
            <div id="root"></div>
            <script src="${vscode.Uri.file(
                path.join(__dirname, 'out', 'chat_app', 'test.js')
            ).with({ scheme: 'vscode-resource' })}"></script>
        </body>
        </html>
    `;
}

